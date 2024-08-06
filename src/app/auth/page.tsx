"use client";

import { verifyGoogle } from "@/app/lib/actions";
import { useAuthCallback } from "@mysten/enoki/react";
import { useEffect } from "react";

export default function Auth() {
  const { handled } = useAuthCallback();

  useEffect(() => {
    if (handled) {
      const hash = window.location.hash;
      console.log("hash", hash);
      verifyGoogle(hash).then((userId) => {
        console.log("Got userid" + userId);
        // Get access token, perform security checks,
        // manage user session, handle errors, and so on.
        window.location.href = "/home";
      });
    }
  }, [handled]);

  return (
    <>
      <h1>Loading ...</h1>
    </>
  );
}
