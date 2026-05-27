import { NextRequest, NextResponse } from "next/server";
import { geminiModel } from "@/src/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { message } = body;

    if (!message) {
      return NextResponse.json(
        {
          success: false,
          error: "Message is required",
        },
        {
          status: 400,
        }
      );
    }

    const prompt = `
You are StudySphere AI.

You are a premium AI tutor.

Answer professionally using markdown formatting.

Student Question:
${message}
`;

    const result = await geminiModel.generateContent(prompt);

    const response = await result.response;

    const text = response.text();

    console.log("AI RESPONSE:", text);

    return NextResponse.json({
      success: true,
      response: text,
    });
  } catch (error: any) {
    console.log("FULL AI ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || "AI failed",
      },
      {
        status: 500,
      }
    );
  }
}