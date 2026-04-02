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

    return (
        <div className="bg-white dark:bg-[#1c1c1c] rounded-2xl p-6 border border-gray-200 dark:border-gray-800 hover:border-[#72AAFF]/30 transition-colors">
            {/* 상단 헤더 */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{data.projName}</h3>
                    {data.description && (
                        <p className="text-base text-gray-600 dark:text-gray-300 mb-2">{parseContent(data.description)}</p>
                    )}
                    <p className="text-base text-gray-500 dark:text-gray-400">
                        {data.startDate} - {data.endDate || 'Present'}
                        {data.duration && ` (${data.duration})`}
                    </p>
                </div>
                {data.role && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-semibold shrink-0">
                        {data.role}
                    </span>
                )}
            </div>

            {/* 담당 내용 */}
            {data.tasks && data.tasks.length > 0 && (
                <div className="mb-4">
                    <h4 className="text-base font-semibold text-[#72AAFF] mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#72AAFF]"></span>
                        담당 업무
                    </h4>
                    <ul className="space-y-2 pl-4">
                        {data.tasks.map((item, idx) => (
                            <li key={idx} className="text-gray-600 dark:text-gray-300 text-base flex items-start gap-2">
                                <span className="text-gray-400 dark:text-gray-500 mt-1">•</span>
                                <span>{parseContent(item)}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* 성과 */}
            {data.achievements && data.achievements.length > 0 && (
                <div className="mb-4">
                    <h4 className="text-base font-semibold text-green-400 mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-400"></span>
                        성과
                    </h4>
                    <ul className="space-y-2 pl-4">
                        {data.achievements.map((res, idx) => (
                            <li key={idx} className="text-gray-600 dark:text-gray-300 text-base flex items-start gap-2">
                                <span className="text-green-500 mt-1">✓</span>
                                <span>{parseContent(res)}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* 기술 스택 */}
            {skillsList.length > 0 && (
                <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
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
