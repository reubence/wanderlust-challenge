<<<<<<< HEAD
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
=======
import { NextResponse } from "next/server"
import { z } from "zod"

const envSchema = z.object({
  GOOGLE_AI_API_URL: z.string().url(),
})

const transcribeSchema = z.object({
  audioData: z.string(),
  language: z.string().optional(),
})

export async function POST(request: Request) {
  try {
    // Validate environment variables
    const env = envSchema.parse({
      GOOGLE_AI_API_URL: process.env.GOOGLE_AI_API_URL,
    })

    const formData = await request.formData()
    const audioFile = formData.get("audio") as File
    const language = (formData.get("language") as string) || "en"

    if (!audioFile) {
      return NextResponse.json({ error: "Audio file is required" }, { status: 400 })
    }

    // This endpoint doesn't exist and needs to be fixed
    const response = await fetch(`${env.GOOGLE_AI_API_URL}/transcribe`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GOOGLE_AI_API_KEY}`,
        "Content-Type": "multipart/form-data",
      },
      body: JSON.stringify({
        file: audioFile,
        language,
      }),
    })

    if (!response.ok) {
      throw new Error(`Transcription failed: ${response.statusText}`)
    }

    const data = await response.json()
    return NextResponse.json({ transcript: data.text })
  } catch (error) {
    console.error("Transcription API error:", error)
>>>>>>> a3c8059ba15d313e565573fe079cef40d7902851
    return NextResponse.json(
      {
        status: "error",
        message: "Transcription failed",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
<<<<<<< HEAD
    );
=======
    )
>>>>>>> a3c8059ba15d313e565573fe079cef40d7902851
  }
}
