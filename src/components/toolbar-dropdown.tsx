"use client";

import { Avatar } from "@/components/catalyst/avatar";
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from "@/components/catalyst/dropdown";
import { NavbarItem } from "@/components/catalyst/navbar";
import { useAppstateStore } from "@/providers/appstate-store-provider";
import {
  ArrowRightStartOnRectangleIcon,
  Cog8ToothIcon,
  UserIcon,
  WalletIcon,
} from "@heroicons/react/16/solid";
import { useEnokiFlow } from "@mysten/enoki/react";
import { redirect } from "next/navigation";

export function ToolbarDropdown() {
  const { authUser, resetUser } = useAppstateStore((state) => state);
  const enokiFlow = useEnokiFlow();

  const handleSignOut = () => {
    enokiFlow.logout().then(() => {
      resetUser();
      redirect(`/`);
    });
  };

  return (
    <Dropdown>
      <DropdownButton as={NavbarItem}>
        <Avatar
          src={authUser?.pic ?? "https://placecats.com/g/100/100"}
          square
        />
      </DropdownButton>
      <DropdownMenu className="min-w-64" anchor="bottom end">
        <DropdownItem href="/my-profile">
          <UserIcon />
          <DropdownLabel>My profile</DropdownLabel>
        </DropdownItem>
        <DropdownItem href="/settings">
          <Cog8ToothIcon />
          <DropdownLabel>Settings</DropdownLabel>
        </DropdownItem>
        <DropdownDivider />
        <DropdownItem href="/wallet">
          <WalletIcon />
          <DropdownLabel>Wallet</DropdownLabel>
        </DropdownItem>
        <DropdownDivider />
        <DropdownItem onClick={handleSignOut}>
          <ArrowRightStartOnRectangleIcon />
          <DropdownLabel>Sign out</DropdownLabel>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
