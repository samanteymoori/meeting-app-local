import { NextRequest, NextResponse } from "next/server";

import { lngRedirect } from "@/middlewareSteps/lngRedirect";
import { onboardingRedirect } from "@/middlewareSteps/onboardingRedirect";
import { setLngCookie } from "@/middlewareSteps/setLngCookie";
import { verifyTokenAndEmailRedirect } from "@/middlewareSteps/verifyTokenAndEmailRedirect";
import { IntermediateResponse, MiddlewareStep } from "@/types/MiddlewareStep";
import { resolveIntermediateResponse } from "@/utils/resolveIntermediateResponse";

export const config = {
  matcher: [
    "/((?!api|service-worker|_next/static|_next/image|assets|favicon.ico|sw.js).*)",
  ],
};

export async function middleware(req: NextRequest) {}
