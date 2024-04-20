import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const userId = request.url.split("users/")[1];
  const user = await prisma.user.findUnique({ where: { id: userId } });

  return NextResponse.json({ user });
}
