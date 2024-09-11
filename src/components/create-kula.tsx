"use client";

import { createKula } from "@/actions";
import { Button } from "@/components/catalyst/button";
import {
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from "@/components/catalyst/dialog";
import { Field, Label } from "@/components/catalyst/fieldset";
import { Input } from "@/components/catalyst/input";
import { FormEvent } from "react";

export default function CreateKula() {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    const kulaName = formJson["name"].toString();
    await createKula(kulaName, (isLoading: boolean) => {});
  };

  return (
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
        {/* <Button plain onClick={() => setIsOpen(false)}>
          Cancel
        </Button> */}
        <Button type="submit">Create</Button>
      </DialogActions>
    </form>
  );
}
