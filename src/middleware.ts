import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const config = {
  matcher: [
    "/((?!api|service-worker|_next/static|_next/image|assets|favicon.ico|sw.js).*)",
  ],
};

export async function middleware(req: NextRequest) {
  let response = NextResponse.next();
  const url = req.nextUrl;
  console.log({ url });
  const token = req.cookies.get("token");

  if (token) {
    try {
      console.log("test");
      jwt.verify(token, "your-secret-key"); // Replace with your secret key
      return NextResponse.next();
    } catch (e) {
      console.log("test2");
      return NextResponse.redirect(url.href + "/login/email/1");
    }
  } else {
    if (!url.pathname.includes("en/login/email"))
      return NextResponse.redirect(url.href + "en/login/email");
  }

  return response;
}
