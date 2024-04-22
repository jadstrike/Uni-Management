import { transport } from "./nodemailer";

export const sendEmail = async ({ username, message, idea }: any) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL,
      to: "issaciscoding@gmail.com",
      subject: "You just received a report",
      html: `<h4>A user ${username} has reported to you about a post.</h4>
      <p>report message: ${message}</p>
      <h5>On this post: </h5>
      <p>title: ${idea.title}</p>
      <p>text: ${idea.content}</p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
