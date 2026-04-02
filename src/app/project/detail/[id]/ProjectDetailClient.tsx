'use client';

import { ContentsContainer, DetailLayout, GitTooltip, ImageWithFallback, NotionTooltip, RoleAccordion } from "@/components";
import { contentsT, projDetailT, skillStackT } from "@/features";
import { getProjectDetails, getYoutubeEmbedUrl } from "@/utils";
import { parseContent } from "@/utils";
import dayjs from "dayjs";
import { prepImg } from "@/data";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
                    <div className="w-12 h-12 border-4 border-[#72AAFF]/30 border-t-[#72AAFF] rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-400">프로젝트 정보를 불러오는 중...</p>
                </div>
            </DetailLayout>
        );
    }

    // 에러 또는 데이터 없음
    if (error || !data) {
        return (
            <DetailLayout>
                <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                    <svg className="w-16 h-16 mb-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-lg mb-4">해당 프로젝트를 찾을 수 없습니다.</p>
                    <button
                        onClick={() => router.push('/project')}
                        className="px-4 py-2 bg-[#72AAFF] text-white rounded-lg hover:bg-[#5a8fd9] transition-colors"
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
                            className="inline-flex items-center px-3 py-1 rounded-md bg-[#72AAFF]/15 text-[#72AAFF] text-xs font-bold tracking-wider uppercase"
                        >
                            {label}
                        </span>
                    ))}
                    <span className="text-gray-500 text-sm">
                        {dayjs(data?.startDate).format('YYYY.MM')} — {data?.endDate ? dayjs(data?.endDate).format('YYYY.MM') : 'Present'}
                    </span>
                </div>

                {/* 프로젝트 타이틀 */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
                    {data?.projName}
                </h1>

                {/* Role */}
                {data?.role && (
                    <p className="text-lg sm:text-xl text-[#72AAFF] font-semibold mb-3">
                        {data.role}
                    </p>
                )}

                {/* 프로젝트 설명 */}
                <p className="text-xl sm:text-2xl text-gray-500 dark:text-gray-400 font-light w-full mb-6">
                    {parseContent(data?.projDesc || '')}
                </p>

                {/* 태그 + Tech Stack 통합 영역 */}
                {((data?.projTag && data.projTag.length > 0) || (data?.projSkills && data.projSkills.length > 0)) && (
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6">
                        {data?.projTag && data.projTag.length > 0 && (
                            <div className="flex items-center gap-2">
                                {data.projTag.map((tag: string, idx: number) => (
                                    <span key={idx} className="text-sm text-gray-500">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        {data?.projTag && data.projTag.length > 0 && data?.projSkills && data.projSkills.length > 0 && (
                            <span className="text-gray-700">|</span>
                        )}

                        {data?.projSkills && data.projSkills.length > 0 && (
                            <div className="flex flex-wrap items-center gap-2">
                                {data.projSkills.map((skill, idx) => {
                                    const skillName = typeof skill === 'string' ? skill : skill?.name;
                                    if (!skillName) return null;
                                    return (
                                        <span key={idx} className="text-xs px-2.5 py-1 rounded-full bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/10">
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
                                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all group"
                            >
                                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                </svg>
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                                    배포 사이트
                                </span>
                                <svg className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
            {(data?.youtubeUrl || (data?.imgUrl && data.imgUrl.length > 0)) && (() => {
                const mediaCount = (data?.youtubeUrl ? 1 : 0) + (data?.imgUrl?.length || 0);

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
                                        src={data?.imgUrl?.[0] || prepImg}
                                        fallbackSrc={prepImg}
                                        alt={`${data?.projName || 'project'}_0`}
                                        width={800}
                                        height={450}
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
                                {data?.imgUrl?.map((url: string, index: number) => (
                                    <div key={index} className="rounded-2xl overflow-hidden">
                                        <ImageWithFallback
                                            className="w-full h-auto"
                                            src={url || prepImg}
                                            fallbackSrc={prepImg}
                                            alt={`${data?.projName || 'project'}_${index}`}
                                            width={600}
                                            height={400}
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
                    <div className="bg-amber-50 dark:bg-gray-900/50 rounded-2xl p-6 border border-amber-200 dark:border-gray-800/50">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                                <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                </svg>
                            </div>
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Key Achievements</h3>
                        </div>
                        <ul className="space-y-4">
                            {data.achievements.map((ach, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-gray-600 dark:text-gray-300 text-base sm:text-lg">
                                    <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0 mt-2"></span>
                                    <span className="leading-relaxed">{parseContent(ach)}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            {/* Overview 섹션 */}
            {data?.projDescDetail && (
                <div className="mb-16">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-[#72AAFF]/10 flex items-center justify-center">
                            <svg className="w-5 h-5 text-[#72AAFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Overview</h2>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-900/50 rounded-2xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800/50">
                        <div className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed space-y-4">
                            {data.projDescDetail.split('\n').map((paragraph, idx) => (
                                <p key={idx}>{parseContent(paragraph)}</p>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* 담당 부분 - 아코디언 */}
            {data?.roles && data.roles.length > 0 && (
                <div className="mb-16">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                            <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">What I Did</h2>
                        <span className="text-sm text-gray-500">클릭하여 상세 보기</span>
                    </div>
                    <RoleAccordion roles={data.roles} />
                </div>
            )}

            {/* 추가 콘텐츠 */}
            {data?.contents && data.contents.length > 0 && (
                <div className="space-y-8">
                    {data.contents.map((content: contentsT, index: number) => (
                        <ContentsContainer key={`content-${index}`} data={content} />
                    ))}
                </div>
            )}
        </DetailLayout>
    );
}
