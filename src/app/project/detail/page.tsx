'use client';


import { DetailLayout } from "@/components";
import { useSearchParams } from "next/navigation";

export default function ProjectDetail() {


    const searchParams = useSearchParams();
    const key = searchParams.get('id');

    return (
        <>
            <DetailLayout>
            </DetailLayout>
        </>
    )
}