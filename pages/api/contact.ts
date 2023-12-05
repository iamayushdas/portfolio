import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/app/db";
import nodemailer from "nodemailer";
import path from 'path';
import { promises as fs } from 'fs';

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

      const filePath = path.join(process.cwd(), 'public', 'mailTemplate.html');
      const htmlTemplate = await fs.readFile(filePath, 'utf-8');

      const dynamicHTML = htmlTemplate
        .replace(/{{NAME}}/g, name)

      const userMailInfo = await transporter.sendMail({
        from: process.env.EMAIL_USER_SEND,
        to: email,
        subject: "Thank you for contacting us!",
        html: dynamicHTML,
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
