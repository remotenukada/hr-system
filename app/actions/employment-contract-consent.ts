'use server'

import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { prisma } from '@/lib/prisma'

export async function createEmploymentContractConsent(
  formData: FormData,
) {
  const employmentContractId =
    formData.get('employmentContractId') as string

  const signerName =
    formData.get('signerName') as string

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
    await prisma.employmentContractConsent.create({
      data: {
        employmentContractId,
        signerName,
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
