import { NextResponse } from "next/server";

import { sendLeadMail } from "@/app/actions/sendMail";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const result = await sendLeadMail(await request.json());

    return NextResponse.json(result, {
      status: result.ok ? 200 : 400,
    });
  } catch (error) {
    console.error("Lead mail request failed:", error);

    return NextResponse.json(
      { ok: false, error: "Unable to submit your message." },
      { status: 500 },
    );
  }
}
