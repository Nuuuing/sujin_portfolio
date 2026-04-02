'use client';

import { prepImg } from "@/data";
import { projDetailT } from "@/features";
import { ImageWithFallback } from "@/components";
import { getProjectDetails, parseContent } from "@/utils";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import Link from "next/link";
import { useState, useEffect, useRef } from 'react';

const Card = ({
    project,
    i,
    progress,
    range,
    targetScale,
    totalCount
}: {
    project: projDetailT,
    i: number,
    progress: MotionValue<number>,
    range: number[],
    targetScale: number,
    totalCount: number
}) => {

    const scale = useTransform(progress, range, [1, targetScale]);

    return (
        <div
            className="sticky top-0 flex items-center justify-center box-border"
            style={{
                top: `calc(8% + ${i * 20}px)`,
                minHeight: '350px',
                marginBottom: `${(totalCount - 1 - i) * 20}px`
            }}
        >
            <Link href={`/project/detail/${project.key}`} className="block w-full">
                <motion.div
                    style={{
                        scale,
                    }}
                    className="bg-white dark:bg-[#1c1c1c] rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col lg:flex-row shadow-xl dark:shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-shadow duration-300 min-h-[320px] sm:min-h-[380px] lg:min-h-[420px] group border border-gray-200 dark:border-gray-800 origin-top"
                >
                    <div className="p-5 sm:p-8 lg:p-12 lg:w-1/2 flex flex-col justify-center order-2 lg:order-1 relative z-10">
                        <div>
                            {/* 프로젝트 이름 */}
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white group-hover:text-[#72AAFF] transition-colors mb-2">
                                {project.projName}
                            </h2>

                            {/* 역할 */}
                            <p className="text-base sm:text-lg text-[#72AAFF] font-medium mb-4">
                                {project.role || 'Developer'}
                            </p>

                            {/* Key Achievements */}
                            {project.achievements && project.achievements.length > 0 && (
                                <ul className="space-y-2">
                                    {project.achievements.slice(0, 3).map((achievement, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-300 text-base sm:text-lg">
                                            <span className="text-[#72AAFF] mt-1">•</span>
                                            <span className="line-clamp-2">{parseContent(achievement)}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    <div className="lg:w-1/2 min-h-[180px] sm:min-h-[220px] lg:min-h-full bg-gray-100 dark:bg-gray-900 relative overflow-hidden order-1 lg:order-2">
                        <ImageWithFallback
                            src={Array.isArray(project.imgUrl) ? project.imgUrl[0] : project.imgUrl || ''}
                            fallbackSrc={prepImg}
                            alt={project.projName}
                            className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-transform duration-500 ease-out"
                        />
                    </div>
                </motion.div>
            </Link>
        </div>
    );
}

export const ProjSection = () => {
    const [filteredData, setFilteredData] = useState<projDetailT[]>([]);
    const [allProjects, setAllProjects] = useState<projDetailT[]>([]);

    // Main container ref to track scroll
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    });

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await getProjectDetails();
                // endDate DESC 정렬 (최신이 위에)
                const sortedData = [...data].sort((a, b) => {
                    const dateA = a.endDate ? new Date(a.endDate).getTime() : Date.now();
                    const dateB = b.endDate ? new Date(b.endDate).getTime() : Date.now();
                    return dateB - dateA;
                });
                setAllProjects(sortedData);
                setFilteredData(sortedData.filter(project => project.mainviewyn === true));
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };
        fetchProjects();
    }, []);

    return (
        <section className="w-full relative">
            {/* 배경 장식 */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 -left-20 w-80 h-80 bg-[#72AAFF]/5 rounded-full blur-3xl" />
                <div className="absolute top-40 -right-20 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
                {/* 장식 라인 */}
                <div className="absolute top-1/2 left-0 w-px h-32 bg-gradient-to-b from-transparent via-[#72AAFF]/20 to-transparent" />
                <div className="absolute top-1/2 right-0 w-px h-32 bg-gradient-to-b from-transparent via-[#72AAFF]/20 to-transparent" />
            </div>

            {/* 섹션 헤더 */}
            <motion.div
                className="flex flex-col items-center mb-8 sm:mb-12 gap-4 sm:gap-6 relative z-10"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <div className="text-center">
                    <motion.div
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#72AAFF]/10 border border-[#72AAFF]/20 mb-3 sm:mb-4"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#72AAFF] animate-pulse" />
                        <span className="text-[10px] sm:text-xs font-semibold text-[#72AAFF] tracking-widest">PERSONAL PROJECTS</span>
                    </motion.div>
                    <motion.h1
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <span className="text-gray-900 dark:text-white">PROJ</span>
                        <span className="text-[#72AAFF]">ECT</span>
                    </motion.h1>
                    <motion.p
                        className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-md mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        개인적으로 진행한 사이드 프로젝트들을 소개합니다.
                    </motion.p>
                </div>

                {/* 통계 + 더보기 버튼 */}
                <motion.div
                    className="flex items-center gap-4 sm:gap-6 justify-center lg:justify-end"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                >
                    <div className="flex gap-4 sm:gap-6 items-center">
                        <div className="text-center">
                            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#72AAFF]">{filteredData.length}</p>
                            <p className="text-[10px] sm:text-xs text-gray-500">HIGHLIGHT</p>
                        </div>
                        <div className="w-px h-8 sm:h-10 bg-gray-300 dark:bg-gray-700" />
                        <div className="text-center">
                            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">{allProjects.length}</p>
                            <p className="text-[10px] sm:text-xs text-gray-500">TOTAL</p>
                        </div>
                    </div>
                    <div className="hidden sm:block w-px h-8 sm:h-10 bg-gray-300 dark:bg-gray-700" />
                    <Link
                        href="/project"
                        scroll={true}
                        className="hidden sm:inline-flex group items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#72AAFF]/10 border border-[#72AAFF]/30 text-[#72AAFF] hover:bg-[#72AAFF] hover:text-white transition-all duration-300 text-xs sm:text-sm font-medium"
                    >
                        전체보기
                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </motion.div>
            </motion.div>

            <div ref={container} className="flex flex-col gap-0 max-w-6xl mx-auto pb-0 relative">
                {filteredData.map((project, index) => {
                    // Calculate target scale: Earlier items shrink more
                    const targetScale = 1 - ((filteredData.length - 1 - index) * 0.05);

                    // Logic: Item i starts scaling "after" it sticks and while subsequent items scroll past
                    const rangeStart = index * (1 / filteredData.length);
                    const rangeEnd = 1;

                    return (
                        <Card
                            key={project.key}
                            i={index}
                            project={project}
                            progress={scrollYProgress}
                            range={[rangeStart, rangeEnd]}
                            targetScale={targetScale}
                            totalCount={filteredData.length}
                        />
                    );
                })}
            </div>

            {/* 하단 더보기 버튼 */}
            <motion.div
                className="flex justify-center mt-8 sm:mt-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
            >
                <Link
                    href="/project"
                    scroll={true}
                    className="group inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-[#72AAFF] hover:text-[#72AAFF] hover:bg-[#72AAFF]/5 transition-all duration-300 text-sm sm:text-base font-medium"
                >
                    모든 프로젝트 보기
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </Link>
            </motion.div>
        </section>
    );
};
