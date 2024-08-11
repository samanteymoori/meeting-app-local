import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const SECRET_KEY =
  "J$wX9ZPq3u8sT^C@Dg6M2k!rF5v*QbPj7yG^T4mNtL&bS@q3#Pp9%wZzM5fUeRn";

export async function POST(req: NextRequest, res: NextResponse) {
  const requestBody = await req.json();
  const { username, password } = requestBody;
  console.log({ requestBody });
  // Authenticate user
  if (1 === 1) {
    // Create JWT token
    const token = jwt.sign(
      {
        username: requestBody.username,
      },
      SECRET_KEY
    );
    cookies().set({
      name: "jwt_token",
      value: JSON.stringify(token),
      httpOnly: true,
      path: "/",
      secure: true,
    });

    return NextResponse.json({ token }, { status: 200 });
  } else {
    return NextResponse.json(
      { error: "Invalid username or password" },
      { status: 403 }
    );
  }
}
