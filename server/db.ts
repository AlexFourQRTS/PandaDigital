import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "@shared/schema";

// Use your custom database connection
const connectionString = `postgresql://xsanderadmin:qweasdrtyfghvbnjklyuiospgmrj@78.26.216.97:5432/postgres`;

export const pool = new Pool({ 
  connectionString,
  ssl: false // Adjust if your database requires SSL
});

export const db = drizzle({ client: pool, schema });