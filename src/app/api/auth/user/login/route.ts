import jwt from "jsonwebtoken";
import cookie from "cookie";
import { NextRequest, NextResponse } from "next/server";

const SECRET_KEY = "your-secret-key"; // Use a secure and private key

export default async function POST(req: NextRequest, res: NextResponse) {
  const { username, password } = req.body;

  // Authenticate user
  // You should replace this with real authentication logic
  if (username === "saman.teymoori@hotmail.com" && password === "Test123!") {
    // Create JWT token
    const token = jwt.sign(
      { username },
      SECRET_KEY,33
      { expiresIn: "1h" } // Token expiration
    );

    // Set cookie with token
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 3600, // 1 hour
        path: "/",
      })
    );

    return res.status(200).json({ message: "Login successful" });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
}
