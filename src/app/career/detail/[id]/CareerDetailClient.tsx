'use client';

import { DetailLayout } from "@/components";
import { CareerDetail } from "@/components/career/Detail";
import { CareerT } from "@/features";
import { getCareers } from "@/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface CareerDetailClientProps {
    id: string;
    initialData?: CareerT | null;
}

export function CareerDetailClient({ id, initialData }: CareerDetailClientProps) {
    const router = useRouter();

    const [career, setCareer] = useState<CareerT | null>(initialData || null);
    const [isLoading, setIsLoading] = useState(!initialData);
    const [error, setError] = useState(false);

    useEffect(() => {
        // 페이지 이동 시 항상 데이터를 가져옴
        const fetchData = async () => {
            if (!career) setIsLoading(true);
            setError(false);
            try {
                const careerData = await getCareers();
                const found = careerData.find(c => String(c.key) === id);
                if (found) {
                    setCareer(found);
                } else {
                    setError(true);
                }
            } catch (err) {
                console.error('Error fetching career details:', err);
                setError(true);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    // 로딩 상태
    if (isLoading) {
        return (
            <DetailLayout title="CAREER">
                <div className="flex flex-col items-center justify-center py-20">
                    <div className="w-12 h-12 border-4 border-[var(--taupe)]/30 border-t-[var(--taupe)] rounded-full animate-spin mb-4"></div>
                    <p className="text-ink-soft/60">경력 정보를 불러오는 중...</p>
                </div>
            </DetailLayout>
        );
    }

    // 에러 또는 데이터 없음
    if (error || !career) {
        return (
            <DetailLayout title="CAREER">
                <div className="flex flex-col items-center justify-center py-20 text-ink-soft">
                    <svg className="w-16 h-16 mb-4 text-ink-soft" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-lg mb-4">해당 경력 정보를 찾을 수 없습니다.</p>
                    <button
                        onClick={() => router.push('/')}
                        className="px-4 py-2 bg-[var(--taupe)] text-[var(--bg-card)] rounded-lg hover:bg-[var(--ink)] transition-colors"
                    >
                        홈으로
                    </button>
                </div>
            </DetailLayout>
        );
    }

    // 프로젝트도 상세 콘텐츠도 없는 경우
    const hasProjects = !!career.projects?.length;
    const hasDetailContents = !!career.detailContents?.length;
    if (!hasProjects && !hasDetailContents) {
        return (
            <DetailLayout title="CAREER">
                <div className="flex flex-col items-center justify-center py-20 text-ink-soft">
                    <svg className="w-16 h-16 mb-4 text-ink-soft" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <p className="text-lg">이 경력에는 상세 정보가 없습니다.</p>
                </div>
            </DetailLayout>
        );
    }

    return (
        <DetailLayout title="CAREER">
            <CareerDetail career={career} />
        </DetailLayout>
    );
}
