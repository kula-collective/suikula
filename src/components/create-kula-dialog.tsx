"use client";

import { Button } from "@/components/catalyst/button";
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from "@/components/catalyst/dialog";
import { Field, Label } from "@/components/catalyst/fieldset";
import { Input } from "@/components/catalyst/input";
import { useEnoki } from "@/hooks/use-enoki";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function CreateKulaDialog() {
  const router = useRouter();
  const enoki = useEnoki();

  const onClose = () => router.back();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    const kulaName = formJson["name"].toString();

    await enoki.createKula(kulaName);
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Create Kula</DialogTitle>
        <DialogDescription>
          This creates a new kula using the SUI in your account.
        </DialogDescription>
        <DialogBody>
          <Field>
            <Label>Name</Label>
            <Input name="name" />
          </Field>
        </DialogBody>
        <DialogActions>
          <Button plain onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Create</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
