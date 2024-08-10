import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const SECRET_KEY = "your-secret-key"; // Use a secure and private key

export async function POST(req: NextRequest, res: NextResponse) {
  const requestBody = await req.json();
  console.log({ requestBody });
  // Authenticate user
  // You should replace this with real authentication logic
  // if (
  //   requestBody.username === "saman.teymoori@hotmail.com" &&
  //   requestBody.password === "Test123!"
  // ) {
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

  // // Set cookie with token

  // return NextResponse.json({ message: "Login successful" }, 200);
  // } else {
  //   return NextResponse.json(
  //     { error: "Internal Server Error2 " },
  //     { status: 500 }
  //   );
  // }
}
