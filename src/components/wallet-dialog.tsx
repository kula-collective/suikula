"use client";

import { useRouter } from "next/navigation";
import { Button } from "./catalyst/button";
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogTitle,
} from "./catalyst/dialog";
import Wallet from "./wallet";

export function WalletDialog() {
  const router = useRouter();

  const onClose = () => router.back();

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Sui Wallet</DialogTitle>
      <DialogBody>
        <Wallet />
      </DialogBody>
      <DialogActions>
        <Button onClick={onClose}>OK</Button>
      </DialogActions>
    </Dialog>
  );
}
