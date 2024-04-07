import nodemailer from "nodemailer";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const sendEmail = async ({ email, username }: any) => {
  try {
    var transport = nodemailer.createTransport({
      service: "gmail",
      host: "sandbox.gmail.com",
      port: 2525,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Your post has a new comment",
      html: `A user ${username} has commented on your idea.`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
