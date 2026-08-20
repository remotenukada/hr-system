'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createAllowanceMaster(
  formData: FormData,
) {
  const name =
    String(formData.get('name') ?? '').trim()

  await prisma.allowanceMaster.create({
    data: {
      name,
    },
  })

  revalidatePath('/allowance-masters')

  redirect('/allowance-masters')
}

export async function updateAllowanceMaster(
  formData: FormData,
) {
  const id =
    String(formData.get("id") ?? "");

  const name =
    String(formData.get("name") ?? "").trim();

  await prisma.allowanceMaster.update({
    where: { id },
    data: { name },
  });

  revalidatePath("/allowance-masters");

  redirect("/allowance-masters");
}

export async function deleteAllowanceMaster(
  formData: FormData,
) {
  const id =
    String(formData.get("id") ?? "");

  await prisma.allowanceMaster.delete({
    where: { id },
  });

  revalidatePath("/allowance-masters");
  redirect("/allowance-masters");
}

export async function toggleAllowanceMaster(
  formData: FormData,
) {
  const id =
    String(formData.get("id") ?? "");

  const current =
    await prisma.allowanceMaster.findUnique({
      where: { id },
    });

  if (!current) {
    redirect("/allowance-masters");
  }

  await prisma.allowanceMaster.update({
    where: { id },
    data: {
      isActive: !current.isActive,
    },
  });

  revalidatePath("/allowance-masters");
  redirect("/allowance-masters");
}
