"use server";

import { User } from "@/types/user";
import { getFaucetHost, requestSuiFromFaucetV0 } from "@mysten/sui/faucet";

export async function verifyGoogle(token: string) {
  try {
    const { OAuth2Client } = require("google-auth-library");
    const client = new OAuth2Client();

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!, // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    console.log("ticket", ticket);
    const payload = ticket.getPayload();

    return {
      id: payload["sub"],
      firstName: payload["given_name"],
      lastName: payload["family_name"],
      email: payload["email"],
      pic: payload["picture"],
    } as User;
  } catch (error) {
    console.error("Failed Google token verification", error);
    throw error;
  }
}

export async function requestSui(formData: FormData) {
  const address = formData.get("address") as string;

  console.log("sending SUI to " + address);

  const resp = await requestSuiFromFaucetV0({
    host: getFaucetHost("testnet"),
    recipient: address,
  });
  console.log("resp", resp);
  return resp;
}
