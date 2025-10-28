// pages/api/action.ts
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../app/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { entry, username } = req.body;

    const data = await prisma.guestbook.create({
      data: { message: entry, username },
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error creating entry:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
