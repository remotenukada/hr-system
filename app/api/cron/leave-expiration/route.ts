import { expireEligibleLeaves } from "@/lib/expire-leaves";

export async function POST(request: Request) {
  const secret = request.headers.get("x-cron-secret");

  if (!process.env.CRON_SECRET || secret !== process.env.CRON_SECRET) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const result = await expireEligibleLeaves("system-cron");

    return Response.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        error: "expiration failed",
      },
      { status: 500 },
    );
  }
}
