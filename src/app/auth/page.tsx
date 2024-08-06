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
      const token = hash.split("&")[0].substring("#id_token=".length);
      console.log("token", token);
      verifyGoogle(token).then((userId) => {
        console.log("Got userid" + userId);
        // Get access token, perform security checks,
        // manage user session, handle errors, and so on.
        window.location.href = "/home?id=" + userId;
      });
    }
  }, [handled]);

  return (
    <>
      <h1>Loading ...</h1>
    </>
  );
}
