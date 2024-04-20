import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const name = await request.json();

    const newCategory = await prisma.category.create({ data: name });

    return NextResponse.json({
      message: "Category added successfully",
      newCategory,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  const categories = await prisma.category.findMany();

  return NextResponse.json({ categories });
}
