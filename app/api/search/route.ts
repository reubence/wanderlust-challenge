import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { searchSchema } from "@/lib/validations"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const result = searchSchema.parse(body)

    const destinations = await db.destinations.findMany({
      where: {
        OR: [
          { name: { contains: result.query, mode: "insensitive" } },
          { description: { contains: result.query, mode: "insensitive" } },
        ],
      },
      take: result.limit || 10,
    })

    return NextResponse.json({ results: destinations })
  } catch (error) {
    console.error("Search API error:", error)
    return NextResponse.json(
      {
        status: "error",
        message: "Search failed",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 400 },
    )
  }
}
