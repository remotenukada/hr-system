'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createEmploymentCategoryMaster(
  formData: FormData,
) {
  const name = String(formData.get('name') ?? '').trim()

  if (!name) {
    redirect('/employment-category-masters/new')
  }

  await prisma.employmentCategoryMaster.create({
    data: { name },
  })

  revalidatePath('/employment-category-masters')
  redirect('/employment-category-masters')
}

export async function updateEmploymentCategoryMaster(
  formData: FormData,
) {
  const id =
    String(formData.get("id") ?? "");

  const name =
    String(formData.get("name") ?? "").trim();

  await prisma.employmentCategoryMaster.update({
    where: { id },
    data: { name },
  });

  revalidatePath("/employment-category-masters");

  redirect("/employment-category-masters");
}

export async function deleteEmploymentCategoryMaster(
  formData: FormData,
) {
  const id =
    String(formData.get("id") ?? "");

  await prisma.employmentCategoryMaster.delete({
    where: { id },
  });

  revalidatePath("/employment-category-masters");

  redirect("/employment-category-masters");
}

export async function toggleEmploymentCategoryMaster(
  formData: FormData,
) {
  const id =
    String(formData.get("id") ?? "");

  const current =
    await prisma.employmentCategoryMaster.findUnique({
      where: { id },
    });

  if (!current) {
    redirect("/employment-category-masters");
  }

  await prisma.employmentCategoryMaster.update({
    where: { id },
    data: {
      isActive: !current.isActive,
    },
  });

  revalidatePath("/employment-category-masters");

  redirect("/employment-category-masters");
}
