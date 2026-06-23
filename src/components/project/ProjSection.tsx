'use client';

import { projDetailT } from "@/features";
import { ImageWithFallback } from "@/components";
import { getProjectDetails, isDisplayableImage, parseContent } from "@/utils";
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
    const imageUrl = Array.isArray(project.imgUrl) ? project.imgUrl.find(isDisplayableImage) : project.imgUrl;
    const [imageVisible, setImageVisible] = useState(isDisplayableImage(imageUrl));

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
                    className="bg-[var(--bg-card)] rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col lg:flex-row shadow-[0_8px_30px_-12px_rgba(63,59,48,0.18)] hover:shadow-[0_22px_50px_-16px_rgba(63,59,48,0.28)] transition-shadow duration-300 min-h-[320px] sm:min-h-[380px] lg:min-h-[420px] group border border-line origin-top"
                >
                    <div className={`p-5 sm:p-8 lg:p-12 ${imageVisible ? 'lg:w-1/2' : 'lg:w-full'} flex flex-col justify-center order-2 lg:order-1 relative z-10`}>
                        <div>
                            {/* 프로젝트 이름 */}
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ink group-hover:text-[var(--taupe)] transition-colors mb-2">
                                {project.projName}
                            </h2>

                            {/* 역할 */}
                            <p className="text-sm sm:text-base text-[var(--taupe)] font-medium mb-4">
                                {project.role || 'Developer'}
                            </p>

                            {/* Key Achievements */}
                            {project.achievements && project.achievements.length > 0 && (
                                <ul className="space-y-2">
                                    {project.achievements.slice(0, 3).map((achievement, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-ink-soft text-sm sm:text-base">
                                            <span className="text-[var(--taupe)] mt-1">•</span>
                                            <span className="line-clamp-2">{parseContent(achievement)}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    {imageVisible && (
                    <div className="lg:w-1/2 min-h-[180px] sm:min-h-[220px] lg:min-h-full bg-cream relative overflow-hidden order-1 lg:order-2">
                        <ImageWithFallback
                            src={imageUrl || ''}
                            alt={project.projName}
                            className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-transform duration-500 ease-out"
                            hideOnError
                            onHidden={() => setImageVisible(false)}
                        />
                    </div>
                    )}
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
            {/* 섹션 헤더 */}
            <motion.div
                className="mb-8 sm:mb-12 relative z-10"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <div className="flex items-end justify-between gap-4">
                    <div>
                        <p className="eyebrow mb-2">Projects</p>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ink">
                            Works
                        </h2>
                        <p className="mt-2 text-sm text-ink-soft sm:text-base">
                            개인적으로 진행한 사이드 프로젝트들을 소개합니다.
                        </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-5 pb-1">
                        <div className="text-right">
                            <p className="text-2xl font-bold text-[var(--taupe)] sm:text-3xl">{filteredData.length}</p>
                            <p className="text-[10px] text-ink-soft">HIGHLIGHT</p>
                        </div>
                        <div className="h-8 w-px bg-[var(--line-strong)]" />
                        <div className="text-right">
                            <p className="text-2xl font-bold text-ink sm:text-3xl">{allProjects.length}</p>
                            <p className="text-[10px] text-ink-soft">TOTAL</p>
                        </div>
                        <div className="hidden h-8 w-px bg-[var(--line-strong)] sm:block" />
                        <Link
                            href="/project"
                            scroll={true}
                            className="hidden sm:inline-flex group items-center gap-2 rounded-full border border-line bg-card-soft px-4 py-2 text-xs font-medium text-ink-soft transition-all hover:border-line-strong hover:text-ink"
                        >
                            전체보기
                            <svg className="h-3 w-3 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
                <div className="mt-5 h-px w-full bg-[var(--line)]" />
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
                    className="group inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full border border-line bg-card-soft text-ink-soft hover:border-line-strong hover:text-ink transition-all duration-300 text-sm sm:text-base font-medium"
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
