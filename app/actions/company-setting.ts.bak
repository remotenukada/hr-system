"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import path from "path";
import { mkdir, writeFile } from "fs/promises";
import { randomUUID } from "crypto";

export async function saveCompanySetting(formData: FormData) {
  const companyName = formData.get("companyName") as string;

  const postalCode = formData.get("postalCode") as string;

  const address = formData.get("address") as string;

  const phoneNumber = formData.get("phoneNumber") as string;

  const representativeName = formData.get("representativeName") as string;

  const mailFrom = formData.get("mailFrom") as string;
  const smtpHost = formData.get("smtpHost") as string;

  const smtpPortRaw = formData.get("smtpPort") as string;

  const smtpUser = formData.get("smtpUser") as string;

  const smtpSecure = formData.get("smtpSecure") === "on";

  const consultationDesk = formData.get("consultationDesk") as string;

  const workRuleLocation = formData.get("workRuleLocation") as string;

  const sealImage = formData.get("sealImage");

  let sealImagePath: string | null = null;

  if (sealImage instanceof File && sealImage.size > 0) {
    const uploadDir = "/data/hr-system/seals";

    await mkdir(uploadDir, {
      recursive: true,
    });

    const extension = path.extname(sealImage.name) || ".png";

    const fileName = `${randomUUID()}${extension}`;

    const fullPath = path.join(uploadDir, fileName);

    const bytes = await sealImage.arrayBuffer();

    await writeFile(fullPath, Buffer.from(bytes));

    sealImagePath = `/seals/${fileName}`;
  }

  const current = await prisma.companySetting.findFirst();

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
        representativeName: representativeName || null,
        mailFrom: mailFrom || null,
        smtpHost: smtpHost || null,
        smtpPort: smtpPortRaw ? Number(smtpPortRaw) : null,
        smtpUser: smtpUser || null,
        smtpSecure,
        consultationDesk: consultationDesk || null,
        workRuleLocation: workRuleLocation || null,
        sealImagePath: sealImagePath || current.sealImagePath || null,
      },
    });
  } else {
    await prisma.companySetting.create({
      data: {
        companyName,
        postalCode: postalCode || null,
        address: address || null,
        phoneNumber: phoneNumber || null,
        representativeName: representativeName || null,
        mailFrom: mailFrom || null,
        smtpHost: smtpHost || null,
        smtpPort: smtpPortRaw ? Number(smtpPortRaw) : null,
        smtpUser: smtpUser || null,
        smtpSecure,
        consultationDesk: consultationDesk || null,
        workRuleLocation: workRuleLocation || null,
        sealImagePath: sealImagePath || null,
      },
    });
  }

  revalidatePath("/company-settings");

  redirect("/company-settings");
}
