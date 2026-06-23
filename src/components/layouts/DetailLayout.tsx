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
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* 돌아가기 버튼 */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="py-6 sm:py-8"
                >
                    <button
                        onClick={() => router.back()}
                        className="inline-flex items-center gap-2 text-ink-soft/60 hover:text-[var(--taupe)] transition-colors cursor-pointer group"
                    >
                        <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="text-sm sm:text-base font-medium">돌아가기</span>
                    </button>
                </motion.div>

                {title && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mb-8 sm:mb-12"
                    >
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                            <span className="text-ink">{title.slice(0, Math.ceil(title.length / 2))}</span>
                            <span className="text-[var(--taupe)]">{title.slice(Math.ceil(title.length / 2))}</span>
                        </h1>
                    </motion.div>
                )}

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="pb-12"
                >
                    {children}
                </motion.div>

                <footer className="py-8 sm:py-12 border-t border-line text-center text-ink-soft">
                    <p className="text-xs sm:text-sm mb-2">본 페이지는 상업적 목적이 아닌 개인 포트폴리오용으로 제작되었습니다.</p>
                    <p className="text-xs sm:text-sm text-ink-soft">© 2026 Kim Sujin. All Rights Reserved.</p>
                </footer>
            </div>
        </div>
    );
};
