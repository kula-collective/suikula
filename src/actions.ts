import { Kula } from "@/types/kula";
// import { useEnokiFlow } from "@mysten/enoki/react";
import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { SuiGraphQLClient } from "@mysten/sui/graphql";
import { graphql } from "@mysten/sui/graphql/schemas/2024.4";
import { Transaction } from "@mysten/sui/transactions";

export function getOffers() {}

export async function createKula(name: string, setIsLoading: any) {
  // const tx = new Transaction();
  // tx.moveCall({
  //   target: `${process.env.NEXT_PUBLIC_TESTNET_KULA_PACKAGE_ID}::community::create_kula_community`,
  //   arguments: [tx.pure.string(name)],
  // });
  // setIsLoading(true);
  // console.log("createKula, signing transaction block...");
  // const res = await handleSignAndExecuteTransaction(
  //   tx,
  //   "KulaCreation",
  //   setIsLoading
  // );
  // const objId = res?.created?.[0].reference.objectId;
  // if (objId) {
  //   console.log("Created Kula", objId);
  // }
  // return objId;
}

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

const createSuiClient = () => {
  const rpcUrl = getFullnodeUrl("testnet");

  // create a client connected to testnet
  const client = new SuiClient({ url: rpcUrl });

  return client;
};

const handleSignAndExecuteTransaction = async (
  tx: Transaction,
  operation: String,
  setIsLoading: any
) => {
  // const enokiFlow = useEnokiFlow();
  // return enokiFlow
  //   .getKeypair({ network: "testnet" })
  //   .then((keypair) => {
  //     return createSuiClient()
  //       .signAndExecuteTransaction({
  //         signer: keypair,
  //         transaction: tx,
  //         requestType: "WaitForLocalExecution",
  //         options: {
  //           showEffects: true,
  //           showEvents: true,
  //         },
  //       })
  //       .then((resp) => {
  //         setIsLoading(false);
  //         console.log(resp);
  //         if (resp.effects?.status.status === "success") {
  //           console.log(`${operation} operation successful`);
  //           // toast.success(`${operation} operation successful`);
  //           return resp.effects;
  //         } else {
  //           console.log(`${operation} operation failed`);
  //           // toast.error(`${operation} operation failed.`);
  //           return;
  //         }
  //       })
  //       .catch((err) => {
  //         setIsLoading(false);
  //         console.log(`${operation} operation failed`);
  //         console.log(`${operation} error : `, err);
  //         // toast.error(`Something went wrong, ${operation} operation failed.`);
  //       });
  //   })
  //   .catch((err: any) => {
  //     setIsLoading(false);
  //     console.log(`signing goes wrong ${operation} error : `, err);
  //     // toast.error(`signing goes wrong, ${operation} operation failed.`);
  //   }); // <-- added missing semicolon here
};
