'use client';

import { projDetailT, ProjPtc } from "@/features";
import { getProjectDetails } from "@/utils";
import { projectDuration } from "@/utils/career";
import { motion } from "motion/react";
import Link from "next/link";
import { useState, useEffect } from 'react';
import { SectionHead } from "@/components/common";

/** 한 줄 요약. projDesc가 없으면 첫 성과를 쓴다 */
const summarize = (project: projDetailT): string => {
    if (project.projDesc?.trim()) return project.projDesc.trim();
    const first = project.achievements?.[0];
    if (first) return first.replace(/\*\*/g, '');
    return project.projDescDetail?.split('.')[0]?.trim() ?? '';
};

export const ProjSection = () => {
    const [allProjects, setAllProjects] = useState<projDetailT[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await getProjectDetails();
                const sorted = [...data].sort((a, b) => {
                    const dateA = a.endDate ? new Date(a.endDate).getTime() : Date.now();
                    const dateB = b.endDate ? new Date(b.endDate).getTime() : Date.now();
                    return dateB - dateA;
                });
                setAllProjects(sorted);
            } catch (error) {
                console.error('Error fetching projects:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const highlighted = allProjects.filter((p) => p.mainviewyn === true);
    const soloCount = allProjects.filter((p) => p.projPtc === ProjPtc.SOLO).length;
    const teamCount = allProjects.length - soloCount;

    return (
        <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full"
        >
            <SectionHead
                title="프로젝트"
                script="works"
                color="c-lime"
                meta={allProjects.length > 0 ? `개인 ${soloCount} · 팀 ${teamCount}` : undefined}
                action={allProjects.length > highlighted.length
                    ? <Link href="/project" scroll className="pill pill-soft c-lime">전체 보기 ↗</Link>
                    : undefined}
            />

            {isLoading ? (
                <p className="rule py-6 text-center text-xs text-ink-mute">로딩 중...</p>
            ) : (
                <table className="dtable">
                    <colgroup>
                        <col style={{ width: '26%' }} />
                        <col style={{ width: '19%' }} />
                        <col />
                        <col style={{ width: '23%' }} />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>프로젝트</th>
                            <th>기간</th>
                            <th>내용</th>
                            <th>스택</th>
                        </tr>
                    </thead>
                    <tbody>
                        {highlighted.map((project) => (
                            <tr key={project.key} className="is-interactive">
                                <td data-l="프로젝트">
                                    <Link href={`/project/detail/${project.key}`} className="block">
                                        <span className="block text-[1.25rem] font-bold tracking-[-0.025em] text-ink">
                                            {project.projName}
                                        </span>
                                        <span className="mt-1 block text-[0.9rem] text-ink-mute">
                                            {project.projPtc === ProjPtc.SOLO ? '개인' : '팀'}
                                            {project.role && ` · ${project.role}`}
                                        </span>
                                    </Link>
                                </td>
                                <td data-l="기간" className="tnum">
                                    <span className="block text-[0.95rem] font-semibold text-ink">
                                        {project.startDate} — {project.endDate || '진행 중'}
                                    </span>
                                    <span className="mt-0.5 block text-[0.86rem] text-ink-mute">
                                        {projectDuration(project.startDate, project.endDate)}
                                    </span>
                                </td>
                                <td data-l="내용" className="text-[0.95rem] leading-[1.75] text-ink-soft">
                                    {summarize(project)}
                                </td>
                                <td data-l="스택" className="text-[0.88rem] leading-[1.7] text-ink-mute">
                                    {project.projSkills?.map((s) => s.name).join(', ')}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}


        </motion.section>
    );
};
