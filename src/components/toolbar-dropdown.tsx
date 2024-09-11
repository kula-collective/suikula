"use client";

import { Avatar } from "@/components/avatar";
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from "@/components/dropdown";
import { NavbarItem } from "@/components/navbar";
import { useAppstateStore } from "@/providers/appstate-store-provider";
import {
  ArrowRightStartOnRectangleIcon,
  Cog8ToothIcon,
  UserIcon,
} from "@heroicons/react/16/solid";
import { useEnokiFlow } from "@mysten/enoki/react";
import { redirect } from "next/navigation";

export function ToolbarDropdown() {
  const { authUser, logout } = useAppstateStore((state) => state);
  const enokiFlow = useEnokiFlow();

  const handleSignOut = () => {
    enokiFlow.logout().then(() => {
      logout();
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
        {/* <DropdownItem onClick={() => setWalletDialogOpen(true)}>
          <WalletIcon />
          <DropdownLabel>Wallet</DropdownLabel>
        </DropdownItem> */}
        <DropdownDivider />
        <DropdownItem onClick={handleSignOut}>
          <ArrowRightStartOnRectangleIcon />
          <DropdownLabel>Sign out</DropdownLabel>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
