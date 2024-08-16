import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY =
  "J$wX9ZPq3u8sT^C@Dg6M2k!rF5v*QbPj7yG^T4mNtL&bS@q3#Pp9%wZzM5fUeRn";

export async function GET(request: NextRequest) {
  try {
    const jwt_token = request.cookies.get("jwt_token");
    const tokenToVerify = jwt_token?.value.replaceAll(`\"`, ``) as any;
    const verified = jwt.verify(tokenToVerify, SECRET_KEY);

    return NextResponse.json({ item: verified }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Unauthorized access." },
      { status: 403 }
    );
  }
}
