import { NextResponse } from "next/server";
import { mergePdfs } from "@/server/services/pdf.service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const cover = formData.get("cover") as File | null;
    const files = formData.getAll("files").filter((item): item is File => item instanceof File);
    const mergedPdfBytes = await mergePdfs(cover, files);

    return new NextResponse(Buffer.from(mergedPdfBytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=merged.pdf",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Merge failed";
    const isValidation = message === "Cover and files required";
    console.error("Merge error:", error);
    return NextResponse.json(
      { error: message },
      { status: isValidation ? 400 : 500 }
    );
  }
}
