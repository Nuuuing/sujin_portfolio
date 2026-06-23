'use client';

import { ContentsContainer, DetailLayout, GitTooltip, ImageWithFallback, NotionTooltip, RoleAccordion } from "@/components";
import { contentsT, projDetailT, skillStackT } from "@/features";
import { getProjectDetails, getYoutubeEmbedUrl, isDisplayableImage } from "@/utils";
import { parseContent } from "@/utils";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

// 섹션 헤더 — 아이콘 칩 + 액센트로 섹션을 시각적으로 구분
const SECTION_ACCENT = {
    taupe: { chip: 'bg-[var(--taupe)]/12 text-[var(--taupe)]', text: 'text-[var(--taupe)]' },
    sage: { chip: 'bg-[var(--sage)]/25 text-[var(--taupe)]', text: 'text-[var(--taupe)]' },
} as const;

function SectionHead({ eyebrow, title, icon, accent = 'taupe', hint }: {
    eyebrow: string; title: string; icon: ReactNode; accent?: keyof typeof SECTION_ACCENT; hint?: string;
}) {
    const a = SECTION_ACCENT[accent];
    return (
        <div className="mb-6 flex items-center gap-3.5">
            <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${a.chip}`}>{icon}</span>
            <div className="flex-1">
                <p className={`mb-0.5 text-[11px] font-bold uppercase tracking-[0.16em] ${a.text}`}>{eyebrow}</p>
                <h2 className="text-2xl font-bold leading-tight text-ink">{title}</h2>
            </div>
            {hint && (
                <span className="hidden shrink-0 rounded-full border border-line bg-cream px-3 py-1 text-xs text-ink-soft sm:inline">{hint}</span>
            )}
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
        // id가 변경되면 항상 데이터를 다시 가져옴
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
        const labels: string[] = [];
        if (types.has('WEB')) labels.push('WEB');
        if (types.has('UNITY')) labels.push('UNITY');
        return labels;
    };

    // 로딩 상태
    if (isLoading) {
        return (
            <DetailLayout>
                <div className="flex flex-col items-center justify-center py-20">
                    <div className="w-12 h-12 border-4 border-[var(--taupe)]/30 border-t-[var(--taupe)] rounded-full animate-spin mb-4"></div>
                    <p className="text-ink-soft/60">프로젝트 정보를 불러오는 중...</p>
                </div>
            </DetailLayout>
        );
    }

    // 에러 또는 데이터 없음
    if (error || !data) {
        return (
            <DetailLayout>
                <div className="flex flex-col items-center justify-center py-20 text-ink-soft">
                    <svg className="w-16 h-16 mb-4 text-ink-soft" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-lg mb-4">해당 프로젝트를 찾을 수 없습니다.</p>
                    <button
                        onClick={() => router.push('/project')}
                        className="px-4 py-2 bg-[var(--taupe)] text-[var(--bg-card)] rounded-lg hover:bg-[var(--ink)] transition-colors"
                    >
                        프로젝트 목록으로
                    </button>
                </div>
            </DetailLayout>
        );
    }

    return (
        <DetailLayout>
            {/* Hero Section */}
            <div className="relative mb-10">
                {/* 기술 분야 라벨 + 기간 */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                    {getProjSkillLabels(data?.projSkills).map((label, idx) => (
                        <span
                            key={idx}
                            className="inline-flex items-center px-3 py-1 rounded-md bg-[var(--taupe)]/12 text-[var(--taupe)] text-xs font-bold tracking-wider uppercase"
                        >
                            {label}
                        </span>
                    ))}
                    <span className="text-ink-soft text-sm">
                        {dayjs(data?.startDate).format('YYYY.MM')} - {data?.endDate ? dayjs(data?.endDate).format('YYYY.MM') : 'Present'}
                    </span>
                </div>

                {/* 프로젝트 타이틀 */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-ink mb-4 tracking-tight">
                    {data?.projName}
                </h1>

                {/* Role */}
                {data?.role && (
                    <p className="text-lg sm:text-xl text-[var(--taupe)] font-semibold mb-3">
                        {data.role}
                    </p>
                )}

                {/* 프로젝트 설명 */}
                <p className="mb-6 w-full max-w-4xl text-lg leading-8 text-ink-soft sm:text-xl">
                    {parseContent(data?.projDesc || '')}
                </p>

                {/* 태그 + Tech Stack 통합 영역 */}
                {((data?.projTag && data.projTag.length > 0) || (data?.projSkills && data.projSkills.length > 0)) && (
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6">
                        {data?.projTag && data.projTag.length > 0 && (
                            <div className="flex items-center gap-2">
                                {data.projTag.map((tag: string, idx: number) => (
                                    <span key={idx} className="rounded-md border border-line bg-[var(--bg-card)] px-2.5 py-1 text-xs text-ink-soft">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        {data?.projTag && data.projTag.length > 0 && data?.projSkills && data.projSkills.length > 0 && (
                            <span className="hidden text-ink-soft/50 sm:inline">|</span>
                        )}

                        {data?.projSkills && data.projSkills.length > 0 && (
                            <div className="flex flex-wrap items-center gap-2">
                                {data.projSkills.map((skill, idx) => {
                                    const skillName = typeof skill === 'string' ? skill : skill?.name;
                                    if (!skillName) return null;
                                    return (
                                        <span key={idx} className="text-xs px-2.5 py-1 rounded-full bg-cream text-ink-soft border border-line">
                                            {skillName}
                                        </span>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}

                {/* 외부 링크 */}
                {(data?.gitUrl || data?.notionUrl || data?.siteUrl) && (
                    <div className="flex flex-wrap gap-3">
                        {data?.siteUrl && (
                            <a
                                href={data.siteUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-card-soft border border-line hover:border-line-strong transition-all group"
                            >
                                <svg className="w-5 h-5 text-ink-soft group-hover:text-ink transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                </svg>
                                <span className="text-sm font-medium text-ink-soft group-hover:text-ink transition-colors">
                                    배포 사이트
                                </span>
                                <svg className="w-4 h-4 text-ink-soft/50 group-hover:text-ink-soft transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        )}
                        {data?.gitUrl && <GitTooltip git={data.gitUrl} />}
                        {data?.notionUrl && <NotionTooltip url={data.notionUrl} />}
                    </div>
                )}
            </div>

            {/* 미디어 갤러리 */}
            {(data?.youtubeUrl || (data?.imgUrl && data.imgUrl.some(isDisplayableImage))) && (() => {
                const imageUrls = data?.imgUrl?.filter(isDisplayableImage) || [];
                const mediaCount = (data?.youtubeUrl ? 1 : 0) + imageUrls.length;

                return (
                    <div className="mb-12">
                        {mediaCount === 1 ? (
                            <div className="rounded-2xl overflow-hidden max-w-2xl mx-auto">
                                {data?.youtubeUrl ? (
                                    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                                        <iframe
                                            className="absolute top-0 left-0 w-full h-full"
                                            src={getYoutubeEmbedUrl(data.youtubeUrl) || ''}
                                            title={data.projName || 'Project Video'}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    </div>
                                ) : (
                                    <ImageWithFallback
                                        className="w-full h-auto"
                                        src={imageUrls[0] || ''}
                                        alt={`${data?.projName || 'project'}_0`}
                                        width={800}
                                        height={450}
                                        hideOnError
                                    />
                                )}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {data?.youtubeUrl && (
                                    <div className="rounded-2xl overflow-hidden">
                                        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                                            <iframe
                                                className="absolute top-0 left-0 w-full h-full"
                                                src={getYoutubeEmbedUrl(data.youtubeUrl) || ''}
                                                title={data.projName || 'Project Video'}
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            />
                                        </div>
                                    </div>
                                )}
                                {imageUrls.map((url: string, index: number) => (
                                    <div key={index} className="rounded-2xl overflow-hidden">
                                        <ImageWithFallback
                                            className="w-full h-auto"
                                            src={url}
                                            alt={`${data?.projName || 'project'}_${index}`}
                                            width={600}
                                            height={400}
                                            hideOnError
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );
            })()}

            {/* 주요 성과 섹션 */}
            {data?.achievements && data.achievements.length > 0 && (
                <div className="mb-16">
                    <SectionHead
                        eyebrow="Impact" title="Key Achievements" accent="taupe"
                        icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8-8 8-4-4-6 6" /></svg>}
                    />
                    <ul className="grid gap-3 sm:grid-cols-2">
                        {data.achievements.map((ach, idx) => (
                            <li key={idx} className="flex gap-3.5 rounded-xl border border-line bg-[var(--bg-card)] p-4 shadow-[0_2px_14px_-8px_rgba(63,59,48,0.15)] transition-colors hover:border-line-strong">
                                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[var(--taupe)]/12 text-[11px] font-bold text-[var(--taupe)]">
                                    {String(idx + 1).padStart(2, '0')}
                                </span>
                                <span className="text-[15px] leading-7 text-ink-soft">{parseContent(ach)}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Overview 섹션 */}
            {data?.projDescDetail && (
                <div className="mb-16">
                    <SectionHead
                        eyebrow="Context" title="Overview" accent="sage"
                        icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.5A2.5 2.5 0 0 1 14.5 4H20v13h-5.5A2.5 2.5 0 0 0 12 19.5m0-13A2.5 2.5 0 0 0 9.5 4H4v13h5.5A2.5 2.5 0 0 1 12 19.5m0-13v13" /></svg>}
                    />
                    <div className="rounded-2xl border border-line border-l-[5px] border-l-[var(--sage)] bg-[var(--bg-card)] p-6 shadow-[0_2px_14px_-8px_rgba(63,59,48,0.15)] sm:p-7">
                        <div className="space-y-4 text-[15px] leading-8 text-ink-soft sm:text-base">
                            {data.projDescDetail.split('\n').filter(Boolean).map((paragraph, idx) => (
                                <p key={idx}>{parseContent(paragraph)}</p>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* 담당 부분 - 아코디언 */}
            {data?.roles && data.roles.length > 0 && (
                <div className="mb-16">
                    <SectionHead
                        eyebrow="Role" title="What I Did" accent="taupe" hint="클릭하여 상세 보기"
                        icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>}
                    />
                    <RoleAccordion roles={data.roles} />
                </div>
            )}

            {/* 추가 콘텐츠 */}
            {data?.contents && data.contents.length > 0 && (
                <div>
                    <SectionHead
                        eyebrow="Details" title="Problem Solving" accent="sage"
                        icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m0 16v-2.5M5.6 5.6l.7.7m11.4-.7-.7.7M4 12H3m18 0h-1m-9 5a5 5 0 1 1 .001-10.001A5 5 0 0 1 11 17Z" /></svg>}
                    />
                    <div className="space-y-4">
                        {data.contents.map((content: contentsT, index: number) => (
                            <ContentsContainer key={`content-${index}`} data={content} />
                        ))}
                    </div>
                </div>
            )}
        </DetailLayout>
    );
}
