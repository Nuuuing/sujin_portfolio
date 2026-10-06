'use client';

import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { motion } from 'motion/react';

interface DetailLayoutProps {
    children: ReactNode;
    title?: string;
}

export const DetailLayout = ({ children, title }: DetailLayoutProps) => {
    const router = useRouter();

    // 페이지 진입 시 항상 상단에서 시작 (목록/상세 이동 시 스크롤 위치가 남는 문제 방지)
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="w-full min-h-screen relative">
            <div className="shell relative z-10 pt-16 sm:pt-20">
                {/* 돌아가기 버튼 */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="py-6 sm:py-8"
                >
                    <button
                        onClick={() => router.back()}
                        className="pill pill-line cursor-pointer"
                    >
                        <svg className="h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span>돌아가기</span>
                    </button>
                </motion.div>

                {title && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mb-6 sm:mb-8"
                    >
                        <h1 className="text-[1.9rem] font-bold tracking-[-0.03em] text-ink sm:text-[2.4rem]">
                            {title}
                        </h1>
                    </motion.div>
                )}

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="pb-10"
                >
                    {children}
                </motion.div>

                <footer className="flex flex-wrap items-center justify-between gap-2 px-1 pb-10 pt-6 text-center sm:text-left">
                    <p className="text-[0.85rem] text-ink-mute">본 페이지는 상업적 목적이 아닌 개인 포트폴리오용으로 제작되었습니다.</p>
                    <p className="tnum text-[0.85rem] text-ink-faint">© 2026 Kim Sujin</p>
                </footer>
            </div>
        </div>
    );
};
