import { DialogProps } from "@headlessui/react";
import { Button } from "./catalyst/button";
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogTitle,
} from "./catalyst/dialog";
import Wallet from "./wallet";

// export interface DialogProps {
//   isOpen: boolean;
//   setIsOpen: (open: boolean) => void;
// }

export function WalletDialog({ open, onClose }: DialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Sui Wallet</DialogTitle>
      <DialogBody>
        <Wallet />
      </DialogBody>
      <DialogActions>
        <Button onClick={() => onClose(false)}>OK</Button>
      </DialogActions>
    </Dialog>
  );
}
