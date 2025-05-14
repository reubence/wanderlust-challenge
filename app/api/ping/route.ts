import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
  try {
<<<<<<< HEAD
    const result = await db.$queryRaw`SELECT 1 as ping`
=======
    const result = await db.queryRaw`SELECT 1 as ping`
>>>>>>> a3c8059ba15d313e565573fe079cef40d7902851

    return NextResponse.json({
      status: "ok",
      database: "connected",
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("API ping error:", error)
    return NextResponse.json(
      {
        status: "error",
        message: "Database connection failed",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
