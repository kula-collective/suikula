"use client";

import Link from "next/link";
// import { useRouter } from "next/navigation";
import { DropdownItem, DropdownLabel } from "@/components/dropdown";
import { useGetKulas } from "@/hooks/useGetKulas";
import { useSuiClient } from "@/hooks/useSuiClient";
import { useEffect } from "react";

interface Props {
  isDetailed?: boolean | false;
}

export const Kulas = ({ isDetailed }: Props) => {
  const suiClient = useSuiClient();
  // const router = useRouter();
  const { kulaList, isLoading } = useGetKulas();

  // const [kulas, setKulas] = useState([] as KulaType[]);

  // const onDisplayDetailedService = (service: ServiceType) => {
  //   router.push(`/serviceDetailed/${service.id}`);
  // };

  // function getKulaFields(data: SuiObjectData) {
  //   if (data.content?.dataType !== "moveObject") {
  //     return null;
  //   }

  //   return data.content.fields as { name: string; owner: string };
  // }

  useEffect(() => {
    if (isLoading) {
      return;
    }
    console.log(`KulaList: ${JSON.stringify(kulaList)}`);

    // const kulasPromises = kulaList.map(async (kulaId: string) => {
    //   const resp = await suiClient.getObject({
    //     id: kulaId,
    //     options: { showContent: true },
    //   });
    //   console.log("resp", resp);
    //   if (resp.error) {
    //     toast.error("Failed getting kulas");
    //   } else {
    //     if (resp?.data?.content?.dataType !== "moveObject") {
    //       return null;
    //     }
    //     const kulaName = getKulaFields(resp.data)?.name;
    //     // let stars = 0;
    //     // const len = (obj.data?.content as SuiMoveObject).fields.reviews.fields
    //     //   .size;
    //     // if (len > 0) {
    //     //   stars = (obj.data?.content as SuiMoveObject).fields.overall_rate / len;
    //     // }
    //     console.log(`obj: ${JSON.stringify(resp.data)}`);
    //     return { id: kulaId, name: kulaName /*, stars*/ };
    //   }
    // });

    // FIXME setKulas
    // Promise.all(kulasPromises).then((data) => data ? setKulas(data) : {});
  }, [isLoading, kulaList]);

  // console.log("before=" + JSON.stringify(services));
  // kulas.sort((a, b) => (a.stars > b.stars ? -1 : 1));
  // console.log("after=" + JSON.stringify(services));

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
};
