'use client';

import { CareerItem, DetailLayout } from "@/components";
import { careerData } from "@/data";
import { careerT } from "@/types";

export default function CareerPage() {
  const CareerMainData = careerData.map((data: careerT, index: number) => {
    return (
      <CareerItem
        key={'carr-' + index}
        data={data}
      />
    )
  })

  return (
    <DetailLayout
      title={'CAREER'}>
      <div className="py-[3rem]">
        {CareerMainData}
      </div>
    </DetailLayout>
  );
}
