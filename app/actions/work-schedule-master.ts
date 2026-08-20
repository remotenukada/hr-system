'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createWorkScheduleMaster(
  formData: FormData,
) {
  const name =
    String(formData.get('name') ?? '').trim()

  const startTime =
    String(formData.get('startTime') ?? '').trim()

  const endTime =
    String(formData.get('endTime') ?? '').trim()

  const breakMinutes = Number(
    formData.get('breakMinutes') || 0,
  )

  await prisma.workScheduleMaster.create({
    data: {
      name,
      startTime,
      endTime,
      breakMinutes,
    },
  })

  revalidatePath('/work-schedule-masters')

  redirect('/work-schedule-masters')
}

export async function updateWorkScheduleMaster(
  formData: FormData,
) {
  const id =
    String(formData.get("id") ?? "");

  await prisma.workScheduleMaster.update({
    where: { id },
    data: {
      name: String(formData.get("name") ?? ""),
      startTime: String(formData.get("startTime") ?? ""),
      endTime: String(formData.get("endTime") ?? ""),
      breakMinutes: Number(
        formData.get("breakMinutes") ?? 0,
      ),
    },
  });

  revalidatePath("/work-schedule-masters");

  redirect("/work-schedule-masters");
}

export async function deleteWorkScheduleMaster(
  formData: FormData,
) {
  const id =
    String(formData.get("id") ?? "");

  await prisma.workScheduleMaster.delete({
    where: {
      id,
    },
  });

  revalidatePath(
    "/work-schedule-masters",
  );

  redirect(
    "/work-schedule-masters",
  );
}

export async function toggleWorkScheduleMaster(
  formData: FormData,
) {
  const id =
    String(formData.get("id") ?? "");

  const current =
    await prisma.workScheduleMaster.findUnique({
      where: { id },
    });

  if (!current) {
    redirect("/work-schedule-masters");
  }

  await prisma.workScheduleMaster.update({
    where: { id },
    data: {
      isActive: !current.isActive,
    },
  });

  revalidatePath(
    "/work-schedule-masters",
  );

  redirect(
    "/work-schedule-masters",
  );
}
