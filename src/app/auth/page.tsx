"use client";

import { verifyGoogle } from "@/lib/actions";
import { useRouter } from "next/navigation";

// TODO put this in the /api directory so people don't accidentally read it
// And make it a route
export default function Page() {
  const router = useRouter();

  // Must run on the client because the server doesn't get the hash
  const hash = window.location.hash;
  const idToken = hash.split("&")[0].substring("#id_token=".length);
  if (!idToken) {
    return <>Missing token</>;
  }

  return verifyGoogle(idToken).then(() => router.push(`/`));
}
