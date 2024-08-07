import { Transaction } from "@mysten/sui/transactions";
import { useSignAndExecuteTransaction } from "./useSignAndExecuteTransaction";

export const useCreateKula = () => {
  const { handleSignAndExecuteTransaction } = useSignAndExecuteTransaction();
  const createKula = async (name: string, setIsLoading: any) => {
    const tx = new Transaction();
    tx.moveCall({
      target: `${process.env.NEXT_PUBLIC_TESTNET_KULA_PACKAGE_ID}::community::create_community`,
      arguments: [tx.pure.string(name)],
    });
    setIsLoading(true);
    console.log("createKula, signing transaction block...");
    const res = await handleSignAndExecuteTransaction(
      tx,
      "KulaCreation",
      setIsLoading
    );
    const objId = res?.created?.[0].reference.objectId;
    if (objId) {
      console.log("Created Kula", objId);
    }
    return objId;
  };

  return { createKula };
};
