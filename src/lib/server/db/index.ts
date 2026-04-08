import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';
import * as authSchema from './schema/auth-schema';
import * as relations from './schema/relations';
import 'dotenv/config';

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

const client = new Pool({ connectionString: process.env.DATABASE_URL });

export const db = drizzle({ client, schema: { ...schema, ...authSchema, ...relations } });
