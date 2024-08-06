"use client";

import { useAuthCallback } from "@mysten/enoki/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Auth() {
  const { handled } = useAuthCallback();
  const pathname = usePathname();

  useEffect(() => {
    async function verify(token: string) {
      const { OAuth2Client } = require("google-auth-library");
      const client = new OAuth2Client();

      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      const payload = ticket.getPayload();
      const userid = payload["sub"];
      // If the request specified a Google Workspace domain:
      // const domain = payload['hd'];

      console.log("payload", payload);
      console.log("userid", userid);
    }

    if (handled) {
      console.log("pathname" + pathname);
      verify(pathname).catch(console.error);
      window.location.href = "/home";
    }
  }, [handled, pathname]);

  return <h1>Loading ...</h1>;
}
