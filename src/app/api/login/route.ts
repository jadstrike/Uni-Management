import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    // check if user exists
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    const username = user.name;
    const role = user.role;

    // check if the password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        {
          error: "Invalid password",
        },
        { status: 400 }
      );
    }

    // check if the user is banned
    if (user.isBanned) {
      return NextResponse.json({ message: "This user account is banned." });
    }

    // create token data
    const tokenData = {
      id: user.id,
      username: user.name,
      email: user.email,
    };

    // create token
    const token = jwt.sign(tokenData, process.env.SECRET_TOKEN!, {
      expiresIn: "1d",
    });
    const response = NextResponse.json({
      message: "Successfully logged in",
      username,
      role,
    });
    response.cookies.set("token", token, { httpOnly: true });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
