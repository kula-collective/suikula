"use client";

import { verifyGoogle } from "@/lib/actions";
import { useAppstateStore } from "@/providers/appstate-store-provider";
import { useAuthCallback } from "@mysten/enoki/react";
import { useEffect, useState } from "react";

export default function Auth() {
  const { handled } = useAuthCallback();
  const [token, setToken] = useState<string>();
  const { login } = useAppstateStore((state) => state);

  useEffect(() => {
    // Store the token in state because it sometimes disappears
    const hash = window.location.hash;
    const idToken = hash.split("&")[0].substring("#id_token=".length);
    if (idToken) {
      setToken(idToken);
    }
    if (handled && token) {
      verifyGoogle(token)
        .then((user) => {
          console.log("user", user);
          login(user);

          window.location.href = "/home?id=" + user.id;
        })
        .catch((err) => {
          // TODO Display error
          console.error("Failed to verify token", err);
        });
    }
  }, [handled, token, login]);

  return (
    <>
      <h1>Loading ...</h1>
    </>
  );
}
