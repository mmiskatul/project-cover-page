import { NextResponse } from "next/server";
import { getSiteStats } from "@/server/services/stats.service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const stats = await getSiteStats();
  return NextResponse.json(stats);
}
