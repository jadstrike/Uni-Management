import { parse } from "json2csv";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const ideas = await prisma.idea.findMany();

    if (ideas.length > 0) {
      const csv = parse(ideas);
      return NextResponse.json(csv);
    } else {
      console.log("Ideas not found.");
    }
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
