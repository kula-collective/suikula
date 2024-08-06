import { useEffect, useState } from "react";
import { useSuiClient } from "./useSuiClient";

export const useGetKulas = (dashboardId: string) => {
  // const { currentAccount } = useWalletKit();
  const suiClient = useSuiClient();

  const [kulaList, setKulaList] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(
    () => {
      console.log("getOwnedObjects");
      suiClient
        .getOwnedObjects({
          owner:
            "0x223e0c9d6e816715218a10b380fb89dfa2e3e385f47803aaeef50dbdd1757aa2",
        })
        .then((resp) => {
          console.log("resp", resp);
          if (resp.data[0].error) {
            setIsError(true);
          }
        });
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
