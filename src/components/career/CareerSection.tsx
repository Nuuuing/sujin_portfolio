'use client';

import { BaseCard } from "@/components";
import { CareerT } from "@/features";
import { getCareers } from "@/utils";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";

// YYYYMM 형식을 YYYY.MM으로 변환
const formatTerm = (term: string | undefined): string => {
    if (!term) return '';
    if (term.length === 6) {
        return `${term.slice(0, 4)}.${term.slice(4, 6)}`;
    }
    return term;
};

export const CareerSection = () => {
    const [careerData, setCareerData] = useState<CareerT[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCareer, setSelectedCareer] = useState<CareerT | null>(null);

    useEffect(() => {
        const fetchCareers = async () => {
            setIsLoading(true);
            const data = await getCareers();
            setCareerData(data);
            // 최신순으로 첫번째 선택
            if (data.length > 0) {
                const sorted = data.slice().sort((a, b) => {
                    return (b.startTerm || '').localeCompare(a.startTerm || '');
                });
                setSelectedCareer(sorted[0]);
            }
            setIsLoading(false);
        };
        fetchCareers();
    }, []);


    const sortedData = careerData.slice().sort((a, b) => {
        return (b.startTerm || '').localeCompare(a.startTerm || '');
    });

    // 프로젝트가 있는 경력인지 확인
    const hasProjects = (career: CareerT) => {
        return career.displayType === 'project' && career.projects && career.projects.length > 0;
    };

    return (
        <div className="relative">
            {/* 배경 장식 */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-1/4 w-80 h-80 bg-[#72AAFF]/5 rounded-full blur-3xl" />
                <div className="absolute bottom-10 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
                {/* 장식 라인 */}
                <div className="absolute top-1/2 left-0 w-px h-32 bg-gradient-to-b from-transparent via-[#72AAFF]/20 to-transparent" />
                <div className="absolute top-1/2 right-0 w-px h-32 bg-gradient-to-b from-transparent via-[#72AAFF]/20 to-transparent" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative z-10"
            >
                {/* 섹션 헤더 */}
                <div className="flex flex-col items-center mb-8 sm:mb-12 gap-4 sm:gap-6">
                    <div className="text-center">
                        <motion.h2
                            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-2 sm:mb-3"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <span className="text-gray-900 dark:text-white">CAR</span>
                            <span className="text-[#72AAFF]">EER</span>
                        </motion.h2>
                    </div>
                </div>
                <div className="mt-4 sm:mt-8">
                    {isLoading ? (
                        <div className="text-gray-400 text-center text-sm sm:text-base">로딩 중...</div>
                    ) : (
                        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-10">
                            <div className="flex flex-row lg:flex-col gap-2 sm:gap-3 lg:w-[280px] flex-shrink-0 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scrollbar-thin">
                                {sortedData.map((data: CareerT, index: number) => {
                                    const isSelected = selectedCareer?.key === data.key;

                                    return (
                                        <motion.div
                                            key={`career-card-${index}`}
                                            initial={{ opacity: 0, x: -30 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.1 + index * 0.1, duration: 0.4 }}
                                            whileHover={{ x: 5, transition: { duration: 0.2 } }}
                                        >
                                            <BaseCard
                                                onClick={() => setSelectedCareer(data)}
                                                isSelected={isSelected}
                                                selectedClassName="bg-[#72AAFF]/20 border-2 border-[#72AAFF] shadow-lg shadow-[#72AAFF]/10"
                                                defaultClassName="bg-gray-100 dark:bg-[#2a2a2a] border-2 border-transparent hover:bg-gray-200 dark:hover:bg-[#333] hover:border-gray-300 dark:hover:border-gray-600"
                                                hoverEffect={false}
                                                className="p-3 sm:p-4 min-w-[200px] lg:min-w-0"
                                            >
                                                <p className={`text-xs sm:text-sm mb-0.5 sm:mb-1 ${isSelected ? 'text-[#72AAFF]' : 'text-[#72AAFF]/50'}`}>
                                                    {formatTerm(data.startTerm)} - {data.endTerm ? formatTerm(data.endTerm) : '현재'}
                                                </p>
                                                <h3 className={`text-lg sm:text-xl font-bold ${isSelected ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>{data.company}</h3>
                                                <p className={`text-sm sm:text-base ${isSelected ? 'text-gray-700 dark:text-gray-300' : 'text-gray-500'}`}>
                                                    {data?.position}{data?.team && ` / ${data.team}팀`}
                                                </p>
                                            </BaseCard>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {selectedCareer && (
                                <motion.div
                                    className="flex-1"
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4 }}
                                    key={selectedCareer.key}
                                >
                                    <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-1.5 sm:mb-2 text-gray-900 dark:text-white">
                                        {selectedCareer.company}
                                    </h2>
                                    <p className="text-base sm:text-lg lg:text-xl text-gray-500 dark:text-gray-400 mb-3 sm:mb-4">
                                        {selectedCareer?.position}{selectedCareer?.team && ` / ${selectedCareer.team}팀`}
                                    </p>

                                    {/* 경력 설명 */}
                                    {selectedCareer.description && (
                                        <motion.p
                                            className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-4 leading-relaxed"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 }}
                                        >
                                            {selectedCareer.description}
                                        </motion.p>
                                    )}

                                    {/* 경력 내용 요약 */}
                                    {selectedCareer.contents && (
                                        <motion.div
                                            className="mb-4 pl-4 border-l-4 border-[#72AAFF]"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.12 }}
                                        >
                                            <p className="text-gray-700 dark:text-gray-200 text-base leading-relaxed">
                                                {selectedCareer.contents}
                                            </p>
                                        </motion.div>
                                    )}

                                    {/* 프로젝트 요약 */}
                                    {hasProjects(selectedCareer) && selectedCareer.projects && (
                                        <motion.div
                                            className="mb-6 sm:mb-8"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.15, duration: 0.4 }}
                                        >
                                            <p className="text-lg text-[#72AAFF] mb-3">
                                                프로젝트 {selectedCareer.projects.length}개 참여
                                            </p>
                                            <ul className="space-y-2">
                                                {selectedCareer.projects.slice(0, 3).map((project, idx) => (
                                                    <motion.li
                                                        key={idx}
                                                        className="flex items-start gap-2 text-lg text-gray-600 dark:text-gray-300"
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.2 + idx * 0.05 }}
                                                    >
                                                        <span className="w-2 h-2 rounded-full bg-[#72AAFF] shrink-0 mt-2"></span>
                                                        <span>{project.projName}</span>
                                                    </motion.li>
                                                ))}
                                                {selectedCareer.projects.length > 2 && (
                                                    <li className="text-base text-gray-500 pl-4">
                                                        외 {selectedCareer.projects.length - 3}개
                                                    </li>
                                                )}
                                            </ul>
                                        </motion.div>
                                    )}

                                    {/* contents 타입일 때 detailContents 표시 */}
                                    {selectedCareer.displayType === 'contents' && selectedCareer.detailContents && selectedCareer.detailContents.length > 0 && (
                                        <motion.ul
                                            className="space-y-2 mb-6"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.15 }}
                                        >
                                            {selectedCareer.detailContents.map((content, idx) => (
                                                <li key={idx} className="flex items-start gap-2 text-base text-gray-600 dark:text-gray-300">
                                                    <span className="w-2 h-2 rounded-full bg-[#72AAFF] shrink-0 mt-2"></span>
                                                    <span>{content.contents}</span>
                                                </li>
                                            ))}
                                        </motion.ul>
                                    )}

                                    {/* 프로젝트가 있는 경력인 경우 detail 페이지 링크 버튼 */}
                                    {hasProjects(selectedCareer) && (
                                        <motion.div
                                            className="mt-6"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                        >
                                            <Link
                                                href={`/career/detail/${selectedCareer.key}`}
                                                scroll={true}
                                                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#72AAFF]/10 border border-[#72AAFF]/30 text-[#72AAFF] hover:bg-[#72AAFF] hover:text-white transition-all duration-300 text-sm font-medium"
                                            >
                                                프로젝트 상세 보기
                                                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </Link>
                                        </motion.div>
                                    )}
                                </motion.div>
                            )}
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    )
}
