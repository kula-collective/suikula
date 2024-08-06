"use client";

import { FormEvent } from "react";
import { useCreateKula } from "../hooks/useCreateKula";
import styles from "./create-kula-button.module.css";

export default function CreateKulaButton() {
  const { createKula } = useCreateKula();

  const showDialog = () => {
    const modal = document.querySelector("dialog");
    modal?.showModal();
  };

  const hideDialog = () => {
    const modal = document.querySelector("dialog");
    modal?.close();
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    const kulaName = formJson["name"].toString();
    createKula(kulaName, (isLoading: boolean) => {});
  };

  return (
    <>
      <button onClick={showDialog}>Create Kula</button>
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
      </dialog>
    </>
  );
}
