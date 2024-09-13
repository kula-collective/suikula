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
import { revalidateTag } from "next/cache";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function CreateKulaDialog() {
  const router = useRouter();
  const enoki = useEnoki();
  const [isPending, setPending] = useState(false);

  const onClose = () => router.back();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);

    try {
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      const formJson = Object.fromEntries(formData.entries());
      const kulaName = formJson["name"].toString();

      const kulaId = await enoki.createKula(kulaName);

      if (kulaId) {
        try {
          revalidateTag("kulas");
        } catch (e) {
          // ignore
        }
        router.push(`/kulas/${kulaId}`);
      }
    } finally {
      setPending(false);
    }
  };

  return (
    <>
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
            <Button loading={isPending} color="sky" type="submit">
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
