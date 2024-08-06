"use client";

import { verifyGoogle } from "@/app/lib/actions";
import { useAuthCallback } from "@mysten/enoki/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Auth() {
  const { handled } = useAuthCallback();
  const pathname = usePathname();

  useEffect(() => {
    if (handled) {
      verifyGoogle(pathname).then((userId) => {
        console.log("Got userid" + userId);
        // Get access token, perform security checks,
        // manage user session, handle errors, and so on.
        window.location.href = "/home";
      });
    }
  }, [handled, pathname]);

  return (
    <>
      <h1>Loading ...</h1>
    </>
  );
}
