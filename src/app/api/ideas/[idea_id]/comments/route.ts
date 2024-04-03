import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getDataFromToken } from "@/helpers/getDataFromToken";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const ideaId = request.url.split("/")[5];
    const authorId = await getDataFromToken(request);
    const reqBody = await request.json();
    const { text } = reqBody;

    const newComment = await prisma.comment.create({
      data: {
        text,
        ideaId,
        authorId,
      },
    });

    console.log(newComment);

    return NextResponse.json({
      message: "Comment created successfully",
      success: true,
      newComment,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  const comments = await prisma.comment.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ comments });
}
