import { Heading } from "@/components/catalyst/heading";
import Offers from "@/components/offers";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <>
      {params.id && (
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-sm:w-full sm:flex-1">
            <Heading>Kula id {params.id}</Heading>
          </div>
        </div>
      )}
      <Offers />
    </>
  );
}
