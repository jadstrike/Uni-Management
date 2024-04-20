import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(request: NextRequest) {
  const ideaId = request.url.split("/")[5];
  const idea = await prisma.idea.findUnique({ where: { id: ideaId } });
  const tupCount = idea?.thumbsUp;
  const thumbsUp = tupCount + 1;

  const data = await prisma.idea.update({
    where: { id: ideaId },
    data: { thumbsUp },
  });
  return NextResponse.json({ data });
}
