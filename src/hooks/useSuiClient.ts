// import {
//   ExecuteTransactionRequestType,
//   SuiClient,
//   SuiTransactionBlockResponseOptions,
// } from "@mysten/sui/client";

// interface ExecuteSignedTransactionBlockProps {
//   signedTx: {
//     signature: string | string[];
//     transactionBlockBytes: Uint8Array | string;
//   };
//   requestType: ExecuteTransactionRequestType;
//   options?: SuiTransactionBlockResponseOptions;
// }

// export const useSui = () => {
//   const FULL_NODE = process.env.SUI_NETWORK!;

//   const suiClient = new SuiClient({ url: FULL_NODE });

//   const executeSignedTransactionBlock = async ({
//     signedTx,
//     requestType,
//     options,
//   }: ExecuteSignedTransactionBlockProps) => {
//     return suiClient.executeTransactionBlock({
//       transactionBlock: signedTx.transactionBlockBytes,
//       signature: signedTx.signature,
//       requestType,
//       ...(options && { options }),
//     });
//   };

//   return { executeSignedTransactionBlock, suiClient };
// };

import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";

export const useSuiClient = () => {
  // use getFullnodeUrl to define Devnet RPC location
  const rpcUrl = getFullnodeUrl("testnet");

  // create a client connected to testnet
  const client = new SuiClient({ url: rpcUrl });

  return client;
};
