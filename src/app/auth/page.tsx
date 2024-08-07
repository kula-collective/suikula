"use client";

import { verifyGoogle } from "@/app/lib/actions";
import { useAuthCallback } from "@mysten/enoki/react";
import { useEffect } from "react";

export default function Auth() {
  const { handled } = useAuthCallback();

  useEffect(() => {
    if (handled) {
      const hash = window.location.hash;
      const token = hash.split("&")[0].substring("#id_token=".length);
      verifyGoogle(token)
        .then((user) => {
          console.log("user", user);
          // TODO store user

          // TODO redirect
          //   window.location.href = "/home?id=" + userId;
        })
        .catch((err) => {
          // TODO Display error
        });
    }
  }, [handled]);

  return (
    <>
      <h1>Loading ...</h1>
    </>
  );
}
