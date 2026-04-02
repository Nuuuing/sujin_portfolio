'use client';

import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import { motion } from 'motion/react';

interface DetailLayoutProps {
    children: ReactNode;
    title?: string;
}

export const DetailLayout = ({ children, title }: DetailLayoutProps) => {
    const router = useRouter();

    return (
        <div className="w-full min-h-screen relative">
            {/* 전역 배경 장식 */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[20%] -left-32 w-64 h-64 bg-[#72AAFF]/3 rounded-full blur-3xl" />
                <div className="absolute top-[50%] -right-32 w-72 h-72 bg-[#72AAFF]/3 rounded-full blur-3xl" />
                <div className="absolute top-[80%] left-1/4 w-48 h-48 bg-purple-500/3 rounded-full blur-3xl" />
            </div>

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
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-[#72AAFF] transition-colors cursor-pointer group"
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
                            <span className="text-gray-900 dark:text-white">{title.slice(0, Math.ceil(title.length / 2))}</span>
                            <span className="text-[#72AAFF]">{title.slice(Math.ceil(title.length / 2))}</span>
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

                <footer className="py-8 sm:py-12 border-t border-gray-800 text-center text-gray-500">
                    <p className="text-xs sm:text-sm mb-2">본 페이지는 상업적 목적이 아닌 개인 포트폴리오용으로 제작되었습니다.</p>
                    <p className="text-xs sm:text-sm text-gray-600">© 2026 Kim Sujin. All Rights Reserved.</p>
                </footer>
            </div>
        </div>
    );
};
