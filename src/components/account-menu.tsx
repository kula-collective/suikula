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
import { useAppstateStore } from "@/providers/appstate-store-provider";
import {
  ArrowRightStartOnRectangleIcon,
  ChevronUpIcon,
  CircleStackIcon,
  UserCircleIcon,
  WalletIcon,
} from "@heroicons/react/16/solid";
import { NavbarItem } from "./catalyst/navbar";
import { SidebarItem } from "./catalyst/sidebar";

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
      {/* <DropdownItem href="#">
        <ShieldCheckIcon />
        <DropdownLabel>Privacy policy</DropdownLabel>
      </DropdownItem>
      <DropdownItem href="#">
        <LightBulbIcon />
        <DropdownLabel>Share feedback</DropdownLabel>
      </DropdownItem>
      <DropdownDivider /> */}
      <DropdownItem href="/gas">
        <CircleStackIcon />
        <DropdownLabel>Gas: 312</DropdownLabel>
      </DropdownItem>

      <DropdownItem href="/wallet">
        <WalletIcon />
        <DropdownLabel>Wallet</DropdownLabel>
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem href="/logout">
        <ArrowRightStartOnRectangleIcon />
        <DropdownLabel>Sign out</DropdownLabel>
      </DropdownItem>
    </DropdownMenu>
  );
}

export function AccountMenu({ sidebar = false }: { sidebar?: boolean }) {
  const { authUser } = useAppstateStore((state) => state);

  return (
    <Dropdown>
      {authUser ? (
        <DropdownButton as={sidebar ? SidebarItem : NavbarItem}>
          <span className="flex min-w-0 items-center gap-3">
            <Avatar src={authUser?.pic} className="size-10" square alt="" />
            {sidebar && (
              <span className="min-w-0">
                <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">
                  {authUser?.firstName}
                </span>
                <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                  {authUser?.email}
                </span>
              </span>
            )}
          </span>
          {sidebar && <ChevronUpIcon />}
          <AccountDropdownMenu anchor="top start" />
        </DropdownButton>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </Dropdown>
  );
}
