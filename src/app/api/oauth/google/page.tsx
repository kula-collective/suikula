"use client";

import { verifyGoogle } from "@/actions";
import { useAppstateStore } from "@/providers/appstate-store-provider";
import { useAuthCallback } from "@mysten/enoki/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const { saveUser } = useAppstateStore((state) => state);
  const { handled } = useAuthCallback();

  const [idToken, setIdToken] = useState("");

  useEffect(() => {
    // Must run on the client because the server doesn't get the hash
    // And must be in useEffect because otherwise window isn't defined

    // Store hash here because the page refreshes and it disappears
    const hash = window.location.hash;
    if (hash) {
      const idToken = hash.split("&")[0].substring("#id_token=".length);
      setIdToken(idToken);
    }

    if (handled) {
      verifyGoogle(idToken).then((user) => {
        saveUser(user);
        router.push(`/`);
      });
    }
  }, [handled]);

  return <></>;
}
