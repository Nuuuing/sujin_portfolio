'use client';

import { projectT } from "@/features";
import { ImageWithFallback } from "@/components";
import Link from "next/link";
import { isDisplayableImage, parseContent } from "@/utils";
import { useState } from "react";

interface ProjDetailCardProps {
    data: projectT;
}

export const ProjDetailCard = ({ data }: ProjDetailCardProps) => {
    const [imageVisible, setImageVisible] = useState(isDisplayableImage(data.imgUrl));

    return (
    <Link href={`/project/detail/${data.key}`} className="block w-full h-full">
        <div className="bg-white dark:bg-[#1c1c1c] rounded-2xl overflow-hidden flex flex-col shadow-xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300 h-full group border border-gray-200 dark:border-gray-800 hover:border-[#72AAFF]/30">
            {/* 이미지 영역 */}
            {imageVisible && (
            <div className="h-48 bg-gray-100 dark:bg-gray-900 relative overflow-hidden">
                <ImageWithFallback
                    src={data.imgUrl || ''}
                    alt={data.projName}
                    className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-transform duration-500 ease-out"
                    hideOnError
                    onHidden={() => setImageVisible(false)}
                />
            </div>
            )}

            {/* 콘텐츠 영역 */}
            <div className="p-5 flex flex-col flex-1">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-[#72AAFF] transition-colors mb-1 line-clamp-1">
                    {data.projName}
                </h2>

                {/* 기간 */}
                <p className="text-sm text-gray-500 mb-2">
                    {data.startDate} - {data.endDate || 'ing'}
                </p>

                <p className="text-gray-500 dark:text-gray-400 text-base mb-3 leading-relaxed line-clamp-2 break-keep">
                    {parseContent(data.projDesc || '')}
                </p>

                {/* 태그 + 기술 스택 통합 */}
                {((data.projTag && data.projTag.length > 0) || (data.projSkills && data.projSkills.length > 0)) && (
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 mb-3">
                        {/* 태그 */}
                        {data.projTag && data.projTag.length > 0 && (
                            <div className="flex items-center gap-1">
                                {data.projTag.slice(0, 3).map((tag: string, idx: number) => (
                                    <span
                                        key={idx}
                                        className="text-xs text-gray-500"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                                {data.projTag.length > 3 && (
                                    <span className="text-xs text-gray-600">+{data.projTag.length - 3}</span>
                                )}
                            </div>
                        )}

                        {/* 구분선 */}
                        {data.projTag && data.projTag.length > 0 && data.projSkills && data.projSkills.length > 0 && (
                            <span className="text-gray-400 dark:text-gray-700">|</span>
                        )}

                        {/* 기술 스택 */}
                        {data.projSkills && data.projSkills.length > 0 && (
                            <div className="flex flex-wrap items-center gap-1">
                                {data.projSkills.slice(0, 3).map((skill, idx) => {
                                    const skillName = typeof skill === 'string' ? skill : skill?.name;
                                    if (!skillName) return null;
                                    return (
                                        <span
                                            key={idx}
                                            className="text-xs px-1.5 py-0.5 rounded-full bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/10"
                                        >
                                            {skillName}
                                        </span>
                                    );
                                })}
                                {data.projSkills.length > 3 && (
                                    <span className="text-xs text-gray-500">+{data.projSkills.length - 3}</span>
                                )}
                            </div>
                        )}
                    </div>
                )}

                <div className="mb-3 mt-auto">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">ROLE</h3>
                    <p className="text-gray-700 dark:text-gray-200 font-semibold text-base">{data.role || 'Developer'}</p>
                </div>
            </div>
        </div>
    </Link>
    );
};
