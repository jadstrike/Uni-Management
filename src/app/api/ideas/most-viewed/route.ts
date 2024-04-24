import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const mostViewedIdeas = await prisma.idea.findMany({
    orderBy: { viewCount: "desc" },
    include: {
      author: { select: { name: true } },
      categories: { include: { category: true } },
      comments: true,
    },
  });

  return NextResponse.json({ mostViewedIdeas });
}
