import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const cookieStore = cookies();

export async function GET() {
  try {
    const response = NextResponse.json({
      message: "Successfully logged out",
      success: true,
    });
    cookieStore.delete("role");

    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
