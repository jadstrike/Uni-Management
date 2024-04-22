import nodemailer from "nodemailer";

export const transport = nodemailer.createTransport({
  service: "gmail",
  host: "sandbox.gmail.com",
  port: 2525,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});
