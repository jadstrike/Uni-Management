import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  const { name } = reqBody;
  try {
    const department = await prisma.department.create({
      data: { name },
    });

    return NextResponse.json({ department });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
