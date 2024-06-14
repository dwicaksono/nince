import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema"; // this setup if u want using query like prisma orm

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema }); // put the schema if here if u want to using prisma query style

// const result = await db.select().from(...);
