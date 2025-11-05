import prisma from "../../db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { entry, username } = body;
		const data = await prisma.guestbook.create({
			data: { message: entry, username },
		});
		return NextResponse.json({ success: true, data }, { status: 200 });
	} catch (error) {
		console.error("Error creating entry:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
