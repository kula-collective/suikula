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
import { Link } from "@/components/catalyst/link";
import {
  Navbar,
  NavbarItem,
  NavbarSection,
  NavbarSpacer,
} from "@/components/catalyst/navbar";
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
  SidebarSpacer,
} from "@/components/catalyst/sidebar";
import { SidebarLayout } from "@/components/catalyst/sidebar-layout";
// import { WalletDialog } from "@/components/wallet-dialog";
import { useAppstateStore } from "@/providers/appstate-store-provider";
import {
  ArrowRightStartOnRectangleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  Cog8ToothIcon,
  LightBulbIcon,
  PlusIcon,
  ShieldCheckIcon,
  UserCircleIcon,
} from "@heroicons/react/16/solid";
import {
  Cog6ToothIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  SparklesIcon,
} from "@heroicons/react/20/solid";
import { usePathname } from "next/navigation";
import { useState } from "react";

function AccountDropdownMenu({
  anchor,
}: {
  anchor: "top start" | "bottom end";
}) {
  return (
    <DropdownMenu className="min-w-64" anchor={anchor}>
      <DropdownItem href="#">
        <UserCircleIcon />
        <DropdownLabel>My account</DropdownLabel>
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem href="#">
        <ShieldCheckIcon />
        <DropdownLabel>Privacy policy</DropdownLabel>
      </DropdownItem>
      <DropdownItem href="#">
        <LightBulbIcon />
        <DropdownLabel>Share feedback</DropdownLabel>
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem href="#">
        <ArrowRightStartOnRectangleIcon />
        <DropdownLabel>Sign out</DropdownLabel>
      </DropdownItem>
    </DropdownMenu>
  );
}

export function ApplicationLayout({
  children,
  kulas,
  offers,
}: {
  kulas: React.ReactNode;
  offers: React.ReactNode;
  children: React.ReactNode;
}) {
  const { authUser, logout } = useAppstateStore((state) => state);
  const [isWalletDialogOpen, setWalletDialogOpen] = useState(false);
  const [isCreateKulaDialogOpen, setCreateKulaDialogOpen] = useState(false);

  let pathname = usePathname();

  return (
    <SidebarLayout
      navbar={
        <Navbar>
          <NavbarSpacer />
          <NavbarSection>
            <Dropdown>
              {authUser ? (
                <>
                  <DropdownButton as={NavbarItem}>
                    <Avatar
                      src={authUser?.pic ?? "https://placecats.com/g/100/100"}
                      square
                    />
                  </DropdownButton>
                  <AccountDropdownMenu anchor="bottom end" />
                </>
              ) : (
                <Link href="/login">Login</Link>
              )}
            </Dropdown>
          </NavbarSection>
        </Navbar>
      }
      sidebar={
        <Sidebar>
          <SidebarHeader>
            <Dropdown>
              <DropdownButton as={SidebarItem}>
                <Avatar src="/catalyst.svg" />
                <SidebarLabel>Kula Collective</SidebarLabel>
                <ChevronDownIcon />
              </DropdownButton>
              <DropdownMenu
                className="min-w-80 lg:min-w-64"
                anchor="bottom start"
              >
                <DropdownItem href="/settings">
                  <Cog8ToothIcon />
                  <DropdownLabel>Settings</DropdownLabel>
                </DropdownItem>
                <DropdownDivider />
                {kulas}
                {/* <DropdownItem href="#">
                  <Avatar
                    slot="icon"
                    initials="Atx"
                    className="bg-purple-500 text-white"
                  />
                  <DropdownLabel>South Austin</DropdownLabel>
                </DropdownItem> */}
                <DropdownDivider />
                <DropdownItem href="/create-kula">
                  <PlusIcon />
                  <DropdownLabel>New Kula&hellip;</DropdownLabel>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </SidebarHeader>

          <SidebarBody>
            <SidebarSection>
              <SidebarItem href="/" current={pathname === "/"}>
                <HomeIcon />
                <SidebarLabel>Home</SidebarLabel>
              </SidebarItem>
              {/* <SidebarItem
                href="/offers"
                current={pathname.startsWith("/offers")}
              >
                <Square2StackIcon />
                <SidebarLabel>Offers</SidebarLabel>
              </SidebarItem> */}
              <SidebarItem
                href="/settings"
                current={pathname.startsWith("/settings")}
              >
                <Cog6ToothIcon />
                <SidebarLabel>Settings</SidebarLabel>
              </SidebarItem>
            </SidebarSection>

            {/* <SidebarSection className="max-lg:hidden">
              <SidebarHeading>Upcoming Events</SidebarHeading>
              {offers.map((offer) => (
                <SidebarItem key={offer.id} href={offer.url}>
                  {offer.name}
                </SidebarItem>
              ))}
            </SidebarSection> */}

            <SidebarSpacer />

            <SidebarSection>
              <SidebarItem href="#">
                <QuestionMarkCircleIcon />
                <SidebarLabel>Support</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="#">
                <SparklesIcon />
                <SidebarLabel>Changelog</SidebarLabel>
              </SidebarItem>
            </SidebarSection>
          </SidebarBody>

          <SidebarFooter className="max-lg:hidden">
            <Dropdown>
              {authUser ? (
                <DropdownButton as={SidebarItem}>
                  <span className="flex min-w-0 items-center gap-3">
                    <Avatar
                      src={authUser.pic}
                      className="size-10"
                      square
                      alt=""
                    />
                    <span className="min-w-0">
                      <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">
                        {authUser.firstName}
                      </span>
                      <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                        {authUser.email}
                      </span>
                    </span>
                  </span>
                  <ChevronUpIcon />
                </DropdownButton>
              ) : (
                <Link href="/login">Login</Link>
              )}

              <AccountDropdownMenu anchor="top start" />
            </Dropdown>
          </SidebarFooter>
        </Sidebar>
      }
    >
      {/* <WalletDialog
        isOpen={isWalletDialogOpen}
        setIsOpen={setWalletDialogOpen}
      />
      <CreateKulaDialog
        isOpen={isCreateKulaDialogOpen}
        setIsOpen={setCreateKulaDialogOpen}
      /> */}
      <main>{children}</main>
    </SidebarLayout>
  );
}
