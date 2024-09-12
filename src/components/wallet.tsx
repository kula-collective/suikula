"use client";

import { useEnokiFlow } from "@mysten/enoki/react";
import { useEffect, useState } from "react";

export default function Wallet() {
  const enokiFlow = useEnokiFlow();
  const [address, setAddress] = useState<string>();

  useEffect(() => {
    const state = enokiFlow.$zkLoginState;
    setAddress(state.value?.address);
  }, [enokiFlow.$zkLoginState]);

  return <div className="text-xs">{address ?? "No wallet"}</div>;
}
