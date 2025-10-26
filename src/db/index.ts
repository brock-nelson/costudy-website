import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import dotenv from "dotenv";

// Load environment variables (important for seed scripts and CLI tools)
if (typeof window === "undefined") {
  dotenv.config({ path: ".env.local" });
}

// Lazy database connection - only initialize when actually used
let _db: ReturnType<typeof drizzle> | null = null;

function getDb() {
  if (_db) return _db;

  // Get the connection string from environment variables
  const connectionString = process.env.POSTGRES_URL_NON_POOLING || process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("Missing database connection string");
  }

  // Create postgres client
  const client = postgres(connectionString);

  // Create and cache the database connection
  _db = drizzle(client, { schema });
  return _db;
}

// Export db as a proxy that lazily initializes
export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get(_target, prop) {
    const realDb = getDb();
    return (realDb as any)[prop];
  }
});

// Export all schema types and tables
export * from "./schema";
