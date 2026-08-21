'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createContractTypeMaster(
  formData: FormData,
) {
  const name =
    String(formData.get('name') ?? '').trim()

  await prisma.contractTypeMaster.create({
    data: { name },
  })

  revalidatePath('/contract-type-masters')
  redirect('/contract-type-masters')
}

export async function updateContractTypeMaster(
  formData: FormData,
) {
  const id =
    String(formData.get('id') ?? '')

  const name =
    String(formData.get('name') ?? '').trim()

  await prisma.contractTypeMaster.update({
    where: { id },
    data: { name },
  })

  revalidatePath('/contract-type-masters')
  redirect('/contract-type-masters')
}

export async function deleteContractTypeMaster(
  formData: FormData,
) {
  const id =
    String(formData.get('id') ?? '')

  await prisma.contractTypeMaster.delete({
    where: { id },
  })

  revalidatePath('/contract-type-masters')
  redirect('/contract-type-masters')
}

export async function toggleContractTypeMaster(
  formData: FormData,
) {
  const id =
    String(formData.get('id') ?? '')

  const current =
    await prisma.contractTypeMaster.findUnique({
      where: { id },
    })

  if (!current) {
    redirect('/contract-type-masters')
  }

  await prisma.contractTypeMaster.update({
    where: { id },
    data: {
      isActive: !current.isActive,
    },
  })

  revalidatePath('/contract-type-masters')
  redirect('/contract-type-masters')
}
