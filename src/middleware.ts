import { NextRequest, NextResponse } from "next/server";
import getOrCreateDb from "./models/server/dbSetup";
import getOrCreateStorage from "./models/server/storageSetup";

export async function middleware(req: NextRequest) {
  await Promise.all([getOrCreateDb(), getOrCreateStorage()]);
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
