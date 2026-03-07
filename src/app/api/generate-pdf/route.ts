import { type NextRequest, NextResponse } from "next/server";
import { generateCoverPdf } from "@/server/services/pdf.service";
import { incrementCoverCount } from "@/server/services/stats.service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const chromiumPackUrl = new URL("/chromium-pack.tar", request.url).toString();
    const pdfBuffer = await generateCoverPdf({
      html: body?.html,
      chromiumPackUrl,
    });

    await incrementCoverCount();

    return new NextResponse(Buffer.from(pdfBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="cover-${Date.now()}.pdf"`,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to generate PDF";
    const isValidation = message === "HTML content required";
    console.error("PDF Generation Error:", error);
    return NextResponse.json({ error: message }, { status: isValidation ? 400 : 500 });
  }
}
