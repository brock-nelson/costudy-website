import { NextResponse } from "next/server";

// Middleware is disabled to avoid Edge runtime issues with postgres.js
// Auth protection is handled directly in admin pages via server components
export function middleware() {
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
