"use client";

import { verifyGoogle } from "@/lib/actions";
import { useAppstateStore } from "@/providers/appstate-store-provider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const { saveUser } = useAppstateStore((state) => state);
  const [idToken, setIdToken] = useState("");

  useEffect(() => {
    // Must run on the client because the server doesn't get the hash
    const hash = window.location.hash;
    const idToken = hash.split("&")[0].substring("#id_token=".length);
    setIdToken(idToken);
  }, []);

  if (!idToken) {
    return <>Missing token</>;
  }

  return verifyGoogle(idToken).then((user) => {
    saveUser(user);
    router.push(`/`);
  });
}
