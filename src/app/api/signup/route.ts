import { NextRequest, NextResponse } from "next/server";
import { $Enums, PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
// import { sendEmail } from "@/helpers/mailer";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password, role, departmentId } = reqBody;

    // check if user already exists
    const user = await prisma.user.findUnique({ where: { email } });

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // check if qa manager already exists
    const qam = await prisma.user.findFirst({
      where: { role: $Enums.Role.QA_Manager },
    });

    if (role == "QA_Manager" && qam) {
      return NextResponse.json(
        { error: "QA manager already exists" },
        { status: 400 }
      );
    }

    // check if qa coordinator of a department already exists
    const qac = await prisma.user.findFirst({
      where: {
        role: $Enums.Role.QA_Coordinator,
        departmentId,
      },
    });

    if (role == "QA_Coordinator" && qac) {
      return NextResponse.json(
        { error: "QA coordinator of this department already exists" },
        { status: 400 }
      );
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        name: username,
        email,
        password: hashedPassword,
        role,
        departmentId,
      },
    });

    console.log(newUser);

    // send verification email
    // await sendEmail({ email, emailType: "VERIFY", userId: newUser.id });

    return NextResponse.json({
      message: "User created successfully",
      newUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
