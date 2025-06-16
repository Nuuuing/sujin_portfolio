import { DetailLayout } from "@/components";
import { CareerTg, CareerUph } from "@/components/career/Detail";
import { careerData } from "@/data";

type Params = Promise<{ id: string }>

export async function generateStaticParams() {
    const params = careerData.map((item) => {
        if (item && item.key !== undefined && item.key !== null) {
            return { id: item.key.toString() };
        } else {
            return null;
        }
    }).filter(Boolean);

    return params;
}

export default async function CareerDetailPage(props: { params: Params }) {
    const { id } = await props.params;

    return (
        <DetailLayout
            title={'CAREER'}>
            <div className="py-[3rem]">

                {
                    id === '0' ? (
                        <CareerTg />
                    ) : id === '1' ? (
                        <CareerUph />
                    ) : (<></>)
                }

            </div>
        </DetailLayout>
    )
}