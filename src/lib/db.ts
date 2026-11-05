import "server-only";
import { Pool, type PoolClient } from "pg";
import { dbSchema, resolveSchemaSql } from "./db-schema";

const globalPool = globalThis as typeof globalThis & { __zvlPoolV2?: Pool };

type QueryArgs = unknown[];

function rewrite(args: QueryArgs): QueryArgs {
  const first = args[0];
  if (typeof first === "string") return [resolveSchemaSql(first), ...args.slice(1)];
  if (first && typeof first === "object" && "text" in first && typeof (first as { text?: unknown }).text === "string") {
    return [{ ...(first as object), text: resolveSchemaSql((first as { text: string }).text) }, ...args.slice(1)];
  }
  return args;
}

// Every query goes through resolveSchemaSql, so SQL files only contain the {schema}. marker.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function wrapQuery<T extends (...args: any[]) => unknown>(query: T): T {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return ((...args: any[]) => query(...(rewrite(args) as Parameters<T>))) as T;
}

export function pool() {
  if (!globalPool.__zvlPoolV2) {
    const connectionString = process.env.DATABASE_PRO_URL || process.env.DIRECT_PRO_URL;
    if (!connectionString) throw new Error("DATABASE_PRO_URL is required to save video history.");
    dbSchema(); // Fail fast when DATABASE_PRO_NAME is missing or invalid.
    const url = new URL(connectionString);
    // Honor the existing libpq sslmode=require semantics on the configured Supabase pooler.
    // For certificate validation use sslmode=verify-full and a trusted CA instead.
    const requireTls = url.searchParams.get("sslmode") === "require";
    if (requireTls) { url.searchParams.delete("sslmode"); url.searchParams.delete("uselibpqcompat"); }
    const base = new Pool({ connectionString: url.toString(), ...(requireTls ? { ssl: { rejectUnauthorized: false } } : {}), max: 5, connectionTimeoutMillis: 8000 });
    const originalQuery = base.query.bind(base);
    base.query = wrapQuery(originalQuery);
    // Pool.query uses the callback form of connect internally; wrap clients on creation instead
    // of overriding connect, which would swallow that callback.
    base.on("connect", (client: PoolClient) => {
      client.query = wrapQuery(client.query.bind(client));
    });
    globalPool.__zvlPoolV2 = base;
  }
  return globalPool.__zvlPoolV2;
}
