// import { useSuiClient } from "@mysten/dapp-kit";
import { useEnokiFlow } from "@mysten/enoki/react";
import { Transaction } from "@mysten/sui/transactions";
import { toast } from "react-hot-toast";
import { useSuiClient } from "./useSuiClient";

export const useSignAndExecuteTransaction = () => {
  const enokiFlow = useEnokiFlow();
  const suiClient = useSuiClient();

  const handleSignAndExecuteTransaction = async (
    tx: Transaction,
    operation: String,
    setIsLoading: any
  ) => {
    return enokiFlow
      .getKeypair({ network: "testnet" })
      .then((keypair) => {
        return suiClient
          .signAndExecuteTransaction({
            signer: keypair,
            transaction: tx,
            //   requestType: "WaitForLocalExecution",
            //   options: {
            //     showEffects: true,
            //     showEvents: true,
            //   },
          })
          .then((resp) => {
            setIsLoading(false);
            console.log("resp", resp);
            if (resp.errors) {
              console.log("errors", resp.errors);
            }
            if (!resp.errors) {
              console.log(`${operation} operation successful`);
              toast.success(`${operation} operation successful`);
              return;
            } else {
              console.log(`${operation} operation failed`);
              console.error(resp.errors);
              toast.error(`${operation} operation failed.`);
              return;
            }
          })
          .catch((err) => {
            setIsLoading(false);
            console.log(`${operation} operation failed`);
            console.log(`${operation} error : `, err);
            toast.error(`Something went wrong, ${operation} operation failed.`);
          });
      })
      .catch((err: any) => {
        setIsLoading(false);
        console.log(`signing goes wrong ${operation} error : `, err);
        toast.error(`signing goes wrong, ${operation} operation failed.`);
      }); // <-- added missing semicolon here
  };
  return { handleSignAndExecuteTransaction };
};
