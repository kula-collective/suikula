import { Badge } from "@/components/catalyst/badge";
import { Divider } from "@/components/catalyst/divider";
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
} from "@/components/catalyst/dropdown";
import { Link } from "@/components/catalyst/link";
import { getOffers } from "@/data";
import { EllipsisVerticalIcon } from "@heroicons/react/16/solid";
import { MapPinIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

export default async function Offers() {
  let offers = await getOffers();

  return (
    <>
      <ul className="mt-10">
        {offers.map((offer, index) => (
          <li key={offer.id}>
            <Divider soft={index > 0} />
            <div className="flex items-center justify-between">
              <div key={offer.id} className="flex gap-6 py-6">
                <div className="w-32 shrink-0">
                  <Link href={offer.url} aria-hidden="true">
                    <Image
                      className="aspect-[3/2] rounded-lg shadow"
                      src={offer.imgUrl}
                      width={128}
                      height={85}
                      style={{ objectFit: "cover" }}
                      alt=""
                    />
                  </Link>
                </div>
                <div className="space-y-1.5">
                  <div className="text-base/6 font-semibold">
                    <Link href={offer.url}>{offer.name}</Link>
                  </div>
                  <div className="flex flex-row items-center gap-1 text-xs/6 text-zinc-500">
                    <MapPinIcon height={20} />
                    {offer.location}
                  </div>
                  <div className="text-xs/6 text-zinc-600">{offer.blurb}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge
                  className="max-sm:hidden"
                  color={offer.status === "On Sale" ? "lime" : "zinc"}
                >
                  {offer.status}
                </Badge>
                <Dropdown>
                  <DropdownButton plain aria-label="More options">
                    <EllipsisVerticalIcon />
                  </DropdownButton>
                  <DropdownMenu anchor="bottom end">
                    <DropdownItem href={offer.url}>View</DropdownItem>
                    <DropdownItem>Edit</DropdownItem>
                    <DropdownItem>Delete</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
