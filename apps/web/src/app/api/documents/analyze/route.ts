import { NextResponse } from "next/server";
import { analyzeDocument } from "@/lib/document-analyzer";

export async function POST(request: Request) {
  const form = await request.formData();
  const file = form.get("file");
  const scrapeRaw = form.get("scrape");

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "File is required." }, { status: 400 });
  }

  const buffer = await file.arrayBuffer();
  const scrapedDocs =
    typeof scrapeRaw === "string" ? JSON.parse(scrapeRaw) : [];
  const result = await analyzeDocument(buffer, scrapedDocs);

  return NextResponse.json(result);
}
