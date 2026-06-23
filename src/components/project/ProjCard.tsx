'use client';

import { BaseCard } from "../common/BaseCard";
import { ImageWithFallback } from "@/components";
import Link from "next/link";
import { projectT } from "@/features";
import { isDisplayableImage, parseContent } from "@/utils";
import { useState } from "react";

interface ProjCardProps {
    data: projectT;
}

export const ProjCard = ({ data }: ProjCardProps) => {
    const [imageVisible, setImageVisible] = useState(isDisplayableImage(data.imgUrl));

    return (
    <Link href={`/project/detail/${data.key}`}>
        <BaseCard className="group flex flex-col h-full">
            {imageVisible && (
            <div className="w-full h-48 overflow-hidden rounded-xl mb-4">
                <ImageWithFallback
                    src={data.imgUrl || ''}
                    alt={data.projName}
                    className="w-full h-48 object-cover rounded-xl grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-300"
                    hideOnError
                    onHidden={() => setImageVisible(false)}
                />
            </div>
            )}

            {/* 프로젝트 이름 */}
            <h2 className="text-3xl font-extrabold text-ink">
                {data.projName}
            </h2>

            {/* 기간 */}
            <p className="font-bold mt-2 text-base text-ink-soft">
                {data.startDate} - {data.endDate || 'ing'}
            </p>

            {/* 프로젝트 설명 */}
            <p className="text-base font-light mt-2 text-ink-soft line-clamp-2">
                {parseContent(data.projDesc || '')}
            </p>

            {/* 태그 + 기술 스택 통합 */}
            {((data.projTag && data.projTag.length > 0) || (data.projSkills && data.projSkills.length > 0)) && (
                <div className="mt-auto pt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
                    {/* 태그 */}
                    {data.projTag && data.projTag.length > 0 && (
                        <div className="flex items-center gap-1.5">
                            {data.projTag.slice(0, 3).map((tag: string, idx: number) => (
                                <span
                                    key={idx}
                                    className="text-sm text-ink-soft"
                                >
                                    #{tag}
                                </span>
                            ))}
                            {data.projTag.length > 3 && (
                                <span className="text-sm text-ink-soft/60">+{data.projTag.length - 3}</span>
                            )}
                        </div>
                    )}

                    {/* 구분선 */}
                    {data.projTag && data.projTag.length > 0 && data.projSkills && data.projSkills.length > 0 && (
                        <span className="text-ink-soft">|</span>
                    )}

                    {/* 기술 스택 */}
                    {data.projSkills && data.projSkills.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5">
                            {data.projSkills.slice(0, 4).map((skill, idx: number) => {
                                const skillName = typeof skill === 'string' ? skill : skill?.name;
                                if (!skillName) return null;
                                return (
                                    <span
                                        key={idx}
                                        className="text-sm px-2 py-0.5 rounded-full bg-cream text-ink-soft border border-line"
                                    >
                                        {skillName}
                                    </span>
                                );
                            })}
                            {data.projSkills.length > 4 && (
                                <span className="text-sm text-ink-soft/60">+{data.projSkills.length - 4}</span>
                            )}
                        </div>
                    )}
                </div>
            )}
        </BaseCard>
    </Link>
    );
};
