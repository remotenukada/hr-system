"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function setFacilityScope(formData: FormData) {
  const facilityId = String(formData.get("facilityId") ?? "ALL");

  const cookieStore = await cookies();

  cookieStore.set("facilityScope", facilityId, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });

  revalidatePath("/");
  redirect("/");
}
