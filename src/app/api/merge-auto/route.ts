import { NextResponse } from "next/server";
import { mergePdfs } from "@/server/services/pdf.service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const coverEntry = formData.get("cover");
    const cover = typeof coverEntry === "object" && coverEntry !== null ? (coverEntry as File) : null;
    const rawFiles = formData.getAll("files");
    const files = rawFiles.filter((item): item is File => typeof item === "object" && item !== null);

    if (!cover) {
      return NextResponse.json(
        { error: "Cover PDF file is missing." },
        { status: 400 }
      );
    }

    if (files.length === 0) {
      return NextResponse.json(
        { error: "At least one report PDF file is required to merge." },
        { status: 400 }
      );
    }

    const mergedPdfBytes = await mergePdfs(cover, files);

    return new NextResponse(Buffer.from(mergedPdfBytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=merged.pdf",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Merge failed";
    console.error("Merge error:", error);
    return NextResponse.json(
      { error: message },
      { status: 400 }
    );
  }
}
