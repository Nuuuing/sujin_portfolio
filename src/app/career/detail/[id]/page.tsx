import { DetailLayout } from "@/components";
import { CareerDetail } from "@/components/career/Detail";
import { getCareers } from "@/utils";

type Params = Promise<{ id: string }>

export async function generateStaticParams() {
    const careerData = await getCareers();
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
    const careerData = await getCareers();
    const career = careerData.find(c => c.key === Number(id));

    if (!career) {
        return (
            <DetailLayout title={'CAREER'}>
                <div className="py-[3rem] text-center">
                    <p>해당 경력 정보를 찾을 수 없습니다.</p>
                </div>
            </DetailLayout>
        );
    }

    return (
        <DetailLayout title={'CAREER'}>
            <div className="py-[3rem]">
                <CareerDetail career={career} />
            </div>
        </DetailLayout>
    );
}