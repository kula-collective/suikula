"use server";

import { User } from "@/types/user";

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
    throw error;
  }
}
