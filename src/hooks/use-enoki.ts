"use client";

import { useSuiClient } from "@mysten/dapp-kit";
import { useEnokiFlow } from "@mysten/enoki/react";
import { Transaction } from "@mysten/sui/transactions";

// Must be a hook because we're using a hook
export function useEnoki() {
  const client = useSuiClient();
  const enokiFlow = useEnokiFlow();

  async function createKula(name: string) {
    const tx = new Transaction();
    tx.moveCall({
      target: `${process.env.NEXT_PUBLIC_TESTNET_KULA_PACKAGE_ID}::community::create_kula_community`,
      arguments: [tx.pure.string(name)],
    });
    console.log("createKula, signing transaction block...");
    const res = await signTransaction(tx, "KulaCreation");
    const objId = res?.created?.[0].reference.objectId;
    if (objId) {
      console.log("Created Kula", objId);
    }
    return objId;
  }

  async function signTransaction(tx: Transaction, operation: String) {
    // Get the keypair for the current user.
    const keypair = await enokiFlow.getKeypair();
    const resp = await client.signAndExecuteTransaction({
      signer: keypair,
      transaction: tx,
      requestType: "WaitForLocalExecution",
      options: {
        showEffects: true,
        showEvents: true,
      },
    });
    console.log(resp);
    if (resp.effects?.status.status === "success") {
      console.log(`${operation} operation successful`);
      // toast.success(`${operation} operation successful`);
      return resp.effects;
    } else {
      console.log(`${operation} operation failed`);
      // toast.error(`${operation} operation failed.`);
      return;
    }
    // })
    // .catch((err) => {
    //   console.log(`${operation} operation failed`);
    //   console.log(`${operation} error : `, err);
    //   // toast.error(`Something went wrong, ${operation} operation failed.`);
    // });
    // })
    // .catch((err: any) => {
    //   console.log(`signing goes wrong ${operation} error : `, err);
    //   // toast.error(`signing goes wrong, ${operation} operation failed.`);
    // });
  }

  return {
    createKula,
  };
}
