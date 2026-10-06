'use client';

import { ContentsContainer, DetailLayout, GitTooltip, ImageWithFallback, NotionTooltip, RoleAccordion } from "@/components";
import { contentsT, projDetailT, skillStackT, ProjPtc } from "@/features";
import { getProjectDetails, getYoutubeEmbedUrl, isDisplayableImage } from "@/utils";
import { parseContent } from "@/utils";
import { projectDuration } from "@/utils/career";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/** 섹션 머리: 색 띠 + 제목 + 스크립트 악센트 */
function SectionHead({ title, script, meta, color = 'c-sky' }: {
    title: string; script: string; meta?: string; color?: string;
}) {
    return (
        <div className={`${color} mb-5 mt-14 flex flex-wrap items-end justify-between gap-x-5 gap-y-2`}>
            <div>
                <span className="accent-rule mb-3" />
                <h2 className="flex flex-wrap items-baseline gap-x-3 text-[1.6rem] font-bold leading-tight tracking-[-0.025em] text-ink sm:text-[2rem]">
                    {title}
                    <span className="script text-[1.45em] text-ac">{script}</span>
                </h2>
            </div>
            {meta && <p className="tnum pb-1 text-[0.92rem] text-ink-mute">{meta}</p>}
        </div>
    );
}

interface ProjectDetailClientProps {
    id: string;
    initialData?: projDetailT | null;
}

