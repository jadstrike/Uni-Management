import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const id = request.url.split("ideas/")[1];

  const idea = await prisma.idea.findUnique({ where: { id } });

  return NextResponse.json(idea);
}

export async function PUT(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { title, content } = reqBody;
    const id = request.url.split("ideas/")[1];

    const updatedIdea = await prisma.idea.update({
      where: { id },
      data: { title, content },
    });

    return NextResponse.json({
      message: "Idea updated successfully",
      success: true,
      updatedIdea,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const id = request.url.split("ideas/")[1];

  const deletedIdea = await prisma.idea.delete({ where: { id } });

  return NextResponse.json({
    message: "Idea deleted successfully",
    success: true,
    deletedIdea,
  });
}
