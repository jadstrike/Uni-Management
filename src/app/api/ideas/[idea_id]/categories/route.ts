import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(request: NextRequest) {
  const reqBody = await request.json();
  const ideaId = request.url.split("/")[5];
  const { categories } = reqBody;

  try {
    // const idea = await prisma.idea.findUnique({
    //   where: { id: ideaId },
    //   include: { categories: true },
    // });

    const idea = await prisma.idea.update({
      where: { id: ideaId },
      data: {
        categories: {
          set: categories.map((categoryId: any) => ({ id: categoryId })),
        },
      },
    });

    return NextResponse.json({ idea });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
