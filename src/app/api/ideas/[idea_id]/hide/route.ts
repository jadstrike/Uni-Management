import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(request: NextRequest) {
  const ideaId = request.url.split("/")[5];
  try {
    const hiddenIdea = await prisma.idea.update({
      where: { id: ideaId },
      data: { isHidden: true },
      include: { categories: { include: { category: true } } },
    });

    return NextResponse.json({
      message: "Successfully hid the idea.",
      hiddenIdea,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
