import { Kula } from "@/types/kula";
import { SuiGraphQLClient } from "@mysten/sui/graphql";
import { graphql } from "@mysten/sui/graphql/schemas/2024.4";

export function getOffers() {}

export async function getKulas() {
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
  console.log("gql result", result);

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
