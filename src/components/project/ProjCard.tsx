'use client';

import { BaseCard } from "../common/BaseCard";
import { ImageWithFallback } from "@/components";
import { prepImg } from "@/data";
import Link from "next/link";
import { projectT } from "@/features";
import { parseContent } from "@/utils";

interface ProjCardProps {
    data: projectT;
}

export const ProjCard = ({ data }: ProjCardProps) => (
    <Link href={`/project/detail/${data.key}`}>
        <BaseCard className="group flex flex-col h-full">
            <div className="w-full h-48 overflow-hidden rounded-xl mb-4">
                <ImageWithFallback
                    src={data.imgUrl || ''}
                    fallbackSrc={prepImg}
                    alt={data.projName}
                    className="w-full h-48 object-cover rounded-xl grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-300"
                />
            </div>

            {/* 프로젝트 이름 */}
            <h2 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100">
                {data.projName}
            </h2>

            {/* 기간 */}
            <p className="font-bold mt-2 text-lg text-gray-500 dark:text-gray-400">
                {data.startDate} - {data.endDate || 'ing'}
            </p>

            {/* 프로젝트 설명 */}
            <p className="text-lg font-light mt-2 text-gray-600 dark:text-gray-300 line-clamp-2">
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
                                    className="text-sm text-gray-500 dark:text-gray-400"
                                >
                                    #{tag}
                                </span>
                            ))}
                            {data.projTag.length > 3 && (
                                <span className="text-sm text-gray-400">+{data.projTag.length - 3}</span>
                            )}
                        </div>
                    )}

                    {/* 구분선 */}
                    {data.projTag && data.projTag.length > 0 && data.projSkills && data.projSkills.length > 0 && (
                        <span className="text-gray-600 dark:text-gray-700">|</span>
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
                                        className="text-sm px-2 py-0.5 rounded-full bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/10"
                                    >
                                        {skillName}
                                    </span>
                                );
                            })}
                            {data.projSkills.length > 4 && (
                                <span className="text-sm text-gray-400">+{data.projSkills.length - 4}</span>
                            )}
                        </div>
                    )}
                </div>
            )}
        </BaseCard>
    </Link>
);