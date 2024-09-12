"use client";

import { verifyGoogle } from "@/lib/actions";
import { useAppstateStore } from "@/providers/appstate-store-provider";
import { useAuthCallback } from "@mysten/enoki/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  const { saveUser } = useAppstateStore((state) => state);
  const { handled } = useAuthCallback();

  useEffect(() => {
    if (handled) {
      // Must run on the client because the server doesn't get the hash
      // And must be in useEffect because otherwise window isn't defined
      const hash = window.location.hash;
      const idToken = hash.split("&")[0].substring("#id_token=".length);

      verifyGoogle(idToken).then((user) => {
        saveUser(user);
        router.push(`/`);
      });
    }
  }, [handled]);

  return <></>;
}
