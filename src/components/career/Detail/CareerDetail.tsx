'use client';

import { CareerT, CareerProjectT, skillStackT } from "@/features";
import { getSkills, parseContent } from "@/utils";
import {
    careerMonths,
    formatDuration,
    formatTerm,
    getFocusGroups,
    getFocusTitle,
    getMetricsForFocus,
    getUngroupedMetrics,
    type FocusGroup,
} from "@/utils/career";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { SkillIcon } from "@/components";
import { FocusBody } from "@/components/common";

const CARD_COLORS = ['c-sky', 'c-lime', 'c-yellow', 'c-pink', 'c-mint'];

/* ── 섹션 머리 ───────────────────────────────── */
const Head = ({ title, script, meta, color = 'c-sky' }: {
    title: string; script: string; meta?: string; color?: string;
}) => (
    <div className={`${color} mb-5 mt-14 flex flex-wrap items-end justify-between gap-x-5 gap-y-2 first:mt-0`}>
        <h2 className="flex flex-wrap items-baseline gap-x-3 text-[1.6rem] font-bold leading-tight tracking-[-0.025em] text-ink sm:text-[2rem]">
            {title}
            <span className="script text-[1.45em] text-ac">{script}</span>
        </h2>
        {meta && <p className="tnum pb-1 text-[0.92rem] text-ink-mute">{meta}</p>}
    </div>
);

