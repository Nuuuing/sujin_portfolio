'use client';

import { BaseCard } from "@/components";
import { CareerT } from "@/features";
import { getCareers, parseContent } from "@/utils";
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

const parseLabeledLine = (text: string) => {
    const match = text.match(/^(문제|해결|설계\/구현|결과|결과\/역량):\s*(.*)$/);
    if (!match) return null;

    const label = match[1];
    const field: 'challenge' | 'implementation' | 'outcome' =
        label === '문제' ? 'challenge' :
            label === '해결' || label === '설계/구현' ? 'implementation' :
                'outcome';

    return { field, text: match[2] };
};

const getCareerHighlights = (career: CareerT) => {
    const groups: Array<{
        title?: string;
        challenge?: string;
        implementation?: string;
        outcome?: string;
    }> = [];

    career.detailContents?.forEach((content) => {
        const parsed = parseLabeledLine(content.contents);

        if (!parsed) {
            groups.push({ title: content.title, outcome: content.contents });
            return;
        }

        if (parsed.field === 'challenge' || groups.length === 0) {
            groups.push({ title: content.title });
        }

        groups[groups.length - 1][parsed.field] = parsed.text;
    });

    return groups.filter(group => group.challenge || group.implementation || group.outcome);
};

const getCareerKeywords = (career: CareerT) => {
    const text = [
        career.description,
        career.contents,
        ...(career.detailContents?.map(item => item.contents) || []),
        ...(career.projects?.flatMap(project => [
            project.projName,
            project.description,
            ...(project.tasks || []),
            ...(project.achievements || []),
        ]) || []),
    ].filter(Boolean).join(' ');

    const keywordRules = [
        ['ReactQuery', 'ReactQuery'],
        ['React.js', 'React'],
        ['React', 'React'],
        ['WebRTC', 'WebRTC'],
        ['MSSQL', 'MSSQL'],
        ['ERP', 'ERP 연동'],
        ['OpenAPI', 'OpenAPI'],
        ['공공', '공공 SI/SM'],
        ['관리자', '관리자 시스템'],
        ['데이터', '데이터 처리'],
        ['매뉴얼', '문서화'],
    ] as const;

    return Array.from(new Set(
        keywordRules
            .filter(([token]) => text.includes(token))
            .map(([, label]) => label)
    )).slice(0, 5);
};

