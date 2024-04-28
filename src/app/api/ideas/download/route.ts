import { parse } from "json2csv";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const ideas = await prisma.idea.findMany({
      include: {
        author: { select: { name: true } },
        categories: {
          include: {
            category: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    if (ideas.length > 0) {
      const csv = parse(ideas);

      // Set the response headers for CSV
      const headers = {
        "Content-Type": "text/csv",
        "Content-Disposition": "attachment; filename=ideas.csv",
      };

      return new NextResponse(csv, { headers });
    } else {
      console.log("Ideas not found.");
    }
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
