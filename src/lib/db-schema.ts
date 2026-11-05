import "server-only";

const pattern = /^[a-z_][a-z0-9_]{0,62}$/i;

// Schema names cannot be bound as SQL parameters; only accept a plain identifier.
export function dbSchema() {
  const value = process.env.DATABASE_PRO_NAME?.trim();
  if (!value) throw new Error("DATABASE_PRO_NAME is required; set it to the schema this deployment should use.");
  if (!pattern.test(value)) throw new Error("DATABASE_PRO_NAME must be a plain PostgreSQL schema identifier.");
  if (value !== "firsttimeinafancycafeai_pro") throw new Error("This site requires the firsttimeinafancycafeai_pro schema.");
  return value;
}

// All runtime SQL qualifies tables with {schema} and is restricted to this site’s isolated schema.
export function resolveSchemaSql(sql: string) {
  return sql.includes("{schema}") ? sql.replaceAll("{schema}", dbSchema()) : sql;
}
