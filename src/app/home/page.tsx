"use client";

import { Avatar } from "@/components/avatar";
import CreateKulaDialog from "@/components/create-kula-dialog";
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from "@/components/dropdown";
import { Kulas } from "@/components/kulas";
import {
  Navbar,
  NavbarDivider,
  NavbarItem,
  NavbarLabel,
  NavbarSection,
  NavbarSpacer,
} from "@/components/navbar";
import {
  Sidebar,
  SidebarBody,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
} from "@/components/sidebar";
import { StackedLayout } from "@/components/stacked-layout";
import { WalletDialog } from "@/components/wallet-dialog";
import {
  ArrowRightStartOnRectangleIcon,
  ChevronDownIcon,
  Cog8ToothIcon,
  PlusIcon,
  UserIcon,
  WalletIcon,
} from "@heroicons/react/16/solid";
import { InboxIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useEnokiFlow } from "@mysten/enoki/react";
import { useState } from "react";

const navItems = [
  { label: "Home", url: "/" },
  { label: "Events", url: "/events" },
  { label: "Settings", url: "/settings" },
];

export default function Home() {
  const enokiFlow = useEnokiFlow();
  const [isWalletDialogOpen, setWalletDialogOpen] = useState(false);
  const [isCreateKulaDialogOpen, setCreateKulaDialogOpen] = useState(false);

  function TeamDropdownMenu() {
    return (
      <DropdownMenu className="min-w-80 lg:min-w-64" anchor="bottom start">
        <DropdownItem href="/teams/1/settings">
          <Cog8ToothIcon />
          <DropdownLabel>Settings</DropdownLabel>
        </DropdownItem>
        <DropdownDivider />
        <Kulas />
        {/* <DropdownItem href="/teams/1">
          <Avatar slot="icon" src="/tailwind-logo.svg" />
          <DropdownLabel>Tailwind Labs</DropdownLabel>
        </DropdownItem>
        <DropdownItem href="/teams/2">
          <Avatar
            slot="icon"
            initials="WC"
            className="bg-purple-500 text-white"
          />
          <DropdownLabel>Workcation</DropdownLabel>
        </DropdownItem> */}
        <DropdownDivider />
        <DropdownItem onClick={() => setCreateKulaDialogOpen(true)}>
          <PlusIcon />
          <DropdownLabel>New kula&hellip;</DropdownLabel>
        </DropdownItem>
      </DropdownMenu>
    );
  }

  const handleClick = () => {
    enokiFlow.logout().then(() => {
      window.location.href = "/";
    });
  };

  return (
    <>
      <StackedLayout
        navbar={
          <Navbar>
            <Dropdown>
              <DropdownButton as={NavbarItem} className="max-lg:hidden">
                <Avatar src="/catalyst.svg" />
                <NavbarLabel>Kula Collective</NavbarLabel>
                <ChevronDownIcon />
              </DropdownButton>
              <TeamDropdownMenu />
            </Dropdown>
            <NavbarDivider className="max-lg:hidden" />
            <NavbarSection className="max-lg:hidden">
              {navItems.map(({ label, url }) => (
                <NavbarItem key={label} href={url}>
                  {label}
                </NavbarItem>
              ))}
            </NavbarSection>
            <NavbarSpacer />
            <NavbarSection>
              <NavbarItem href="/search" aria-label="Search">
                <MagnifyingGlassIcon />
              </NavbarItem>
              <NavbarItem href="/inbox" aria-label="Inbox">
                <InboxIcon />
              </NavbarItem>
              <Dropdown>
                <DropdownButton as={NavbarItem}>
                  <Avatar src="/shawn.jpg" square />
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
                  <DropdownItem onClick={() => setWalletDialogOpen(true)}>
                    <WalletIcon />
                    <DropdownLabel>Wallet</DropdownLabel>
                  </DropdownItem>
                  <DropdownDivider />
                  <DropdownItem onClick={handleClick}>
                    <ArrowRightStartOnRectangleIcon />
                    <DropdownLabel>Sign out</DropdownLabel>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarSection>
          </Navbar>
        }
        sidebar={
          <Sidebar>
            <SidebarHeader>
              <Dropdown>
                <DropdownButton as={SidebarItem} className="lg:mb-2.5">
                  <Avatar src="/catalyst.svg" />
                  <SidebarLabel>Kula Collective</SidebarLabel>
                  <ChevronDownIcon />
                </DropdownButton>
                <TeamDropdownMenu />
              </Dropdown>
            </SidebarHeader>
            <SidebarBody>
              <SidebarSection>
                {navItems.map(({ label, url }) => (
                  <SidebarItem key={label} href={url}>
                    {label}
                  </SidebarItem>
                ))}
              </SidebarSection>
            </SidebarBody>
          </Sidebar>
        }
      ></StackedLayout>
      <WalletDialog
        isOpen={isWalletDialogOpen}
        setIsOpen={setWalletDialogOpen}
      />
      <CreateKulaDialog
        isOpen={isCreateKulaDialogOpen}
        setIsOpen={setCreateKulaDialogOpen}
      />
    </>
  );
}
