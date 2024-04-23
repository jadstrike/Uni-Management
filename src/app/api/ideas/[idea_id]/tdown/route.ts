import { NextRequest, NextResponse } from "next/server";
import { $Enums, PrismaClient } from "@prisma/client";
import { getDataFromToken } from "@/helpers/getDataFromToken";

const prisma = new PrismaClient();

export async function PUT(request: NextRequest) {
  const ideaId = request.url.split("/")[5];

  try {
    const userId = await getDataFromToken(request);
    const idea = await prisma.idea.findUnique({ where: { id: ideaId } });
    const tdownCount = idea?.thumbsDown || 0;
    const tupCount = idea?.thumbsUp || 0;
    const interaction = await prisma.ideaInteraction.findFirst({
      where: {
        userId,
        ideaId,
      },
    });

    if (interaction && interaction.type == $Enums.Interaction.ThumbsDown) {
      await prisma.ideaInteraction.delete({
        where: { id: interaction.id },
      });
      const data = await prisma.idea.update({
        where: { id: ideaId },
        data: { thumbsDown: tdownCount - 1 },
      });

      return NextResponse.json({
        message: "Thumbs Down is removed",
        data,
      });
    }

    if (interaction && interaction.type == $Enums.Interaction.ThumbsUp) {
      await prisma.ideaInteraction.update({
        where: { id: interaction.id },
        data: { type: $Enums.Interaction.ThumbsDown },
      });

      const data = await prisma.idea.update({
        where: { id: ideaId },
        data: {
          thumbsUp: tupCount - 1,
          thumbsDown: tdownCount + 1,
        },
      });

      return NextResponse.json({
        message: "Thumbs Down is added",
        data,
      });
    }

    const data = await prisma.idea.update({
      where: { id: ideaId },
      data: {
        thumbsDown: tdownCount + 1,
        users: {
          create: [
            {
              type: "ThumbsDown",
              user: { connect: { id: userId } },
            },
          ],
        },
      },
    });
    return NextResponse.json({
      message: "Thumbs Down is added",
      data,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
