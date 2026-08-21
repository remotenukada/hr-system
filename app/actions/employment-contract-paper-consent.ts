'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { logAudit } from '@/lib/audit-log'
import { requireHRManager } from '@/lib/auth-guard'
import { prisma } from '@/lib/prisma'

export async function createPaperConsent(
  formData: FormData,
) {
  await requireHRManager()

  const employmentContractId =
    String(formData.get('employmentContractId') ?? '')

  const signerName =
    String(formData.get('signerName') ?? '').trim()

  if (!employmentContractId || !signerName) {
    return
  }

  const existingConsent =
    await prisma.employmentContractConsent.findFirst({
      where: {
        employmentContractId,
      },
    })

  if (!existingConsent) {
    const consent =
      await prisma.employmentContractConsent.create({
        data: {
          employmentContractId,
          signerName,
          consentMethod: 'PAPER',
        },
      })

    await logAudit({
      action: 'EMPLOYMENT_CONTRACT_SIGNED',
      targetType: 'EmploymentContract',
      targetId: employmentContractId,
      description: `${signerName} が紙契約で同意`,
      afterData: consent,
    })
  }

  revalidatePath(
    `/employee-contracts/${employmentContractId}`,
  )
  revalidatePath('/mypage/employment-contracts')

  redirect(
    `/employee-contracts/${employmentContractId}`,
  )
}
