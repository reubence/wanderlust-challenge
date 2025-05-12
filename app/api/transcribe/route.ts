import { NextResponse } from "next/server";
import { GoogleGenAI, createUserContent, createPartFromUri } from "@google/genai";
import * as fs from 'fs/promises';
import * as path from 'path';
import * as os from 'os';

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GOOGLE_AI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Missing Google API key" }, { status: 500 });
    }

    const formData = await request.formData();
    const audioFile = formData.get("audio") as File;

    if (!audioFile) {
      return NextResponse.json({ error: "Audio file is required" }, { status: 400 });
    }

    const tempDir = os.tmpdir();
    const tempFilePath = path.join(tempDir, `recording-${Date.now()}.mp3`);

    const arrayBuffer = await audioFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await fs.writeFile(tempFilePath, buffer);

    const ai = new GoogleGenAI({ apiKey });

    const uploadedFile = await ai.files.upload({
      file: tempFilePath,
      config: { mimeType: "audio/mpeg" },
    });

    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: createUserContent([
        createPartFromUri((() => {
          if (!uploadedFile.uri) {
            throw new Error("Uploaded file URI is undefined");
          }
          return uploadedFile.uri;
        })(), uploadedFile.mimeType || "audio/mpeg"),
        `Transcribe this audio to text. Language is always English. Only include the name of the City, State, or Countries mentioned in the audio`,
      ]),
    });

    await fs.unlink(tempFilePath);

    const transcript = result.text || "";
    return NextResponse.json({ transcript });
  } catch (error) {
    console.error("Transcription API error:", error);
    return NextResponse.json(
      { message: "Transcription failed", error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
