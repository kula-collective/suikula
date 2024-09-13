import { getKulas } from "@/actions";
import { AccountMenu } from "@/components/account-menu";
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
} from "@/components/catalyst/sidebar";
import { SidebarLayout } from "@/components/catalyst/sidebar-layout";
import { CreateKulaItem } from "@/components/create-kula-item";
import { ChevronDownIcon, Cog8ToothIcon } from "@heroicons/react/16/solid";
import { Cog6ToothIcon, HomeIcon } from "@heroicons/react/20/solid";

export async function ApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const kulas = await getKulas();

  return (
    <SidebarLayout
      navbar={
        <Navbar>
          <NavbarSpacer />
          <NavbarSection>
            <AccountMenu />
          </NavbarSection>
        </Navbar>
      }
      sidebar={
        <Sidebar>
          <SidebarHeader>
            <Dropdown>
              <DropdownButton as={NavbarItem}>
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
                {kulas.map((kula) => (
                  <DropdownItem key={kula.id}>
                    <Link href={`/kulas/${kula.id}`}>
                      <DropdownLabel>{kula.name}</DropdownLabel>
                    </Link>
                  </DropdownItem>
                ))}
                {/* <DropdownItem href="#">
                  <Avatar
                    slot="icon"
                    initials="Atx"
                    className="bg-purple-500 text-white"
                  />
                  <DropdownLabel>South Austin</DropdownLabel>
                </DropdownItem> */}
                <CreateKulaItem />
              </DropdownMenu>
            </Dropdown>
          </SidebarHeader>

          <SidebarBody>
            <SidebarSection>
              <SidebarItem href="/" path="/">
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
              <SidebarItem href="/settings" path="/settings">
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

            {/* <SidebarSpacer />

            <SidebarSection>
              <SidebarItem href="#">
                <QuestionMarkCircleIcon />
                <SidebarLabel>Support</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="#">
                <SparklesIcon />
                <SidebarLabel>Changelog</SidebarLabel>
              </SidebarItem>
            </SidebarSection> */}
          </SidebarBody>

          <SidebarFooter className="max-lg:hidden">
            <AccountMenu sidebar={true} />
          </SidebarFooter>
        </Sidebar>
      }
    >
      <main>{children}</main>
    </SidebarLayout>
  );
}
