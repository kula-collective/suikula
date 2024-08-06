// import { useSuiClient } from "@mysten/dapp-kit";
import { useEnokiFlow } from "@mysten/enoki/react";
import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";
import { toast } from "react-hot-toast";

export const useSignAndExecuteTransaction = () => {
  // use getFullnodeUrl to define Devnet RPC location
  const rpcUrl = getFullnodeUrl("testnet");

  // create a client connected to testnet
  const client = new SuiClient({ url: rpcUrl });

  const enokiFlow = useEnokiFlow();

  const handleSignAndExecuteTransaction = async (
    tx: Transaction,
    operation: String,
    setIsLoading: any
  ) => {
    return enokiFlow
      .getKeypair()
      .then((keypair) => {
        return client
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
            console.log(resp);
            if (resp.effects?.status.status === "success") {
              console.log(`${operation} operation successful`);
              toast.success(`${operation} operation successful`);
              return;
            } else {
              console.log(`${operation} operation failed`);
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
