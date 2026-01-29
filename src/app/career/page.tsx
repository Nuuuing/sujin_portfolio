import { CareerItem, DetailLayout } from "@/components";
import { careerT } from "@/features";
import { getCareers } from "@/utils";

export default async function CareerPage() {
  const careerData = await getCareers();

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
