"use client";

import { Button } from "@/components/catalyst/button";
import {
  Dialog,
  DialogActions,
  DialogDescription,
  DialogTitle,
} from "@/components/catalyst/dialog";
import { useEnokiFlow } from "@mysten/enoki/react";
import { getFaucetHost, requestSuiFromFaucetV0 } from "@mysten/sui/faucet";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";

export default function RequestGas() {
  const router = useRouter();
  const enokiFlow = useEnokiFlow();
  const status = useFormStatus();
  const [address, setAddress] = useState("");
  const [isPending, setPending] = useState(false);
  const onClose = () => router.back();

  useEffect(() => {
    const state = enokiFlow.$zkLoginState;
    if (state.value?.address) {
      setAddress(state.value?.address);
    }
  }, [enokiFlow.$zkLoginState]);

  async function requestSui(formData: FormData) {
    setPending(true);

    try {
      const address = formData.get("address") as string;

      console.log("sending SUI to " + address);

      const resp = await requestSuiFromFaucetV0({
        host: getFaucetHost("testnet"),
        recipient: address,
      });
      console.log("resp", resp);
      return resp;
    } finally {
      setPending(false);
    }
  }

  return (
    <Dialog open={true} onClose={onClose}>
      <form action={requestSui}>
        <input type="hidden" name="address" value={address} />
        <DialogTitle>Request SUI</DialogTitle>
        <DialogDescription>
          SUI is needed for all transactions.
        </DialogDescription>
        <DialogActions>
          <Button plain onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={isPending}>
            Request SUI
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
