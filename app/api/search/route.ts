import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

const searchSchema = z.object({
  query: z.string().min(1), // Ensures that the query is at least 1 character long
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Check if query is provided and not empty
    if (!body.query || body.query.trim() === "") {
      return NextResponse.json(
        { status: "error", message: "Query must not be empty" },
        { status: 400 }
      );
    }

    // Validate the query
    const result = searchSchema.parse(body);
    console.log("Search query received:", result.query);

    // Perform the search in the database
    const destinations = await db.destination.findMany({
      where: {
        OR: [
          { name: { contains: result.query, mode: "insensitive" } },
          { location: { contains: result.query, mode: "insensitive" } }, // Searching in 'location' now
        ],
      },
      take: 10, // Limit results to 10
    });

    console.log("Destinations found:", destinations);

    return NextResponse.json({ results: destinations });
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Search failed",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 400 }
    );
  }
}
