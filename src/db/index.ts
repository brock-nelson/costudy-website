import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import * as schema from "./schema";
import dotenv from "dotenv";

// Load environment variables (important for seed scripts and CLI tools)
if (typeof window === "undefined") {
  dotenv.config({ path: ".env.local" });
}

// Lazy database initialization to avoid build-time errors when env vars aren't available
let dbInstance: PostgresJsDatabase<typeof schema> | null = null;
let clientInstance: ReturnType<typeof postgres> | null = null;

function getDb(): PostgresJsDatabase<typeof schema> {
  if (!dbInstance) {
    // Get the connection string from environment variables
    const connectionString = process.env.POSTGRES_URL_NON_POOLING || process.env.DATABASE_URL;

    if (!connectionString) {
      throw new Error("Missing database connection string (POSTGRES_URL_NON_POOLING or DATABASE_URL)");
    }

    // Create postgres client
    clientInstance = postgres(connectionString);

    // Create the database connection
    dbInstance = drizzle(clientInstance, { schema });
  }
  return dbInstance;
}

// Export a proxy that lazily initializes the database
export const db = new Proxy({} as PostgresJsDatabase<typeof schema>, {
  get: (target, prop) => {
    const instance = getDb();
    const value = instance[prop as keyof typeof instance];
    return typeof value === 'function' ? value.bind(instance) : value;
  },
});

// Export all schema types and tables
export * from "./schema";
