import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getDataFromToken } from "@/helpers/getDataFromToken";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { title, content, categories } = reqBody;
    const authorId = await getDataFromToken(request);

    const newIdea = await prisma.idea.create({
      data: {
        title,
        content,
        authorId,
        categories: {
          create: categories.map((categoryID: any) => ({
            category: {
              connect: {
                id: categoryID,
              },
            },
          })),
        },
      },
    });

    console.log(newIdea);

    return NextResponse.json({
      message: "Idea created successfully",
      newIdea,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  const ideas = await prisma.idea.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ ideas });
}
