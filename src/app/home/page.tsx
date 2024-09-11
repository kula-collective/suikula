import { Avatar } from "@/components/catalyst/avatar";
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from "@/components/catalyst/dropdown";
import { Kulas } from "@/components/catalyst/kulas";
import {
  Navbar,
  NavbarDivider,
  NavbarItem,
  NavbarLabel,
  NavbarSection,
  NavbarSpacer,
} from "@/components/catalyst/navbar";
import {
  Sidebar,
  SidebarBody,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
} from "@/components/catalyst/sidebar";
import { StackedLayout } from "@/components/catalyst/stacked-layout";
import { ToolbarDropdown } from "@/components/toolbar-dropdown";
import { ChevronDownIcon, Cog8ToothIcon } from "@heroicons/react/16/solid";
import { InboxIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";

const navItems = [
  { label: "Home", url: "/" },
  { label: "Events", url: "/events" },
  { label: "Settings", url: "/settings" },
];

export default function HomePage() {
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
        {/* <DropdownItem onClick={() => setCreateKulaDialogOpen(true)}>
          <Link href=
          <PlusIcon />
          <DropdownLabel>New kula&hellip;</DropdownLabel>
        </DropdownItem> */}
      </DropdownMenu>
    );
  }

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
            </NavbarSection>
            <ToolbarDropdown />
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
      {/* <WalletDialog
        isOpen={isWalletDialogOpen}
        setIsOpen={setWalletDialogOpen}
      />
      <CreateKulaDialog
        isOpen={isCreateKulaDialogOpen}
        setIsOpen={setCreateKulaDialogOpen}
      />
       */}
    </>
  );
}
