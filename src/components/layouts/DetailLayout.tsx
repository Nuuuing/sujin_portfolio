'use client';

import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

interface DetailLayoutProps {
    children: ReactNode;
    title?: string;
}

export const DetailLayout = (props: DetailLayoutProps) => {
    const { children, title } = props;
    const router = useRouter();

    const handleBack = () => {
        router.back();
    };

    return (
        <div className="w-full">
            {/* 돌아가기 버튼 */}
            <div
                onClick={handleBack}
                className="w-full flex items-center px-4 sm:px-8 py-6 text-base sm:text-xl font-bold cursor-pointer"
            >
                <h1>&lt; 돌아가기</h1>
            </div>

            {title && (
                <div className="px-4 sm:px-8 mb-4">
                    <h1 className="text-2xl sm:text-4xl font-bold">{title}</h1>
                </div>
            )}

            <div className="w-full border-t dark:border-[#f0f0f0] border-gray-700">
                <div className="px-4 sm:px-8 py-10">
                    {children}
                </div>
            </div>

            <div className="w-full px-4 sm:px-8 md:px-20 py-8 border-t border-[#f0f0f0] text-sm text-center">
                <p>본 페이지는 상업적 목적이 아닌 개인 포트폴리오용으로 제작되었습니다.</p>
                <p>© 2025 Kim Sujin. All Rights Reserved.</p>
            </div>
        </div>
    );
};
