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
    return NextResponse.json(
      {
        status: "error",
        message: "Transcription failed",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
