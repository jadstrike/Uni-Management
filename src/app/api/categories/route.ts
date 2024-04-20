import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  const { name } = reqBody;

  const newCategory = await prisma.category.create({ data: { name } });

  return NextResponse.json({
    message: "Category added successfully",
    newCategory,
  });
}

export async function GET() {
  const categories = await prisma.category.findMany();

  return NextResponse.json({ categories });
}
