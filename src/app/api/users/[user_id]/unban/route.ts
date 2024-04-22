import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(request: NextRequest) {
  const userId = request.url.split("/")[5];

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user?.isBanned) {
      return NextResponse.json({
        message: "This user is not in banned state.",
      });
    } else {
      const unbannedUser = await prisma.user.update({
        where: { id: user?.id },
        data: { isBanned: false },
      });

      const shownIdeasByUser = await prisma.idea.updateMany({
        where: { authorId: user?.id },
        data: { isHidden: false },
      });

      const shownCommentsByUser = await prisma.comment.updateMany({
        where: { userId: user?.id },
        data: { isHidden: false },
      });

      return NextResponse.json({
        message: "Successfully unbanned the user",
        unbannedUser,
        shownIdeasByUser,
        shownCommentsByUser,
      });
    }
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
