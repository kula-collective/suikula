import { useEffect, useState } from "react";
import { useSui } from "./useSui";

export const useGetKulas = (dashboardId: string) => {
  // const { currentAccount } = useWalletKit();
  const { suiClient } = useSui();

  const [kulaList, setKulaList] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(
    () => {
      const reFetchData = async () => {
        setIsLoading(true);

        console.log(`fetching obj_id=${dashboardId}`);
        console.log("calling Get Kulas");
        suiClient
          .getDynamicFields({
            parentId: dashboardId,
            cursor: null,
            limit: 100,
          })
          .then((res) => {
            console.log(`res: ${JSON.stringify(res.data)}`);
            setKulaList(res.data.map((item) => item.name.value as string));
            setIsLoading(false);
            setIsError(false);
          })
          .catch((err) => {
            console.log(err);
            setKulaList([]);
            setIsLoading(false);
            setIsError(true);
          });
      };

      // if (!!currentAccount?.address) {
      reFetchData();
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
