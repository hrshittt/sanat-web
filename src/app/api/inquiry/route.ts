import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const required = ["name", "email", "projectType", "vision"];
    for (const field of required) {
      if (!body[field]?.toString().trim()) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const inquiry = {
      name: body.name,
      email: body.email,
      phone: body.phone ?? "",
      brand: body.brand ?? "",
      projectType: body.projectType,
      budget: body.budget ?? "",
      timeline: body.timeline ?? "",
      vision: body.vision,
      receivedAt: new Date().toISOString(),
    };

    if (process.env.INQUIRY_WEBHOOK_URL) {
      await fetch(process.env.INQUIRY_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inquiry),
      });
    }

    console.info("[Inquiry]", inquiry);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to process inquiry" },
      { status: 500 }
    );
  }
}
