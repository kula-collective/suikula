import { SuiGraphQLClient } from "@mysten/sui/graphql";
import { graphql } from "@mysten/sui/graphql/schemas/2024.4";
import { useEffect, useState } from "react";
import { Kula } from "../types/kula";
import { useSuiClient } from "./useSuiClient";

export const useGetKulas = () => {
  // const { currentAccount } = useWalletKit();
  const suiClient = useSuiClient();

  const [kulaList, setKulaList] = useState<Kula[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(
    () => {
      const gqlClient = new SuiGraphQLClient({
        url: "https://sui-testnet.mystenlabs.com/graphql",
      });

      const kulasQuery = graphql(`
        query { 
          objects(first: 10, filter: { 
            type: "${process.env.NEXT_PUBLIC_TESTNET_KULA_PACKAGE_ID}::community::Community"
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

      async function getKulas() {
        const result = await gqlClient.query({
          query: kulasQuery,
        });
        console.log("gql result", result);

        const kulas =
          result.data?.objects.nodes.map(
            (node) =>
              ({
                id: (node.asMoveObject?.contents?.json as any)["id"] as string,
                name: (node.asMoveObject?.contents?.json as any)[
                  "community_name"
                ] as string,
              } as Kula)
          ) || [];
        return kulas;
      }

      getKulas().then(setKulaList);

      // const reFetchData = async () => {
      //   setIsLoading(true);

      //   console.log(`fetching obj_id=${dashboardId}`);
      //   console.log("calling Get Kulas");
      //   suiClient
      //     .getDynamicFields({
      //       parentId: dashboardId,
      //       cursor: null,
      //       limit: 100,
      //     })
      //     .then((res) => {
      //       console.log(`res: ${JSON.stringify(res.data)}`);
      //       setKulaList(res.data.map((item) => item.name.value as string));
      //       setIsLoading(false);
      //       setIsError(false);
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //       setKulaList([]);
      //       setIsLoading(false);
      //       setIsError(true);
      //     });
      // };

      // if (!!currentAccount?.address) {
      // reFetchData();
      //   } else {
      //     setKulaList([]);
      //     setIsLoading(false);
      //     setIsError(false);
      //   }
    },
    [
      /*currentAccount*/
    ]
  );

  return {
    kulaList,
    isLoading,
    isError,
    // reFetchData,
    // currentAccount,
  };
};
