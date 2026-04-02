import { CareerT } from "@/features";
import { getCareers } from "@/utils";
import { CareerDetailClient } from "./CareerDetailClient";

type Params = Promise<{ id: string }>

// SSG용 정적 파라미터 생성
export async function generateStaticParams() {
    try {
        const careerData = await getCareers();
        const params = careerData
            .filter(item => item && item.key !== undefined)
            .map(item => ({ id: String(item.key) }));
        if (params.length === 0) {
            return [{ id: '0' }];
        }
        return params;
    } catch (error) {
        console.error('Error generating static params:', error);
        return [{ id: '0' }];
    }
}

export default async function CareerDetailPage(props: { params: Params }) {
    const { id } = await props.params;

    let initialData: CareerT | null = null;
    try {
        const careerData = await getCareers();
        initialData = careerData.find(c => String(c.key) === id) || null;
    } catch (error) {
        console.error('Error fetching initial career data:', error);
    }

    return <CareerDetailClient id={id} initialData={initialData} />;
}