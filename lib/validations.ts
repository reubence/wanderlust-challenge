import { z } from "zod";

// Search Schema: for validating the query and pagination parameters (limit, offset)
export const searchSchema = z.object({
  query: z.string().min(1, "Query must be provided"),  // Ensures the search query is not empty
  limit: z.number().positive().optional(),  // Optional, but when provided, it must be a positive number
  offset: z.number().positive().optional(),  // Optional, but when provided, it must be a positive number
});

// Environment Variables Schema: Ensures necessary environment variables are provided
export const envSchema = z.object({
  DATABASE_URL: z.string(),  // Database connection URL
  OPENROUTER_API_URL: z.string().url(),  // URL for OpenRouter API, must be a valid URL
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),  // Node environment with a default value
});

// Destination Schema: For validating destination data, including name, location, description, etc.
export const destinationSchema = z.object({
  name: z.string(),  // Destination name
  location: z.string(),  // Location of the destination (corrected from 'desination' to 'location')
  description: z.string(),  // Description of the destination
  imageUrl: z.string().url().optional(),  // Optional image URL (must be a valid URL if provided)
  embedding: z.array(z.number()).optional(),  // Optional array of numbers for embedding data (e.g., for AI/ML use)
});
