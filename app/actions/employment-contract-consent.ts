'use server'

import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { prisma } from '@/lib/prisma'
import { saveSignature } from '@/lib/signature/saveSignature'

export async function createEmploymentContractConsent(
  formData: FormData,
) {
  const employmentContractId =
    formData.get('employmentContractId') as string

  const signerName =
    formData.get('signerName') as string

  const signatureImage =
    formData.get('signatureImage') as string | null

  if (!employmentContractId || !signerName) {
    return
  }

  const requestHeaders = await headers()

  const forwardedFor =
    requestHeaders.get('x-forwarded-for')

  const ipAddress =
    forwardedFor?.split(',')[0]?.trim() ??
    requestHeaders.get('x-real-ip') ??
    null

  const userAgent =
    requestHeaders.get('user-agent')

  const existingConsent =
    await prisma.employmentContractConsent.findFirst({
      where: {
        employmentContractId,
      },
    })

  if (!existingConsent) {
    let signatureImagePath: string | null = null

    if (signatureImage) {
      const saved = await saveSignature(
        employmentContractId,
        signatureImage,
      )

      signatureImagePath = saved.publicPath
    }

    await prisma.employmentContractConsent.create({
      data: {
        employmentContractId,
        signerName,
        signatureImagePath,
        ipAddress,
        userAgent,
      },
    })
  }

  revalidatePath(
    `/employee-contracts/${employmentContractId}`,
  )

  redirect(`/employee-contracts/${employmentContractId}`)
}
