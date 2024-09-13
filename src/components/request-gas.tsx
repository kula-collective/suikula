"use client";

import { requestSui } from "@/actions";
import { Button } from "@/components/catalyst/button";
import {
  Dialog,
  DialogActions,
  DialogDescription,
  DialogTitle,
} from "@/components/catalyst/dialog";
import { useEnokiFlow } from "@mysten/enoki/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RequestGas() {
  const router = useRouter();
  const enokiFlow = useEnokiFlow();
  const [address, setAddress] = useState("");
  const onClose = () => router.back();

  useEffect(() => {
    const state = enokiFlow.$zkLoginState;
    if (state.value?.address) {
      setAddress(state.value?.address);
    }
  }, [enokiFlow.$zkLoginState]);

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
          <Button type="submit">Request SUI</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
