import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  const { initial, final } = reqBody;

  try {
    const closure = await prisma.closureDate.create({
      data: {
        initialClosureDate: initial,
        finalClosureDate: final,
      },
    });

    return NextResponse.json({
      message: "Closure dates has been successfully added.",
      closure,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  const closure = await prisma.closureDate.findMany();

  return NextResponse.json({ closure });
}
