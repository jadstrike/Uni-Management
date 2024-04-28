import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(request: NextRequest) {
  const id = request.url.split("/")[6];
  const reqBody = await request.json();
  console.log(reqBody);
  const { initialClosureDate, finalClosureDate } = reqBody;

  try {
    const updatedDates = await prisma.closureDate.update({
      where: { id },
      data: {
        initialClosureDate,
        finalClosureDate,
      },
    });

    return NextResponse.json({
      message: "Successfully updated the closure dates.",
      updatedDates,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
