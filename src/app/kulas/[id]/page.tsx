import { getKula } from "@/actions";
import { Heading } from "@/components/catalyst/heading";
import Offers from "@/components/offers";

export default async function Page({ params }: { params: { id: string } }) {
  const kula = await getKula(params.id);
  return (
    <>
      {kula && (
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-sm:w-full sm:flex-1">
            <Heading>{kula.name}</Heading>
          </div>
        </div>
      )}
      <Offers />
    </>
  );
}
