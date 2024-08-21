import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request: NextRequest) {
  try {
    const item = {};
    return NextResponse.json({ item }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Unauthorized access." },
      { status: 403 }
    );
  }
}
