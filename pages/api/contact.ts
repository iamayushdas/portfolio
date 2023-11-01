import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/app/db";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, email, message } = req.body;

    try {
      const savedSubmission = await prisma.contactForm.create({
        data: {
          name,
          email,
          message,
        },
      });

      const userMailText = `Hello ${name},\n\nThank you for your message. We received the following details:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}\n\nWe will get back to you soon.`;

      const userMailInfo = await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Thank you for contacting us!",
        text: userMailText,
      });

      const adminMailText = `A new message has been received:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`;

      const adminMailInfo = await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: "New Form Submission",
        text: adminMailText,
      });

      res.status(200).json({ savedSubmission, userMailInfo, adminMailInfo });
    } catch (error) {
      res.status(500).json({ error: "Error processing contact form" });
    }
  } else {
    res.status(405).end();
  }
}
