import Link from "next/link";
// import { useRouter } from "next/navigation";
import { getKulas } from "@/actions";
import { DropdownItem, DropdownLabel } from "@/components/catalyst/dropdown";

interface Props {
  isDetailed?: boolean | false;
}

export async function Kulas({ isDetailed }: Props) {
  const kulaList = await getKulas();

  return (
    <div className="container">
      {kulaList.length > 0 ? (
        <ul>
          {/* TODO: Don't force to be in a DropdownList */}
          {kulaList.map((kula) => (
            <DropdownItem key={kula.id}>
              <Link href={`/kulas/${kula.id}`}>
                <DropdownLabel>{kula.name}</DropdownLabel>
              </Link>
            </DropdownItem>
          ))}
        </ul>
      ) : (
        <div>No kulas found</div>
      )}
    </div>
  );
}
