import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getDataFromToken } from "@/helpers/getDataFromToken";

const prisma = new PrismaClient();

export async function PUT(request: NextRequest) {
  try {
    const ideaId = request.url.split("/")[5];
    const userId = await getDataFromToken(request);
    const idea = await prisma.idea.findUnique({ where: { id: ideaId } });

    const tupCount = idea?.thumbsUp || 0;
    const thumbsUp = tupCount + 1;

    const data = await prisma.idea.update({
      where: { id: ideaId },
      data: {
        thumbsUp,
        users: {
          create: [
            {
              type: "ThumbsUp",
              user: {
                connect: {
                  id: userId,
                },
              },
            },
          ],
        },
      },
    });
    return NextResponse.json({ data });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
