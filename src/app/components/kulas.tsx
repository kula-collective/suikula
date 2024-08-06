"use client";

import Link from "next/link";
// import { useRouter } from "next/navigation";
import { SuiMoveObject } from "@mysten/sui/client";
import { useEffect, useState } from "react";
import { useGetKulas } from "../hooks/useGetKulas";
import { useSui } from "../hooks/useSui";
import { Kula as KulaType } from "../types/kula";

interface Props {
  isDetailed?: boolean | false;
}

export const Kulas = ({ isDetailed }: Props) => {
  const { suiClient } = useSui();
  // const router = useRouter();
  const { kulaList, isLoading } = useGetKulas(
    process.env.DASHBOARD_ID as string
  );

  const [kulas, setKulas] = useState([] as KulaType[]);

  // const onDisplayDetailedService = (service: ServiceType) => {
  //   router.push(`/serviceDetailed/${service.id}`);
  // };

  useEffect(() => {
    if (isLoading) {
      return;
    }
    console.log(`KulaList: ${JSON.stringify(kulaList)}`);

    const kulasPromises = kulaList.map(async (kulaId: string) => {
      const obj = await suiClient.getObject({
        id: kulaId,
        options: { showContent: true },
      });
      const kulaName = (obj.data?.content as SuiMoveObject).fields.name;
      // let stars = 0;
      // const len = (obj.data?.content as SuiMoveObject).fields.reviews.fields
      //   .size;
      // if (len > 0) {
      //   stars = (obj.data?.content as SuiMoveObject).fields.overall_rate / len;
      // }
      console.log(`obj: ${JSON.stringify(obj.data)}`);
      return { id: kulaId, name: kulaName /*, stars*/ };
    });

    Promise.all(kulasPromises).then((data) => setKulas(data));
  }, [isLoading, kulaList]);

  // console.log("before=" + JSON.stringify(services));
  // kulas.sort((a, b) => (a.stars > b.stars ? -1 : 1));
  // console.log("after=" + JSON.stringify(services));

  return (
    <div className="container">
      {kulas.length > 0 ? (
        <ul>
          {kulas.map((kula) => (
            <li key={kula.id}>
              <Link href={`/kulas/${kula.id}`}>{kula.name}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <div>No kulas found</div>
      )}
    </div>
  );
};
