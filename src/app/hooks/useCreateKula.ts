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
    return handleSignAndExecuteTransaction(tx, "KulaCreation", setIsLoading);
  };

  return { createKula };
};
