import prisma from "@/app/db";
import nodemailer from "nodemailer";
import path from 'path';
import { promises as fs } from 'fs';
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	const body = await req.json();
	const { name, email, message } = body;
	try {
		const savedSubmission = await prisma.contactForm.create({
			data: { name, email, message },
		});
		const filePath = path.join(process.cwd(), 'public', 'mailTemplate.html');
		const htmlTemplate = await fs.readFile(filePath, 'utf-8');
		const dynamicHTML = htmlTemplate.replace(/{{NAME}}/g, name);
		const transporter = nodemailer.createTransport({
			service: "Gmail",
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS,
			},
		});
		await transporter.sendMail({
			from: process.env.EMAIL_USER_SEND,
			to: email,
			subject: "Thank you for contacting us!",
			html: dynamicHTML,
		});
		const adminMailText = `A new message has been received:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`;
		await transporter.sendMail({
			from: process.env.EMAIL_USER,
			to: process.env.EMAIL_USER,
			subject: "New Form Submission",
			text: adminMailText,
		});
		return NextResponse.json({ success: true }, { status: 200 });
	} catch (error) {
		console.error("Error in contact API:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
