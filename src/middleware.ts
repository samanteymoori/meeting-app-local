import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import {
  containsPath,
  createNavigationLink,
  navigation_items,
} from "./navigation/index";

export const config = {
  matcher: [
    "/((?!api|service-worker|_next/static|_next/image|assets|favicon.ico|sw.js).*)",
  ],
};

export async function middleware(req: NextRequest) {
  let response = NextResponse.next();
  const url = req.nextUrl;

  const token = req.cookies.get("token");
  const login_path = createNavigationLink(navigation_items.auth.login, url);
  console.log({ url });
  if (token) {
    try {
      console.log("test");
      jwt.verify(token, "your-secret-key"); // Replace with your secret key
      return NextResponse.next();
    } catch (e) {
      console.log("test2");
      return NextResponse.redirect(login_path);
    }
  } else {
    if (!containsPath(url, navigation_items.auth.login))
      return NextResponse.redirect(login_path);
  }

  return response;
}
