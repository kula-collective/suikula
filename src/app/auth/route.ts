import { type NextRequest } from "next/server";

export function GET(request: NextRequest) {
  const hash = request.nextUrl.hash;
  console.log("hash", hash);
}
