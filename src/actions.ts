"use server";

import { User } from "@/types/user";
import { SuiGraphQLClient } from "@mysten/sui/graphql";
import { graphql } from "@mysten/sui/graphql/schemas/2024.4";
import { Kula } from "./types/kula";

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

// Server Action
export async function getKulas() {
  console.log(
    "getKulas in package",
    process.env.NEXT_PUBLIC_TESTNET_KULA_PACKAGE_ID
  );
  const gqlClient = new SuiGraphQLClient({
    url: "https://sui-testnet.mystenlabs.com/graphql",
  });

  const kulasQuery = graphql(`
        query { 
          objects(first: 10, filter: { 
            type: "${process.env.NEXT_PUBLIC_TESTNET_KULA_PACKAGE_ID}::community::Kula"
          }) {
            nodes {
              asMoveObject {
                contents {
                  json
                }
              }
            }
          }
        }
      `);

  const result = await gqlClient.query({
    query: kulasQuery,
  });
  console.log("query Kula result", JSON.stringify(result));

  const kulas =
    result.data?.objects.nodes.map(
      (node) =>
        ({
          id: (node.asMoveObject?.contents?.json as any)["id"] as string,
          name: (node.asMoveObject?.contents?.json as any)["name"] as string,
        } as Kula)
    ) || [];
  return kulas;
}
