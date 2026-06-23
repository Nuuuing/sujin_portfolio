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

// ===== contents 타입 경력의 detailContents 파싱 (CareerSection과 동일 규칙) =====
interface HighlightGroup {
    title?: string;
    challenge?: string;
    implementation?: string;
    outcome?: string;
}

const parseLabeledLine = (text: string) => {
    const match = text.match(/^(문제|해결|설계\/구현|결과|결과\/역량):\s*(.*)$/);
    if (!match) return null;

    const label = match[1];
    const field: keyof HighlightGroup =
        label === '문제' ? 'challenge' :
            label === '해결' || label === '설계/구현' ? 'implementation' :
                'outcome';

    return { field, text: match[2] };
};

const getCareerHighlights = (career: CareerT): HighlightGroup[] => {
    const groups: HighlightGroup[] = [];

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

const getHighlightTitle = (group: HighlightGroup) => {
    if (group.title?.trim()) return group.title.trim();

    const text = `${group.challenge || ''} ${group.implementation || ''} ${group.outcome || ''}`;

    if (text.includes('MSSQL') || text.includes('ERP') || text.includes('거래 데이터')) return '데이터 처리 및 연동 안정화';
    if (text.includes('현업') || text.includes('요구사항') || text.includes('업무 시스템')) return '업무 시스템 운영 개선';
    if (text.includes('OpenAPI')) return '외부 연계 기반 구축';
    if (text.includes('ReactQuery')) return '화면 응답성과 데이터 흐름 개선';
    return '운영 개선';
};

// 지표 개수에 맞춰 데스크탑 열 수를 정해 빈 칸 없이 정렬
const metricsColsClass = (count: number): string => {
    if (count === 1) return 'sm:grid-cols-1';
    if (count === 3) return 'sm:grid-cols-3';
    if (count % 4 === 0 || count > 4) return 'sm:grid-cols-4';
    if (count % 3 === 0) return 'sm:grid-cols-3';
    return 'sm:grid-cols-2';
};

const getCompactText = (text?: string) => {
    if (!text) return '';
    return text
        .replace(/^(문제|해결|설계\/구현|결과|결과\/역량):\s*/, '')
        .replace(/\s+/g, ' ')
        .trim();
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
    const highlights = getCareerHighlights(career);
    // 지표를 일반(상단) / Focus 귀속(카드 하위)으로 분리
    const generalMetrics = career.metrics?.filter(m => !m.group) ?? [];
    const metricsForGroup = (group: HighlightGroup) =>
        career.metrics?.filter(m => m.group && m.group === getHighlightTitle(group)) ?? [];

    return (
        <div>
            {/* 헤더 영역 */}
            <div className="mb-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ink mb-3">
                        {career.company}
                    </h1>
                    <p className="text-base sm:text-lg text-ink-soft mb-4">
                        {career.position}{career.team && ` / ${career.team}팀`}
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[var(--taupe)]/10 border border-[var(--taupe)]/30 text-[var(--taupe)] text-sm font-semibold">
                            {formatTerm(career.startTerm)} - {career.endTerm ? formatTerm(career.endTerm) : '현재'}
                        </span>
                        {career.description && (
                            <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-line bg-cream text-ink-soft text-sm font-medium">
                                {career.description}
                            </span>
                        )}
                    </div>
                    {career.contents && (
                        <p className="mt-5 max-w-3xl text-[15px] leading-7 text-ink-soft sm:text-base">
                            {parseContent(career.contents)}
                        </p>
                    )}
                </motion.div>
            </div>

            {/* 통계(지표) — 그룹(Focus 귀속) 없는 일반 지표만 상단에 표시 */}
            {generalMetrics.length > 0 && (
                <motion.div
                    className={`mb-10 grid grid-cols-2 gap-3 sm:gap-4 ${metricsColsClass(generalMetrics.length)}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    {generalMetrics.map((metric, idx) => (
                        <div
                            key={'m-' + idx}
                            className="rounded-2xl border border-line bg-[var(--bg-card)] p-5 text-center shadow-[0_2px_14px_-6px_rgba(63,59,48,0.12)]"
                        >
                            <p className="text-3xl font-bold text-[var(--taupe)] sm:text-4xl">{metric.value}</p>
                            <p className="mt-2 text-sm font-medium text-ink">{metric.label}</p>
                            {metric.caption && (
                                <p className="mt-1 text-xs text-ink-soft/70">{metric.caption}</p>
                            )}
                        </div>
                    ))}
                </motion.div>
            )}

            {/* Projects */}
            {projectCount > 0 && (
                <>
                    <motion.div
                        className="flex items-center gap-3 mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <span className="w-8 h-1 bg-[var(--taupe)] rounded-full"></span>
                        <h2 className="text-2xl sm:text-3xl font-bold text-ink">Projects</h2>
                        <span className="text-[var(--taupe)] font-semibold">({projectCount})</span>
                    </motion.div>

                    {isLoading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="w-8 h-8 border-2 border-[var(--taupe)] border-t-transparent rounded-full animate-spin" />
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
                </>
            )}

            {/* 주요 활동 (contents 타입 경력) */}
            {highlights.length > 0 && (
                <>
                    <motion.div
                        className="flex items-center gap-3 mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <span className="w-8 h-1 bg-[var(--taupe)] rounded-full"></span>
                        <h2 className="text-2xl sm:text-3xl font-bold text-ink">주요 활동</h2>
                        <span className="text-[var(--taupe)] font-semibold">({highlights.length})</span>
                    </motion.div>

                    <div className="grid gap-5 sm:grid-cols-2">
                        {highlights.map((group, idx) => (
                            <motion.div
                                key={'h-' + idx}
                                className="rounded-2xl border border-line bg-[var(--bg-card)] p-6 shadow-[0_2px_14px_-6px_rgba(63,59,48,0.12)]"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.1 + idx * 0.05 }}
                            >
                                <div className="mb-5 flex items-start justify-between gap-3">
                                    <div>
                                        <p className="mb-1 text-xs font-semibold text-taupe">
                                            Focus {String(idx + 1).padStart(2, '0')}
                                        </p>
                                        <h3 className="text-xl font-semibold text-ink">
                                            {getHighlightTitle(group)}
                                        </h3>
                                    </div>
                                    <span className="shrink-0 rounded-full border border-line bg-cream px-2.5 py-1 text-[11px] font-semibold text-ink-soft">
                                        {group.outcome ? '성과 포함' : '진행'}
                                    </span>
                                </div>

                                <div className="relative pl-[30px]">
                                    {group.challenge && (
                                        <div className="relative pb-5 last:pb-0 [&:not(:last-child)]:before:absolute [&:not(:last-child)]:before:left-[-20px] [&:not(:last-child)]:before:top-[24px] [&:not(:last-child)]:before:bottom-0 [&:not(:last-child)]:before:w-0.5 [&:not(:last-child)]:before:bg-[var(--line)] [&:not(:last-child)]:before:content-['']">
                                            <span className="absolute left-[-30px] top-0 flex h-[22px] w-[22px] items-center justify-center rounded-full bg-[#9c9684] text-[11px] font-extrabold text-white">1</span>
                                            <p className="mb-1.5 text-[12px] font-extrabold tracking-wide text-ink-soft">과제</p>
                                            <p className="text-[14.5px] leading-[1.7] text-ink">
                                                {parseContent(getCompactText(group.challenge))}
                                            </p>
                                        </div>
                                    )}
                                    {group.implementation && (
                                        <div className="relative pb-5 last:pb-0 [&:not(:last-child)]:before:absolute [&:not(:last-child)]:before:left-[-20px] [&:not(:last-child)]:before:top-[24px] [&:not(:last-child)]:before:bottom-0 [&:not(:last-child)]:before:w-0.5 [&:not(:last-child)]:before:bg-[var(--line)] [&:not(:last-child)]:before:content-['']">
                                            <span className="absolute left-[-30px] top-0 flex h-[22px] w-[22px] items-center justify-center rounded-full bg-[var(--taupe)] text-[11px] font-extrabold text-white">2</span>
                                            <p className="mb-1.5 text-[12px] font-extrabold tracking-wide text-[#6e6648]">구현</p>
                                            <p className="text-[14.5px] leading-[1.7] text-ink">
                                                {parseContent(getCompactText(group.implementation))}
                                            </p>
                                        </div>
                                    )}
                                    {group.outcome && (
                                        <div className="relative pb-5 last:pb-0 [&:not(:last-child)]:before:absolute [&:not(:last-child)]:before:left-[-20px] [&:not(:last-child)]:before:top-[24px] [&:not(:last-child)]:before:bottom-0 [&:not(:last-child)]:before:w-0.5 [&:not(:last-child)]:before:bg-[var(--line)] [&:not(:last-child)]:before:content-['']">
                                            <span className="absolute left-[-30px] top-0 flex h-[22px] w-[22px] items-center justify-center rounded-full bg-[#9aa861] text-[11px] font-extrabold text-white">3</span>
                                            <p className="mb-1.5 text-[12px] font-extrabold tracking-wide text-[#566324]">성과</p>
                                            <p className="text-[14.5px] leading-[1.7] text-ink">
                                                {parseContent(getCompactText(group.outcome))}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* 이 Focus에 귀속된 통계 지표 */}
                                {metricsForGroup(group).length > 0 && (
                                    <div className="mt-4 grid grid-cols-3 gap-2">
                                        {metricsForGroup(group).map((m, mi) => (
                                            <div key={'gm-' + mi} className="rounded-xl border border-line bg-cream/70 px-2 py-3 text-center">
                                                <p className="text-lg font-bold leading-none text-[var(--taupe)] sm:text-xl">{m.value}</p>
                                                <p className="mt-1.5 text-[11px] font-medium leading-tight text-ink">{m.label}</p>
                                                {m.caption && (
                                                    <p className="mt-0.5 text-[10px] leading-tight text-ink-soft/70">{m.caption}</p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

interface CareerDetailItemProps {
    data: CareerProjectT;
    allSkills: skillStackT[];
}

const briefMeta: Record<string, { title: string; className: string }> = {
    '문제': { title: '과제', className: 'border-line-strong' },
    '해결': { title: '구현', className: 'border-[var(--taupe)]/40' },
    '설계/구현': { title: '구현', className: 'border-[var(--taupe)]/40' },
    '결과': { title: '성과', className: 'border-[var(--sage)]/45' },
    '결과/역량': { title: '성과', className: 'border-[var(--sage)]/45' },
};

// 브리프 단계별 색 코딩 (부드러운 틴트 + 컬러 라벨)
const briefStyle: Record<string, { box: string; lab: string; body: string }> = {
    '과제': { box: 'bg-[rgba(63,59,48,0.05)]', lab: 'text-ink-soft', body: 'text-ink-soft' },
    '구현': { box: 'bg-[rgba(138,130,102,0.10)]', lab: 'text-[#6e6648]', body: 'text-ink' },
    '성과': { box: 'bg-[rgba(150,160,95,0.16)]', lab: 'text-[#566324]', body: 'text-ink' },
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
        <div className="overflow-hidden rounded-2xl border border-line bg-[var(--bg-card)] shadow-sm transition-colors hover:border-[var(--taupe)]/25 lg:grid lg:grid-cols-[240px_1fr]">
            {/* 좌측 메타 사이드바 */}
            <div className="border-b border-line bg-[rgba(138,130,102,0.07)] p-5 sm:p-6 lg:border-b-0 lg:border-r">
                <h3 className="text-lg font-semibold leading-snug text-ink">
                    {data.projName}
                </h3>
                <p className="mt-1.5 text-sm text-ink-soft">
                    {data.startDate} - {data.endDate || 'Present'}
                    {data.duration && ` (${data.duration})`}
                </p>
                {data.role && (
                    <div className="mt-3">
                        <span className="inline-flex w-fit items-center rounded-md border border-[var(--taupe)]/20 bg-[var(--taupe)]/10 px-3 py-1 text-xs font-semibold text-[var(--taupe)]">
                            {data.role}
                        </span>
                    </div>
                )}
                {skillsList.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                        {skillsList.map((skill, index) => (
                            <span
                                className="flex items-center gap-1 rounded-full border border-[var(--taupe)]/20 bg-[var(--taupe)]/10 px-2.5 py-1 text-[10px] font-medium text-[var(--taupe)]"
                                key={'sk-' + index}
                            >
                                <SkillIcon skillName={skill.name} size={12} />
                                {skill.name}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* 우측 콘텐츠 */}
            <div className="p-5 sm:p-6">
                {brief.length > 0 ? (
                    <div className="mb-5 grid gap-2.5 sm:grid-cols-3">
                        {brief.map((item, idx) => {
                            const meta = briefMeta[item.label] || briefMeta['문제'];
                            const st = briefStyle[meta.title] || briefStyle['과제'];

                            return (
                                <div key={`${item.label}-${idx}`} className={`rounded-xl p-4 ${st.box}`}>
                                    <span className={`mb-2 block text-[11px] font-extrabold tracking-wide ${st.lab}`}>
                                        {meta.title}
                                    </span>
                                    <div className={`text-[13.5px] leading-[1.62] ${st.body}`}>
                                        {parseContent(item.text)}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : data.description && (
                    <div className="mb-5 text-[14.5px] leading-7 text-ink-soft">
                        {parseContent(data.description)}
                    </div>
                )}

                <div className="grid gap-5 sm:grid-cols-2">
                    {/* 담당 내용 — 번호 배지 + 흐린 구분선 */}
                    {data.tasks && data.tasks.length > 0 && (
                        <section>
                            <h4 className="mb-2 text-sm font-bold text-ink">담당 범위</h4>
                            <ul>
                                {data.tasks.map((item, idx) => (
                                    <li key={idx} className="grid grid-cols-[24px_1fr] items-start gap-3 py-2.5 [&:not(:first-child)]:border-t [&:not(:first-child)]:border-[rgba(63,59,48,0.08)]">
                                        <span className="flex h-[22px] w-[22px] items-center justify-center rounded-md bg-[rgba(138,130,102,0.16)] text-[11px] font-extrabold text-[#6e6648]">
                                            {String(idx + 1).padStart(2, '0')}
                                        </span>
                                        <span className="text-[14px] leading-[1.55] text-ink-soft">{parseContent(item)}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* 성과 — 세이지 행 */}
                    {data.achievements && data.achievements.length > 0 && (
                        <section>
                            <h4 className="mb-2 text-sm font-bold text-ink">주요 성과</h4>
                            <ul className="space-y-2">
                                {data.achievements.map((res, idx) => (
                                    <li key={idx} className="rounded-lg bg-[var(--sage)]/22 px-3 py-2.5 text-[14px] leading-[1.55] text-ink">
                                        {parseContent(res)}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};