export function ProjectDetailClient({ id, initialData }: ProjectDetailClientProps) {
    const router = useRouter();

    const [data, setData] = useState<projDetailT | null>(initialData || null);
    const [isLoading, setIsLoading] = useState(!initialData);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(false);
            try {
                const projectDetailData = await getProjectDetails();
                const found = projectDetailData.find(
                    (item: projDetailT) => item.key === Number(id)
                );
                if (found) {
                    setData(found);
                } else {
                    setError(true);
                }
            } catch (err) {
                console.error('Error fetching project details:', err);
                setError(true);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const getProjSkillLabels = (projSkills?: skillStackT[]) => {
        if (!projSkills) return [];
        const types = new Set(projSkills.map((d) => d.type));
        return ['WEB', 'UNITY'].filter((t) => types.has(t));
    };

    if (isLoading) {
        return (
            <DetailLayout>
                <p className="rule py-10 text-center text-xs text-ink-mute">프로젝트 정보를 불러오는 중...</p>
            </DetailLayout>
        );
    }

    if (error || !data) {
        return (
            <DetailLayout>
                <div className="rule py-10 text-center">
                    <p className="text-xs text-ink-mute">해당 프로젝트를 찾을 수 없습니다.</p>
                    <button
                        onClick={() => router.push('/project')}
                        className="link mt-3 cursor-pointer text-[0.86rem] font-semibold"
                    >
                        프로젝트 목록으로 →
                    </button>
                </div>
            </DetailLayout>
        );
    }

    const ptc = Number(data.projPtc);
    const ptcLabel = ptc === ProjPtc.SOLO ? '개인' : ptc === ProjPtc.TEAM ? '팀' : null;
    const metaParts = [ptcLabel, ...getProjSkillLabels(data.projSkills)].filter(Boolean);

    const stack = Array.from(new Set([
        ...(data.projTag ?? []),
        ...(data.projSkills ?? []).map((s) => (typeof s === 'string' ? s : s?.name)).filter(Boolean) as string[],
    ]));

    const imageUrls = data.imgUrl?.filter(isDisplayableImage) ?? [];
    const hasMedia = Boolean(data.youtubeUrl) || imageUrls.length > 0;

    return (
        <DetailLayout>
            {/* ── 머리 ───────────────────────── */}
            <header className="text-center">
                <h1 className="text-xl font-extrabold tracking-[-0.025em] text-ink sm:text-2xl">
                    {data.projName}
                </h1>
                {data.role && <p className="mt-1 text-xs text-ink-soft sm:text-sm">{data.role}</p>}
                <p className="tnum mt-1 text-[0.82rem] text-ink-mute">
                    {dayjs(data.startDate).format('YYYY.MM')} — {data.endDate ? dayjs(data.endDate).format('YYYY.MM') : '진행 중'}
                    {' · '}{projectDuration(data.startDate, data.endDate)}
                    {metaParts.length > 0 && ` · ${metaParts.join(' · ')}`}
                </p>

                {data.projDesc && (
                    <p className="measure-wide mt-4 text-left text-[0.96rem] leading-[1.8] text-ink-soft">
                        {parseContent(data.projDesc)}
                    </p>
                )}

                {stack.length > 0 && (
                    <p className="rule mt-4 pt-3 text-[0.82rem] leading-[1.7] text-ink-mute">
                        {stack.join(', ')}
                    </p>
                )}

                {/* 외부 링크 */}
                {(data.gitUrl || data.notionUrl || data.siteUrl) && (
                    <div className="mt-4 flex flex-wrap justify-center gap-2">
                        {data.siteUrl && (
                            <a
                                href={data.siteUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center gap-2 border border-line bg-card-soft px-3 py-2 transition-colors hover:border-line-strong"
                            >
                                <svg className="h-4 w-4 text-ink-soft transition-colors group-hover:text-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                </svg>
                                <span className="text-xs font-semibold text-ink-soft transition-colors group-hover:text-ink">배포 사이트</span>
                            </a>
                        )}
                        {data.gitUrl && <GitTooltip git={data.gitUrl} />}
                        {data.notionUrl && <NotionTooltip url={data.notionUrl} />}
                    </div>
                )}
            </header>

            {/* ── 미디어 ─────────────────────── */}
            {hasMedia && (
                <div className="rule-k mt-8 grid grid-cols-1 gap-3 pt-5 sm:grid-cols-2">
                    {data.youtubeUrl && (
                        <div className="relative w-full border border-line" style={{ paddingBottom: '56.25%' }}>
                            <iframe
                                className="absolute left-0 top-0 h-full w-full"
                                src={getYoutubeEmbedUrl(data.youtubeUrl) || ''}
                                title={data.projName || 'Project Video'}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    )}
                    {imageUrls.map((url: string, index: number) => (
                        <div key={index} className="overflow-hidden border border-line">
                            <ImageWithFallback
                                className="img-mono h-auto w-full"
                                src={url}
                                alt={`${data.projName || 'project'}_${index}`}
                                width={600}
                                height={400}
                                hideOnError
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* ── 주요 성과 ───────────────────── */}
            {data.achievements && data.achievements.length > 0 && (
                <>
                    <SectionHead title="주요 성과" script="impact" color="c-lime" meta={`${data.achievements.length}건`} />
                    <ul className="c-lime grid gap-3 sm:grid-cols-2">
                        {data.achievements.map((ach, idx) => (
                            <li key={idx} className="card flex items-start gap-3.5">
                                <span className="fig flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ac-soft text-[0.9rem] text-ac">
                                    {String(idx + 1).padStart(2, '0')}
                                </span>
                                <span className="text-[0.96rem] leading-[1.8] text-ink-soft">{parseContent(ach)}</span>
                            </li>
                        ))}
                    </ul>
                </>
            )}

            {/* ── Overview ───────────────────── */}
            {data.projDescDetail && (
                <>
                    <SectionHead title="개요" script="about" color="c-sky" />
                    <div className="card space-y-3 text-[0.98rem] leading-[1.9] text-ink-soft">
                        {data.projDescDetail.split('\n').filter(Boolean).map((paragraph, idx) => (
                            <p key={idx}>{parseContent(paragraph)}</p>
                        ))}
                    </div>
                </>
            )}

            {/* ── 담당 부분 ───────────────────── */}
            {data.roles && data.roles.length > 0 && (
                <>
                    <SectionHead title="담당 범위" script="my role" color="c-pink" meta={`${data.roles.length}건`} />
                    <RoleAccordion roles={data.roles} />
                </>
            )}

            {/* ── 추가 콘텐츠 ─────────────────── */}
            {data.contents && data.contents.length > 0 && (
                <>
                    <SectionHead title="문제 해결" script="deep dive" color="c-mint" meta={`${data.contents.length}건`} />
                    <div className="space-y-4">
                        {data.contents.map((content: contentsT, index: number) => (
                            <ContentsContainer key={`content-${index}`} data={content} index={index} />
                        ))}
                    </div>
                </>
            )}
        </DetailLayout>
    );
}
