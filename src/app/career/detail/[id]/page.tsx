import { DetailLayout } from "@/components";

export default async function CareerDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    return (
        <DetailLayout
            title={'CAREER'}>
            <div className="py-[3rem]">
                {id}
            </div>
        </DetailLayout>
    )
}