"use client";

import { useRouter } from "next/navigation";

import { Dialog } from "@/components/catalyst/dialog";
import { Login } from "@/components/login";

export default function Page() {
  const router = useRouter();

  return (
    <Dialog open={true} onClose={() => router.back()}>
      <Login />
    </Dialog>
  );
}
