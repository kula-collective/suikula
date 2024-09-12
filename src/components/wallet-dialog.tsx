"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
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
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
    router.back();
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
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
