"use client";

import { useAppstateStore } from "@/providers/appstate-store-provider";
import { PlusIcon } from "@heroicons/react/20/solid";
import {
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
} from "./catalyst/dropdown";

export function CreateKulaItem() {
  const { authUser } = useAppstateStore((state) => state);
  return (
    <>
      {authUser && (
        <>
          <DropdownDivider />
          <DropdownItem href="/create-kula">
            <PlusIcon />
            <DropdownLabel>New Kula&hellip;</DropdownLabel>
          </DropdownItem>
        </>
      )}
    </>
  );
}
