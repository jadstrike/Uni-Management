import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(request: NextRequest) {
  const ideaId = request.url.split("/")[5];
  try {
    const shownIdea = await prisma.idea.update({
      where: { id: ideaId },
      data: { isHidden: false },
      include: { categories: { include: { category: true } } },
    });

    return NextResponse.json({
      message: "Successfully showed the idea.",
      shownIdea,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
