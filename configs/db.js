import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
// console.log("DATABASE_URL:", process.env.NEXT_PUBLIC_DATABASE_URL);
const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);
export const db = drizzle({ client: sql });
