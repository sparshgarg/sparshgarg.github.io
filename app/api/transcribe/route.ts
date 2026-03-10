import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "No audio file provided" }, { status: 400 });

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ transcript: "Transcription fallback: audio captured locally; add OPENAI_API_KEY for server transcription." });
  }

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const transcription = await client.audio.transcriptions.create({
    file,
    model: "gpt-4o-mini-transcribe"
  });

  return NextResponse.json({ transcript: transcription.text });
}
