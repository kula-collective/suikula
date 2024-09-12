"use client";

import { useRouter } from "next/navigation";

import { WalletDialog } from "@/components/wallet-dialog";

export default function Page() {
  const router = useRouter();

  return <WalletDialog open={true} onClose={router.back} />;
}
