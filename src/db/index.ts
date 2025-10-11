import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import dotenv from "dotenv";

// Load environment variables (important for seed scripts and CLI tools)
if (typeof window === "undefined") {
  dotenv.config({ path: ".env.local" });
}

// Get the connection string from environment variables
const connectionString = process.env.POSTGRES_URL_NON_POOLING || process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("Missing database connection string");
}

// Create postgres client
const client = postgres(connectionString);

// Create the database connection
export const db = drizzle(client, { schema });

// Export all schema types and tables
export * from "./schema";
