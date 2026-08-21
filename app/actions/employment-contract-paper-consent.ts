'use server'

import fs from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { logAudit } from '@/lib/audit-log'
import { requireHRManager } from '@/lib/auth-guard'
import { prisma } from '@/lib/prisma'

const SAVE_DIR = '/data/hr-system/paper-consents'
const MAX_SIZE = 20 * 1024 * 1024

export async function createPaperConsent(
  formData: FormData,
) {
  await requireHRManager()

  const employmentContractId =
    String(formData.get('employmentContractId') ?? '')

  const signerName =
    String(formData.get('signerName') ?? '').trim()

  const signedPdf = formData.get('signedPdf')

  if (
    !employmentContractId ||
    !signerName ||
    !(signedPdf instanceof File) ||
    signedPdf.size === 0
  ) {
    throw new Error('署名済PDFを選択してください')
  }

  if (
    signedPdf.type !== 'application/pdf' &&
    !signedPdf.name.toLowerCase().endsWith('.pdf')
  ) {
    throw new Error('PDFファイルのみ登録できます')
  }

  if (signedPdf.size > MAX_SIZE) {
    throw new Error('PDFは20MB以下にしてください')
  }

  const existingConsent =
    await prisma.employmentContractConsent.findFirst({
      where: { employmentContractId },
    })

  if (existingConsent) {
    redirect(`/employee-contracts/${employmentContractId}`)
  }

  fs.mkdirSync(SAVE_DIR, { recursive: true })

  const fileName =
    `${employmentContractId}-${randomUUID()}.pdf`

  const filePath = path.join(SAVE_DIR, fileName)

  const bytes =
    Buffer.from(await signedPdf.arrayBuffer())

  fs.writeFileSync(filePath, bytes)

  const consent =
    await prisma.employmentContractConsent.create({
      data: {
        employmentContractId,
        signerName,
        consentMethod: 'PAPER',
        signedPdfPath: `/paper-consents/${fileName}`,
      },
    })

  await logAudit({
    action: 'EMPLOYMENT_CONTRACT_SIGNED',
    targetType: 'EmploymentContract',
    targetId: employmentContractId,
    description: `${signerName} が署名済み紙契約PDFを登録`,
    afterData: consent,
  })

  revalidatePath(
    `/employee-contracts/${employmentContractId}`,
  )

  revalidatePath('/mypage/employment-contracts')

  redirect(
    `/employee-contracts/${employmentContractId}`,
  )
}
