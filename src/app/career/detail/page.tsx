'use client';

import { DetailLayout } from "@/components";
import { useSearchParams } from "next/navigation";

export default function CareerDetailPage() {

    const searchParams = useSearchParams();
    const keyParam = searchParams.get('id');
    const key = keyParam ? Number(keyParam) : null;
    
    return (
        <DetailLayout
            title={'CAREER'}>
            <div className="py-[3rem]">
                
            </div>
        </DetailLayout>
    )
}