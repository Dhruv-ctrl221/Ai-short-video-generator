import { db } from "@/configs/db";
import { Users } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
    
  const { name, email, imageUrl } = await req.json();

  const result = await db
    .select()
    .from(Users)
    .where(eq(Users.email, email));

  if (!result[0]) {
    await db.insert(Users).values({
      name,
      email,
      imageUrl,
    });
  }

  return NextResponse.json({ success: true });
}