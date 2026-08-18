'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function saveCompanySetting(
  formData: FormData,
) {
  const companyName =
    formData.get('companyName') as string

  const postalCode =
    formData.get('postalCode') as string

  const address =
    formData.get('address') as string

  const phoneNumber =
    formData.get('phoneNumber') as string

  const representativeName =
    formData.get('representativeName') as string

  const consultationDesk =
    formData.get('consultationDesk') as string

  const workRuleLocation =
    formData.get('workRuleLocation') as string

  const current =
    await prisma.companySetting.findFirst()

  if (current) {
    await prisma.companySetting.update({
      where: {
        id: current.id,
      },
      data: {
        companyName,
        postalCode: postalCode || null,
        address: address || null,
        phoneNumber: phoneNumber || null,
        representativeName:
          representativeName || null,
        consultationDesk:
          consultationDesk || null,
        workRuleLocation:
          workRuleLocation || null,
      },
    })
  } else {
    await prisma.companySetting.create({
      data: {
        companyName,
        postalCode: postalCode || null,
        address: address || null,
        phoneNumber: phoneNumber || null,
        representativeName:
          representativeName || null,
        consultationDesk:
          consultationDesk || null,
        workRuleLocation:
          workRuleLocation || null,
      },
    })
  }

  revalidatePath('/company-settings')

  redirect('/company-settings')
}
