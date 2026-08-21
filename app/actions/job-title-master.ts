'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createJobTitleMaster(
  formData: FormData,
) {
  const name =
    String(formData.get('name') ?? '').trim()

  await prisma.jobTitleMaster.create({
    data: {
      name,
    },
  })

  revalidatePath('/job-title-masters')

  redirect('/job-title-masters')
}

export async function updateJobTitleMaster(
  formData: FormData,
) {
  const id =
    String(formData.get("id") ?? "");

  const name =
    String(formData.get("name") ?? "").trim();

  await prisma.jobTitleMaster.update({
    where: { id },
    data: { name },
  });

  revalidatePath("/job-title-masters");

  redirect("/job-title-masters");
}

export async function deleteJobTitleMaster(
  formData: FormData,
) {
  const id =
    String(formData.get("id") ?? "");

  await prisma.jobTitleMaster.delete({
    where: { id },
  });

  revalidatePath("/job-title-masters");
  redirect("/job-title-masters");
}

export async function toggleJobTitleMaster(
  formData: FormData,
) {
  const id =
    String(formData.get("id") ?? "");

  const current =
    await prisma.jobTitleMaster.findUnique({
      where: { id },
    });

  if (!current) {
    redirect("/job-title-masters");
  }

  await prisma.jobTitleMaster.update({
    where: { id },
    data: {
      isActive: !current.isActive,
    },
  });

  revalidatePath("/job-title-masters");
  redirect("/job-title-masters");
}