const getHighlightTitle = (group: { title?: string; challenge?: string; implementation?: string; outcome?: string }) => {
    if (group.title?.trim()) return group.title.trim();

    const text = `${group.challenge || ''} ${group.implementation || ''} ${group.outcome || ''}`;

    if (text.includes('MSSQL') || text.includes('ERP') || text.includes('거래 데이터')) {
        return '데이터 처리 및 연동 안정화';
    }

    if (text.includes('현업') || text.includes('요구사항') || text.includes('업무 시스템')) {
        return '업무 시스템 운영 개선';
    }

    if (text.includes('OpenAPI')) {
        return '외부 연계 기반 구축';
    }

    if (text.includes('ReactQuery')) {
        return '화면 응답성과 데이터 흐름 개선';
    }

    return '운영 개선';
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

    // 상세 페이지로 이동 가능한 경력인지 확인 (프로젝트형 또는 콘텐츠형)
    const hasDetail = (career: CareerT) => {
        return hasProjects(career) || (career.detailContents && career.detailContents.length > 0);
    };

    return (
        <div className="relative">
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
                            <span className="text-ink">CAR</span>
                            <span className="text-[var(--taupe)]">EER</span>
                        </motion.h2>
                    </div>
                </div>
                <div className="mt-4 sm:mt-8">
                    {isLoading ? (
                        <div className="text-ink-soft/60 text-center text-sm sm:text-base">로딩 중...</div>
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
                                                selectedClassName="bg-[var(--taupe)]/15 border-2 border-[var(--taupe)] shadow-lg shadow-[var(--taupe)]/10"
                                                defaultClassName="bg-card-soft border-2 border-transparent hover:border-line-strong"
                                                hoverEffect={false}
                                                className="p-3.5 min-w-[190px] lg:min-w-0"
                                            >
                                                <p className={`mb-1 text-[11px] font-medium tracking-wide ${isSelected ? 'text-[var(--taupe)]' : 'text-ink-soft/45'}`}>
                                                    {formatTerm(data.startTerm)} - {data.endTerm ? formatTerm(data.endTerm) : '현재'}
                                                </p>
                                                <h3 className={`text-base font-bold leading-tight ${isSelected ? 'text-ink' : 'text-ink-soft'}`}>{data.company}</h3>
                                                <p className={`mt-0.5 text-xs ${isSelected ? 'text-ink-soft' : 'text-ink-soft/60'}`}>
                                                    {data?.position}{data?.team && ` · ${data.team}팀`}
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
                                    {(() => {
                                        const keywords = getCareerKeywords(selectedCareer);
                                        const highlights = getCareerHighlights(selectedCareer);

                                        return (
                                            <>
                                    <div className="mb-3 flex items-start justify-between gap-4 sm:mb-4">
                                        <div>
                                            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-1.5 sm:mb-2 text-ink">
                                                {selectedCareer.company}
                                            </h2>
                                            <p className="text-base sm:text-lg lg:text-xl text-ink-soft">
                                                {selectedCareer?.position}{selectedCareer?.team && ` / ${selectedCareer.team}팀`}
                                            </p>
                                        </div>
                                        {hasDetail(selectedCareer) && (
                                            <Link
                                                href={`/career/detail/${selectedCareer.key}`}
                                                scroll={true}
                                                className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-line bg-card-soft px-4 py-2 text-xs font-medium text-ink-soft transition-all duration-300 hover:border-line-strong hover:text-ink sm:px-5 sm:py-2.5 sm:text-sm"
                                            >
                                                {selectedCareer.displayType === 'project' ? '프로젝트 상세 보기' : '경력 상세 보기'}
                                                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </Link>
                                        )}
                                    </div>

                                    <motion.div
                                        className="mb-6 rounded-2xl border border-line bg-[var(--bg-card)] p-5 shadow-[0_2px_14px_-6px_rgba(63,59,48,0.14)] sm:p-6"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.12 }}
                                    >
                                        <div className="mb-4 flex flex-wrap gap-2">
                                            {selectedCareer.description && (
                                                <span className="rounded-full border border-[var(--taupe)]/30 bg-[var(--taupe)]/12 px-3 py-1 text-xs font-semibold tracking-wide text-[var(--taupe)]">
                                                    {selectedCareer.description}
                                                </span>
                                            )}
                                            {keywords.map((keyword) => (
                                                <span
                                                    key={keyword}
                                                    className="rounded-full border border-line bg-cream px-3 py-1 text-xs font-medium text-ink-soft"
                                                >
                                                    {keyword}
                                                </span>
                                            ))}
                                        </div>
                                        {selectedCareer.contents && (
                                            <p className="line-clamp-5 text-[14px] leading-6 text-ink-soft sm:text-[15px]">
                                                {parseContent(selectedCareer.contents)}
                                            </p>
                                        )}
                                    </motion.div>

                                    {/* 프로젝트 요약 */}
                                    {hasProjects(selectedCareer) && selectedCareer.projects && (
                                        <motion.div
                                            className="mb-6 sm:mb-8"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.15, duration: 0.4 }}
                                        >
                                            <p className="text-base text-[var(--taupe)] mb-3">
                                                프로젝트 {selectedCareer.projects.length}개 참여
                                            </p>
                                            <ul className="space-y-2">
                                                {selectedCareer.projects.slice(0, 3).map((project, idx) => (
                                                    <motion.li
                                                        key={idx}
                                                        className="flex items-start gap-2 text-base text-ink-soft"
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.2 + idx * 0.05 }}
                                                    >
                                                        <span className="w-2 h-2 rounded-full bg-[var(--taupe)] shrink-0 mt-2"></span>
                                                        <span>{project.projName}</span>
                                                    </motion.li>
                                                ))}
                                                {selectedCareer.projects.length > 2 && (
                                                    <li className="text-base text-ink-soft/70 pl-4">
                                                        외 {selectedCareer.projects.length - 3}개
                                                    </li>
                                                )}
                                            </ul>
                                        </motion.div>
                                    )}

                                    {/* contents 타입일 때 detailContents 표시 */}
                                    {selectedCareer.displayType === 'contents' && selectedCareer.detailContents && selectedCareer.detailContents.length > 0 && (
                                        <motion.div
                                            className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.15 }}
                                        >
                                            {highlights.map((group, idx) => (
                                                <motion.div
                                                    key={idx}
                                                    initial={{ opacity: 0, y: 12 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.2 + idx * 0.08, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                                                    className="relative overflow-hidden rounded-xl border border-line bg-[var(--bg-card)] p-4 shadow-[0_2px_14px_-6px_rgba(63,59,48,0.12)]"
                                                >
                                                    {/* 좌측 강조선 */}
                                                    <span className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[var(--taupe)]/60 to-[var(--sage)]/40" />

                                                    <div className="flex items-center justify-between gap-2">
                                                        <p className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-taupe">
                                                            <span className="h-1.5 w-1.5 rounded-full bg-[var(--taupe)]" />
                                                            Focus {String(idx + 1).padStart(2, '0')}
                                                        </p>
                                                        <span className="shrink-0 rounded-full border border-line bg-cream px-2 py-0.5 text-[10px] font-semibold text-ink-soft">
                                                            {group.outcome ? '성과 포함' : '진행'}
                                                        </span>
                                                    </div>

                                                    <h3 className="mt-2.5 text-[15px] font-semibold leading-snug text-ink">
                                                        {getHighlightTitle(group)}
                                                    </h3>

                                                    <div className="mt-3 h-px w-full bg-line" />

                                                    <div className="mt-3 flex flex-wrap items-center gap-1.5">
                                                        {group.implementation && (
                                                            <span className="rounded-full bg-[var(--bg)] px-2.5 py-0.5 text-[10px] font-medium text-ink-soft">
                                                                구현
                                                            </span>
                                                        )}
                                                        {group.outcome && (
                                                            <span className="rounded-full border border-[var(--sage)]/40 bg-[var(--sage)]/20 px-2.5 py-0.5 text-[10px] font-medium text-[var(--taupe)]">
                                                                성과 달성
                                                            </span>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </motion.div>
                                    )}

                                            </>
                                        );
                                    })()}
                                </motion.div>
                            )}
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    )
}
