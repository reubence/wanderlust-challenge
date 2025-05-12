import { z } from "zod"

export const searchSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
  query: z.string().optional(),
})

export const envSchema = z.object({
  DATABASE_URL: z.string(),
  GOOGLE_AI_API_URL: z.string().url(),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
})

export const destinationSchema = z.object({
  name: z.string(),
  destination: z.string(),
  description: z.string(),
  imageUrl: z.string().url().optional(),
  embedding: z.array(z.number()).optional(),
})
