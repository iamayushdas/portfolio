import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET: Retrieve chat history for a session
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("sessionId");

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    const chatHistory = await prisma.chatHistory.findFirst({
      where: { sessionId },
      orderBy: { updatedAt: "desc" },
    });

    if (!chatHistory) {
      return NextResponse.json({ messages: [] });
    }

    return NextResponse.json({
      messages: chatHistory.messages,
      updatedAt: chatHistory.updatedAt,
    });
  } catch (error) {
    console.error("Error fetching chat history:", error);
    return NextResponse.json(
      { error: "Failed to fetch chat history" },
      { status: 500 }
    );
  }
}

// POST: Save or update chat history
export async function POST(request: Request) {
  try {
    const { sessionId, messages } = await request.json();

    if (!sessionId || !messages) {
      return NextResponse.json(
        { error: "Session ID and messages are required" },
        { status: 400 }
      );
    }

    // Check if chat history exists for this session
    const existing = await prisma.chatHistory.findFirst({
      where: { sessionId },
    });

    let chatHistory;
    if (existing) {
      // Update existing history
      chatHistory = await prisma.chatHistory.update({
        where: { id: existing.id },
        data: { messages },
      });
    } else {
      // Create new history
      chatHistory = await prisma.chatHistory.create({
        data: {
          sessionId,
          messages,
        },
      });
    }

    return NextResponse.json({
      success: true,
      id: chatHistory.id,
    });
  } catch (error) {
    console.error("Error saving chat history:", error);
    return NextResponse.json(
      { error: "Failed to save chat history" },
      { status: 500 }
    );
  }
}

// DELETE: Clear chat history for a session
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("sessionId");

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    await prisma.chatHistory.deleteMany({
      where: { sessionId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting chat history:", error);
    return NextResponse.json(
      { error: "Failed to delete chat history" },
      { status: 500 }
    );
  }
}
