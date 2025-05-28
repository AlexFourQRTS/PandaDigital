import { Injectable } from '@nestjs/common';
import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from 'ws';
import * as schema from '../../../shared/schema';

neonConfig.webSocketConstructor = ws;

@Injectable()
export class DatabaseService {
  public db: ReturnType<typeof drizzle>;
  private pool: Pool;

  constructor() {
    if (!process.env.DATABASE_URL) {
      throw new Error(
        'DATABASE_URL must be set. Did you forget to provision a database?',
      );
    }

    this.pool = new Pool({ connectionString: process.env.DATABASE_URL });
    this.db = drizzle({ client: this.pool, schema });
  }

  async onModuleDestroy() {
    await this.pool.end();
  }
}