/* ── Focus 한 묶음 (상세는 전부 펼친 상태) ───── */
const FocusBlock = ({ career, group, index }: { career: CareerT; group: FocusGroup; index: number }) => {
    const title = getFocusTitle(group);
    const metrics = getMetricsForFocus(career, title);

    return (
        <div className={`${CARD_COLORS[index % CARD_COLORS.length]} card accent-top pt-7 sm:pt-8`}>
            <div className="mb-5 flex items-center gap-3.5">
                <span className="fig flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ac-soft text-[1rem] text-ac">
                    {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="flex-1 text-[1.2rem] font-bold leading-snug tracking-[-0.025em] text-ink sm:text-[1.35rem]">
                    {title}
                </h3>
            </div>

            <FocusBody group={group} metrics={metrics} />
        </div>
    );
};

/* ── 회사 프로젝트 한 건 ─────────────────────── */
const CareerProjectBlock = ({ data, allSkills, index }: {
    data: CareerProjectT; allSkills: skillStackT[]; index: number;
}) => {
    const skillsList = (data.skills ?? [])
        .map((k) => allSkills.find((s) => s.key === Number(k)))
        .filter((s): s is skillStackT => s !== undefined);

    const brief = (data.description ?? '')
        .replace(/\\n/g, '\n')
        .replace(/\s+(설계\/구현|결과\/역량|해결|결과):/g, '\n$1:')
        .split('\n')
        .map((l) => l.trim())
        .filter(Boolean)
        .map((line) => {
            const m = line.match(/^(문제|해결|설계\/구현|결과|결과\/역량):\s*(.*)$/);
            return m ? { label: m[1], text: m[2] } : null;
        })
        .filter((x): x is { label: string; text: string } => Boolean(x));

    const briefGroup = {
        challenge: brief.find((b) => b.label === '문제')?.text,
        implementation: brief.find((b) => b.label === '해결' || b.label === '설계/구현')?.text,
        outcome: brief.find((b) => b.label === '결과' || b.label === '결과/역량')?.text,
    };
    const hasBrief = Boolean(briefGroup.challenge || briefGroup.implementation || briefGroup.outcome);

    return (
        <div className={`${CARD_COLORS[index % CARD_COLORS.length]} card accent-top pt-7 sm:pt-8`}>
            {/* 메타 */}
            <div className="mb-5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1.5">
                    <h3 className="text-[1.2rem] font-bold leading-snug tracking-[-0.025em] text-ink sm:text-[1.35rem]">
                        {data.projName}
                    </h3>
                    <span className="tnum shrink-0 text-[0.9rem] text-ink-mute">
                        {data.startDate} — {data.endDate || '진행 중'}
                        {data.duration && ` · ${data.duration}`}
                    </span>
                </div>
                {data.role && <p className="mt-1.5 text-[0.98rem] text-ink-soft">{data.role}</p>}
                {skillsList.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                        {skillsList.map((skill, i) => (
                            <span key={`sk-${i}`} className="tag tag-line gap-1.5">
                                <SkillIcon skillName={skill.name} size={13} />
                                {skill.name}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {hasBrief ? (
                <FocusBody group={briefGroup} />
            ) : data.description && (
                <p className="text-[0.97rem] leading-[1.85] text-ink-soft">
                    {parseContent(data.description)}
                </p>
            )}

            {/* 담당 범위 / 주요 성과 */}
            {((data.tasks?.length ?? 0) > 0 || (data.achievements?.length ?? 0) > 0) && (
                <div className="mt-3 grid gap-3 lg:grid-cols-2">
                    {(data.tasks?.length ?? 0) > 0 && (
                        <section className="rounded-[var(--r-lg)] bg-page px-5 py-4">
                            <span className="card-label mb-3">담당 범위</span>
                            <ul className="space-y-2.5">
                                {data.tasks!.map((item, idx) => (
                                    <li key={idx} className="grid grid-cols-[1.6rem_1fr] items-baseline gap-2">
                                        <span className="tnum text-[0.8rem] font-semibold text-ink-faint">
                                            {String(idx + 1).padStart(2, '0')}
                                        </span>
                                        <span className="text-[0.93rem] leading-[1.75] text-ink-soft">
                                            {parseContent(item)}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {(data.achievements?.length ?? 0) > 0 && (
                        <section className="rounded-[var(--r-lg)] bg-ac-soft px-5 py-4">
                            <span className="card-label text-ac mb-3">주요 성과</span>
                            <ul className="space-y-2.5">
                                {data.achievements!.map((res, idx) => (
                                    <li key={idx} className="grid grid-cols-[0.6rem_1fr] items-baseline gap-2.5">
                                        <i className="mt-1.5 block h-1.5 w-1.5 rounded-full bg-ac" aria-hidden />
                                        <span className="text-[0.93rem] leading-[1.75] text-ink">
                                            {parseContent(res)}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                </div>
            )}
        </div>
    );
};

/* ── 상세 본문 ───────────────────────────────── */
interface CareerDetailProps {
    career: CareerT;
}

export const CareerDetail = ({ career }: CareerDetailProps) => {
    const [skills, setSkills] = useState<skillStackT[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getSkills().then((data) => {
            setSkills(data);
            setIsLoading(false);
        });
    }, []);

    const focusGroups = getFocusGroups(career);
    const generalMetrics = getUngroupedMetrics(career);
    const projects = career.projects ?? [];
    const months = careerMonths(career);
    const isCurrent = !career.endTerm;

    return (
        <div>
            {/* ── 머리 카드 ──────────────────────── */}
            <motion.header
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="c-sky card"
            >
                <div className="flex flex-wrap items-center gap-2">
                    <span className="tag">{isCurrent ? '재직 중' : '이전 경력'}</span>
                    <span className="tnum text-[0.92rem] text-ink-mute">
                        {formatTerm(career.startTerm)} — {isCurrent ? '현재' : formatTerm(career.endTerm)}
                        {months > 0 && ` · ${formatDuration(months)}`}
                    </span>
                </div>

                <h1 className="mt-3 text-[2rem] font-bold leading-tight tracking-[-0.03em] text-ink sm:text-[2.6rem]">
                    {career.company}
                </h1>
                <p className="mt-1.5 text-[1.05rem] text-ink-soft">
                    {career.team && `${career.team} · `}{career.position}
                </p>

                {career.description && (
                    <p className="mt-4 max-w-[40em] text-[1rem] leading-[1.8] text-ink-soft">
                        {career.description}
                    </p>
                )}

                {career.contents && (
                    <p className="mt-5 rounded-[var(--r-lg)] bg-page p-5 text-[0.98rem] leading-[1.9] text-ink-soft sm:p-6">
                        {parseContent(career.contents)}
                    </p>
                )}
            </motion.header>

            {/* ── 경력 전체 지표 ─────────────────── */}
            {generalMetrics.length > 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.45, delay: 0.1 }}
                    className="mt-4 grid gap-3 sm:grid-cols-3"
                >
                    {generalMetrics.map((m, i) => (
                        <div key={`${m.label}-${i}`} className={`${CARD_COLORS[i % CARD_COLORS.length]} card text-center`}>
                            <span className="fig block text-[2.4rem] leading-none text-ac">{m.value}</span>
                            <span className="mt-2.5 block text-[0.98rem] font-semibold text-ink">{m.label}</span>
                            {m.caption && (
                                <span className="mt-1 block text-[0.86rem] leading-snug text-ink-mute">{m.caption}</span>
                            )}
                        </div>
                    ))}
                </motion.div>
            )}

            {/* ── 주요 활동 (contents형) ─────────── */}
            {focusGroups.length > 0 && (
                <>
                    <Head title="주요 업무" script="focus" color="c-lime" meta={`${focusGroups.length}건`} />
                    <div className="space-y-4">
                        {focusGroups.map((group, idx) => (
                            <motion.div
                                key={`focus-${idx}`}
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.1 }}
                                transition={{ duration: 0.4 }}
                            >
                                <FocusBlock career={career} group={group} index={idx} />
                            </motion.div>
                        ))}
                    </div>
                </>
            )}

            {/* ── 프로젝트 (project형) ───────────── */}
            {projects.length > 0 && (
                <>
                    <Head title="참여 프로젝트" script="projects" color="c-pink" meta={`${projects.length}건`} />
                    {isLoading ? (
                        <div className="card py-12 text-center text-[0.95rem] text-ink-mute">불러오는 중...</div>
                    ) : (
                        <div className="space-y-4">
                            {projects
                                .slice()
                                .sort((a, b) => (b.startDate || '').localeCompare(a.startDate || ''))
                                .map((project, index) => (
                                    <motion.div
                                        key={`proj-${index}`}
                                        initial={{ opacity: 0, y: 12 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.1 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <CareerProjectBlock data={project} allSkills={skills} index={index} />
                                    </motion.div>
                                ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};
