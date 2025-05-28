import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./migrations",
  schema: "../shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    host: "78.26.216.97",
    port: 5432,
    user: "xsanderadmin",
    password: "qweasdrtyfghvbnjklyuiospgmrj",
    database: "postgres",
    ssl: false,
  },
});