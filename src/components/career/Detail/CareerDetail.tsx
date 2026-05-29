'use client';

import { CareerT, CareerProjectT, skillStackT } from "@/features";
import { getSkills, parseContent } from "@/utils";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { SkillIcon } from "@/components";

// YYYYMM 형식을 YYYY.MM으로 변환
const formatTerm = (term: string | undefined): string => {
    if (!term) return '';
    if (term.length === 6) {
        return `${term.slice(0, 4)}.${term.slice(4, 6)}`;
    }
    return term;
};

interface CareerDetailProps {
    career: CareerT;
}

export const CareerDetail = ({ career }: CareerDetailProps) => {
    const [skills, setSkills] = useState<skillStackT[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            // skills 가져오기 (utils에서 캐싱 처리됨)
            const skillsData = await getSkills();
            setSkills(skillsData);

            setIsLoading(false);
        };
        fetchData();
    }, []);

    const projectCount = career.projects?.length ?? 0;

    return (
        <div>
            {/* 헤더 영역 */}
            <div className="mb-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3">
                        {career.company}
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 mb-4">
                        {career.position}{career.team && ` / ${career.team}팀`}
                    </p>
                    <div className="flex items-center gap-3">
                        <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#72AAFF]/10 border border-[#72AAFF]/30 text-[#72AAFF] text-sm font-semibold">
                            {formatTerm(career.startTerm)} - {career.endTerm ? formatTerm(career.endTerm) : '현재'}
                        </span>
                    </div>
                </motion.div>
            </div>

            {/* Projects */}
            {projectCount > 0 && (
                <motion.div
                    className="flex items-center gap-3 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <span className="w-8 h-1 bg-[#72AAFF] rounded-full"></span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Projects</h2>
                    <span className="text-[#72AAFF] font-semibold">({projectCount})</span>
                </motion.div>
            )}

            {isLoading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="w-8 h-8 border-2 border-[#72AAFF] border-t-transparent rounded-full animate-spin" />
                </div>
            ) : (
                <div className="space-y-6">
                    {career.projects?.map((project: CareerProjectT, index) => (
                        <motion.div
                            key={'c-' + index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                        >
                            <CareerDetailItem data={project} allSkills={skills} />
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

interface CareerDetailItemProps {
    data: CareerProjectT;
    allSkills: skillStackT[];
}

const briefMeta: Record<string, { title: string; className: string }> = {
    '문제': { title: '과제', className: 'border-gray-300 dark:border-white/15' },
    '해결': { title: '구현', className: 'border-[#72AAFF]/45' },
    '설계/구현': { title: '구현', className: 'border-[#72AAFF]/45' },
    '결과': { title: '성과', className: 'border-amber-400/50' },
    '결과/역량': { title: '성과', className: 'border-amber-400/50' },
};

const getProjectBrief = (description?: string) => {
    if (!description) return [];

    return description
        .replace(/\\n/g, '\n')
        .replace(/\s+(설계\/구현|결과\/역량|해결|결과):/g, '\n$1:')
        .split('\n')
        .map(line => line.trim())
        .filter(Boolean)
        .map(line => {
            const match = line.match(/^(문제|해결|설계\/구현|결과|결과\/역량):\s*(.*)$/);
            if (!match) return null;

            return {
                label: match[1],
                text: match[2],
            };
        })
        .filter((item): item is { label: string; text: string } => Boolean(item));
};

const CareerDetailItem = ({ data, allSkills }: CareerDetailItemProps) => {
    // skills는 항상 number 배열 (key)
    const skillsList = data.skills && Array.isArray(data.skills)
        ? data.skills
            .map((skillKey) => {
                const key = typeof skillKey === 'number' ? skillKey : Number(skillKey);
                return allSkills.find(s => s.key === key);
            })
            .filter((skill): skill is skillStackT => skill !== undefined)
        : [];
    const brief = getProjectBrief(data.description);

    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-colors hover:border-[#72AAFF]/30 dark:border-white/10 dark:bg-[#151515]">
            {/* 상단 헤더 */}
            <div className="border-b border-gray-100 p-5 dark:border-white/10 sm:p-6">
                <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                        <h3 className="mb-2 text-xl font-semibold leading-tight text-gray-900 dark:text-white sm:text-2xl">
                            {data.projName}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {data.startDate} - {data.endDate || 'Present'}
                            {data.duration && ` (${data.duration})`}
                        </p>
                    </div>
                    {data.role && (
                        <span className="inline-flex w-fit shrink-0 items-center rounded-md border border-[#72AAFF]/20 bg-[#72AAFF]/10 px-3 py-1 text-xs font-semibold text-[#72AAFF]">
                            {data.role}
                        </span>
                    )}
                </div>

                {brief.length > 0 ? (
                    <div className="grid gap-3 lg:grid-cols-3">
                        {brief.map((item, idx) => {
                            const meta = briefMeta[item.label] || briefMeta['문제'];

                            return (
                                <div
                                    key={`${item.label}-${idx}`}
                                    className={`rounded-xl border-l-2 bg-gray-50/80 p-4 dark:bg-white/[0.035] ${meta.className}`}
                                >
                                    <p className="mb-2 text-xs font-semibold text-gray-500 dark:text-gray-500">
                                        {meta.title}
                                    </p>
                                    <div className="line-clamp-3 text-[15px] leading-7 text-gray-600 dark:text-gray-300">
                                        {parseContent(item.text)}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : data.description && (
                    <div className="text-[15px] leading-7 text-gray-600 dark:text-gray-300">
                        {parseContent(data.description)}
                    </div>
                )}
            </div>

            <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-2">
                {/* 담당 내용 */}
                {data.tasks && data.tasks.length > 0 && (
                    <section>
                        <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#72AAFF]"></span>
                            담당 범위
                        </h4>
                        <ul className="space-y-2.5">
                            {data.tasks.map((item, idx) => (
                                <li key={idx} className="rounded-lg bg-gray-50 px-3 py-2.5 text-[15px] leading-7 text-gray-600 dark:bg-white/[0.035] dark:text-gray-300">
                                    {parseContent(item)}
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* 성과 */}
                {data.achievements && data.achievements.length > 0 && (
                    <section>
                        <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-400"></span>
                            주요 성과
                        </h4>
                        <ul className="space-y-2.5">
                            {data.achievements.map((res, idx) => (
                                <li key={idx} className="rounded-lg bg-amber-400/10 px-3 py-2.5 text-[15px] leading-7 text-gray-700 dark:text-gray-200">
                                    {parseContent(res)}
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
            </div>

            {/* 기술 스택 */}
            {skillsList.length > 0 && (
                <div className="border-t border-gray-200 px-5 py-4 dark:border-white/10 sm:px-6">
                    <div className="flex flex-wrap gap-2">
                        {skillsList.map((skill, index) => (
                            <span
                                className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-[#72AAFF]/10 text-[#72AAFF] border border-[#72AAFF]/20 flex items-center gap-1"
                                key={'sk-' + index}
                            >
                                <SkillIcon skillName={skill.name} size={12} />
                                {skill.name}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
