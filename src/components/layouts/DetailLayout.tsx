'use client';

import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

interface DetailLayoutProps {
    children: ReactNode;
    title?: string;
}

export const DetailLayout = (props: DetailLayoutProps) => {
    const { children, title } = props;
    const router = useRouter()

    const handleBack = () => {
        router.back()
    }

    return (
        <div>
            <div
                onClick={() => handleBack()}
                className="w-full flex items-center p-10 text-xl font-bold cursor-pointer">
                <h1> &lt; 돌아가기</h1>
            </div>
            {
                title && (
                    <div className="pl-10">
                        <h1 className="text-4xl font-bold">{title}</h1>
                    </div>
                )
            }

            <div className="m-10 border-t-1 border-[#f0f0f0]">
                <div className="px-10 py-10">
                    {children}
                </div>
            </div>
            <div className='w-100% mx-20 py-8 border-[#f0f0f0] border-t-1 text-sm'>
                <p>본 페이지는 상업적 목적이 아닌 개인 포트폴리오용으로 제작되었습니다.</p>
                <p>© 2025 Kim Sujin. All Rights Reserved.</p>
            </div>
        </div >
    );
};