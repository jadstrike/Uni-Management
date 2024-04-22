import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(request: NextRequest) {
  const userId = request.url.split("/")[5];

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (user?.isBanned) {
      return NextResponse.json({ message: "This user is already banned." });
    } else {
      const bannedUser = await prisma.user.update({
        where: { id: user?.id },
        data: { isBanned: true },
      });

      const hiddenIdeasByUser = await prisma.idea.updateMany({
        where: { authorId: user?.id },
        data: { isHidden: true },
      });

      const hiddenCommentsByUser = await prisma.comment.updateMany({
        where: { userId: user?.id },
        data: { isHidden: true },
      });

      return NextResponse.json({
        message: "Successfully banned the user",
        bannedUser,
        hiddenIdeasByUser,
        hiddenCommentsByUser,
      });
    }
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
