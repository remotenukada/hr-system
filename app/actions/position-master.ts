'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createPositionMaster(
  formData: FormData,
) {
  const name =
    String(formData.get('name') ?? '').trim()

  await prisma.positionMaster.create({
    data: {
      name,
    },
  })

  revalidatePath('/position-masters')

  redirect('/position-masters')
}

export async function updatePositionMaster(
  formData: FormData,
) {
  const id =
    String(formData.get("id") ?? "");

  const name =
    String(formData.get("name") ?? "").trim();

  await prisma.positionMaster.update({
    where: { id },
    data: { name },
  });

  revalidatePath("/position-masters");

  redirect("/position-masters");
}

export async function deletePositionMaster(
  formData: FormData,
) {
  const id =
    String(formData.get("id") ?? "");

  await prisma.positionMaster.delete({
    where: { id },
  });

  revalidatePath("/position-masters");
  redirect("/position-masters");
}

export async function togglePositionMaster(
  formData: FormData,
) {
  const id =
    String(formData.get("id") ?? "");

  const current =
    await prisma.positionMaster.findUnique({
      where: { id },
    });

  if (!current) {
    redirect("/position-masters");
  }

  await prisma.positionMaster.update({
    where: { id },
    data: {
      isActive: !current.isActive,
    },
  });

  revalidatePath("/position-masters");
  redirect("/position-masters");
}
