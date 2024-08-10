import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const jwt_token = request.cookies.get("jwt_token");

  return NextResponse.json({ jwt_token });
}
