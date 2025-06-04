import { DetailLayout } from "@/components";
import { careerData } from "@/modules/career";

type Params = Promise<{ id: string }>

export async function generateStaticParams() {
    return careerData.map((item) => ({
        id: item.key.toString(),
    }));
}

export default async function CareerDetailPage(props: { params: Params }) {
    const { id } = await props.params;

    return (
        <DetailLayout
            title={'CAREER'}>
            <div className="py-[3rem]">
                {id}
            </div>
        </DetailLayout>
    )
}