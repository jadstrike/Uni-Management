import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const url = await request.json();

    const newImage = await prisma.document.create({ data: url });

    console.log(newImage);

    return NextResponse.json({
      message: "image created successfully",
      newImage,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
