import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { text } = reqBody;
    const id = request.url.split("comments/")[1];

    console.log(id);

    const updatedComment = await prisma.comment.update({
      where: { id },
      data: { text },
    });

    return NextResponse.json({
      message: "Comment updated successfully",
      updatedComment,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = request.url.split("comments/")[1];

    const deletedComment = await prisma.comment.delete({ where: { id } });

    return NextResponse.json({
      message: "Comment deleted successfully",
      deletedComment,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
