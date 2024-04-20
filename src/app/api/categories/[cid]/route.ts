import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(request: NextRequest) {
  const id = request.url.split("categories/")[1];
  const reqBody = await request.json();
  const { name } = reqBody;
  try {
    const updatedCategory = await prisma.category.update({
      where: { id },
      data: { name },
    });

    return NextResponse.json({
      message: "Successfully updated the category name.",
      updatedCategory,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const id = request.url.split("categories/")[1];

  const categoryInUsed = await prisma.categoriesOnIdeas.count({
    where: { categoryId: id },
  });

  if (categoryInUsed) {
    return NextResponse.json({
      message: "This category is already in use",
    });
  }

  const deletedCategory = await prisma.category.delete({ where: { id } });

  return NextResponse.json({
    message: "Successfully deleted category",
    deletedCategory,
  });
}
