import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { sendEmail } from "@/helpers/report";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  const { message } = reqBody;

  try {
    const userID = await getDataFromToken(request);
    const user = await prisma.user.findUnique({ where: { id: userID } });
    const username = user?.name;
    const ideaId = request.url.split("/")[5];
    const idea = await prisma.idea.findUnique({ where: { id: ideaId } });

    await sendEmail({ username, message, idea });

    return NextResponse.json({ message: "Report has been successfully sent" });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
