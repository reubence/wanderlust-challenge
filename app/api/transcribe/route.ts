import { NextResponse } from "next/server";
import { z } from "zod";

const envSchema = z.object({
  GOOGLE_API_KEY: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const env = envSchema.parse({
      GOOGLE_API_KEY: process.env.GOOGLE_AI_API_KEY,
    });

    const formData = await request.formData();
    const audioFile = formData.get("audio") as File;
    const language = (formData.get("language") as string) || "en-US";

    if (!audioFile) {
      return NextResponse.json({ error: "Audio file is required" }, { status: 400 });
    }

    const arrayBuffer = await audioFile.arrayBuffer();
    const base64Audio = Buffer.from(arrayBuffer).toString("base64");

    const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${env.GOOGLE_API_KEY}`;

    const body = {
      contents: [
        {
          role: "user",
          parts: [
            {
              inlineData: {
                mimeType: "audio/webm", // or "audio/mpeg" depending on your input
                data: base64Audio,
              },
            },
            {
              text: `Transcribe the audio. Language: ${language}. Only return names of cities, states, or countries mentioned.`,
            },
          ],
        },
      ],
    };

    const response = await fetch(geminiEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    console.log("Gemini response:", data);

    const transcript = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!transcript) {
      return NextResponse.json({ error: "No transcription returned" }, { status: 500 });
    }

    return NextResponse.json({ transcript });
  } catch (error) {
    console.error("Transcription error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Transcription failed",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
