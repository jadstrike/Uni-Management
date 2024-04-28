import { NextResponse } from "next/server";
import { $Enums, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const ideaCount = await prisma.idea.count();
    const staffCount = await prisma.user.count({
      where: { role: $Enums.Role.Staff },
    });
    const departmentCount = await prisma.department.count();
    const commentCount = await prisma.comment.count();

    return NextResponse.json({
      ideaCount,
      staffCount,
      departmentCount,
      commentCount,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
