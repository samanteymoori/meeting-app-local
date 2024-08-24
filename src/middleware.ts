import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import {
  containsPath,
  createNavigationLink,
  navigation_items,
} from "./navigation/index";

export const config = {
  matcher: [
    "/((?!api|images|service-worker|_next/static|_next/image|assets|favicon.ico|sw.js).*)",
  ],
};

export async function middleware(req: NextRequest) {
  let response = NextResponse.next();
  const url = req.nextUrl;

  const token = req.cookies.get("jwt_token");
  const login_path = createNavigationLink(navigation_items.auth.login, url);
  const home_path = createNavigationLink(navigation_items.private.home, url);

  console.log({ middlewareurl: url });

  if (token) {
    try {
      if (req.nextUrl.pathname === "/") {
        return NextResponse.redirect(home_path);
      }
      return NextResponse.next();
    } catch (e) {
      return NextResponse.redirect(login_path);
    }
  } else {
    if (!containsPath(url, navigation_items.auth.login_area))
      return NextResponse.redirect(login_path);
  }

  return response;
}
