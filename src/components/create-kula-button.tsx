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
import { FormEvent, useState } from "react";

export default function CreateKulaButton({
  children,
}: {
  children: React.ReactNode;
}) {
  const { createKula } = useCreateKula();

  const showDialog = () => {
    const modal = document.querySelector("dialog");
    modal?.showModal();
  };

  const hideDialog = () => {
    const modal = document.querySelector("dialog");
    modal?.close();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    const kulaName = formJson["name"].toString();
    await createKula(kulaName, (isLoading: boolean) => {});
  };

  let [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <a onClick={() => setIsOpen(true)}>{children}</a>
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

      {/* <button
        type="button"
        onClick={showDialog}
        className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Create Kula
      </button>
      <dialog className={styles.dialog}>
        <form onSubmit={handleSubmit}>
          <div>
            <button
              className={styles["modal-close"]}
              id="close"
              type="button"
              onClick={hideDialog}
            >
              Close
            </button>
            <p>
              <label htmlFor="name">Kula name</label>
              <input type="text" name="name" />
            </p>
            <footer className={styles["modal-footer"]}>
              <button id="ok" type="submit">
                Create
              </button>
            </footer>
          </div>
        </form>
      </dialog> */}
    </>
  );
}
