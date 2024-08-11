import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest, res: NextResponse) {
  cookies().delete("jwt_token");
  return NextResponse.json(
    { message: "successfully logged out" },
    { status: 200 }
  );
}
