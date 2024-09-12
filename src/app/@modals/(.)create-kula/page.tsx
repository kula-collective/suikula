"use client";

import { useRouter } from "next/navigation";

import { Dialog } from "@/components/catalyst/dialog";
import CreateKula from "@/components/create-kula";

export default function Page() {
  const router = useRouter();

  return (
    <Dialog open={true} onClose={router.back}>
      <CreateKula />
    </Dialog>
  );
}
