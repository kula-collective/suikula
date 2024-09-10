"use client";

import { Button } from "@/components/button";
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from "@/components/dialog";
import { Field, Label } from "@/components/fieldset";
import { Input } from "@/components/input";
import { useCreateKula } from "@/hooks/useCreateKula";
import { FormEvent } from "react";

export interface DialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function CreateKulaDialog({ isOpen, setIsOpen }: DialogProps) {
  const { createKula } = useCreateKula();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    const kulaName = formJson["name"].toString();
    await createKula(kulaName, (isLoading: boolean) => {});
  };

  return (
    <>
      <Dialog open={isOpen} onClose={setIsOpen}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Create Kula</DialogTitle>
          <DialogDescription>
            This creates a new Kula using the coin in your account.
          </DialogDescription>
          <DialogBody>
            <Field>
              <Label>Name</Label>
              <Input name="name" />
            </Field>
          </DialogBody>
          <DialogActions>
            <Button plain onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={() => setIsOpen(false)}>
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
