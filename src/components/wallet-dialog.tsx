import { Button } from "./catalyst/button";
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogTitle,
} from "./catalyst/dialog";
import Wallet from "./wallet";

export interface DialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function WalletDialog({ isOpen, setIsOpen }: DialogProps) {
  return (
    <Dialog open={isOpen} onClose={setIsOpen}>
      <DialogTitle>Sui Wallet</DialogTitle>
      <DialogBody>
        <Wallet />
      </DialogBody>
      <DialogActions>
        <Button onClick={() => setIsOpen(false)}>OK</Button>
      </DialogActions>
    </Dialog>
  );
}
