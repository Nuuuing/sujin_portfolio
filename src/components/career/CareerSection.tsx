'use client';

import { CareerT } from "@/features";
import { getCareers, parseContent } from "@/utils";
import {
    careerMonths,
    formatDuration,
    formatTerm,
    getCareerStack,
    getCareerStats,
    getFocusGroups,
    getFocusTitle,
} from "@/utils/career";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { SectionHead } from "@/components/common";

const CARD_COLORS = ['c-sky', 'c-lime', 'c-yellow', 'c-pink', 'c-mint'];

const hasDetail = (career: CareerT) =>
    (career.displayType === 'project' && (career.projects?.length ?? 0) > 0)
    || (career.detailContents?.length ?? 0) > 0;

/**
 * 경력 한 건.
 *
 * 상세 페이지가 있으면 목록에서 펼치지 않고 바로 상세로 보낸다.
 * 같은 내용을 목록과 상세 두 곳에서 보여주면 어느 쪽이 본문인지 흐려진다.
 * 상세가 없는 경력만 요약을 카드 안에서 보여준다.
 */
interface CareerCardProps {
    career: CareerT;
    index: number;
}

const CareerCard = ({ career, index }: CareerCardProps) => {
    const months = careerMonths(career);
    const focusGroups = getFocusGroups(career);
    const projects = career.projects ?? [];
    const stack = getCareerStack(career);
    const color = CARD_COLORS[index % CARD_COLORS.length];
    const isCurrent = !career.endTerm;
    const linked = hasDetail(career);

    // 상세에 무엇이 들어 있는지 미리 알려 준다
    const preview = focusGroups.length > 0
        ? focusGroups.map(getFocusTitle)
        : projects.map((p) => p.projName);
    const previewLabel = focusGroups.length > 0 ? '주요 업무' : '참여 프로젝트';

    const body = (
        <>
            <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-4">
                <div className="min-w-0">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                        <span className="tag">{isCurrent ? '재직 중' : '이전 경력'}</span>
                        <span className="tnum text-[0.9rem] text-ink-mute">
                            {formatTerm(career.startTerm)} — {isCurrent ? '현재' : formatTerm(career.endTerm)}
                            {months > 0 && ` · ${formatDuration(months)}`}
                        </span>
                    </div>

                    <h3 className="text-[1.75rem] font-bold leading-tight tracking-[-0.035em] text-ink sm:text-[2.1rem]">
                        {career.company}
                    </h3>
                    <p className="mt-1 text-[1rem] text-ink-soft">
                        {career.team && `${career.team} · `}{career.position}
                    </p>

                    {career.description && (
                        <p className="mt-3 max-w-[42em] text-[0.98rem] leading-[1.8] text-ink-soft">
                            {career.description}
                        </p>
                    )}
                </div>

                {linked && (
                    <span className="pill pill-solid shrink-0">
                        상세 보기
                        <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>↗</span>
                    </span>
                )}
            </div>

            {stack.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-1.5">
                    {stack.map((s) => (
                        <span key={s} className="tag tag-line">{s}</span>
                    ))}
                </div>
            )}

            {/* 상세에 들어 있는 항목 미리보기 */}
            {linked && preview.length > 0 && (
                <div className="rule mt-6 pt-5">
                    <p className="card-label mb-3">{previewLabel} {preview.length}건</p>
                    <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
                        {preview.map((title, i) => (
                            <li key={`${title}-${i}`} className="flex items-baseline gap-2.5">
                                <span className="tnum shrink-0 text-[0.82rem] font-bold text-ac">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <span className="text-[0.95rem] leading-[1.6] text-ink-soft">{title}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* 상세가 없는 경력만 요약을 카드 안에 둔다 */}
            {!linked && career.contents && (
                <p className="rule mt-6 pt-5 text-[0.98rem] leading-[1.9] text-ink-soft">
                    {parseContent(career.contents)}
                </p>
            )}
        </>
    );

    const shell = "card accent-top px-6 pb-7 pt-7 sm:px-9 sm:pb-8 sm:pt-8";

    return linked ? (
        <Link
            href={`/career/detail/${career.key}`}
            scroll
            className={`${color} ${shell} card-hover group block`}
        >
            {body}
        </Link>
    ) : (
        <div className={`${color} ${shell}`}>{body}</div>
    );
};

/* ── 섹션 ────────────────────────────────────── */
export const CareerSection = () => {
    const [careerData, setCareerData] = useState<CareerT[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCareers = async () => {
            setIsLoading(true);
            setCareerData(await getCareers());
            setIsLoading(false);
        };
        fetchCareers();
    }, []);

    const sortedData = careerData.slice().sort((a, b) => (b.startTerm || '').localeCompare(a.startTerm || ''));
    const stats = getCareerStats(careerData);

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <SectionHead
                title="경력"
                script="career"
                color="c-sky"
                meta={careerData.length > 0
                    ? `${stats.companyCount}개 회사 · ${formatDuration(stats.totalMonths)}`
                    : undefined}
            />

            {isLoading ? (
                <div className="card py-12 text-center text-[0.95rem] text-ink-mute">불러오는 중...</div>
            ) : (
                <div className="space-y-5">
                    {sortedData.map((career, idx) => (
                        <CareerCard key={career.key} career={career} index={idx} />
                    ))}
                </div>
            )}
        </motion.div>
    );
};
