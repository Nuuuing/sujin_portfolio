'use client';

import { ImageWithFallback } from "@/components";
import Link from "next/link";
import { projectT, ProjPtc } from "@/features";
import { isDisplayableImage } from "@/utils";
import { projectDuration } from "@/utils/career";
import { useState } from "react";

interface ProjCardProps {
    data: projectT;
}

/**
 * 프로젝트 목록 항목. 카드가 아니라 괘선으로 구획된 레코드다.
 * 스크린샷은 흑백 기본, hover 시 원색으로 돌아온다.
 */
export const ProjCard = ({ data }: ProjCardProps) => {
    const [imageVisible, setImageVisible] = useState(isDisplayableImage(data.imgUrl));

    return (
        <Link
            href={`/project/detail/${data.key}`}
            className="rule group grid grid-cols-1 items-start gap-4 py-4 sm:grid-cols-[8.5rem_1fr] sm:gap-5"
        >
            {imageVisible ? (
                <div className="aspect-[4/3] w-full overflow-hidden border border-line bg-card-soft sm:aspect-[4/3]">
                    <ImageWithFallback
                        src={data.imgUrl || ''}
                        alt={data.projName}
                        className="img-mono h-full w-full object-cover"
                        hideOnError
                        onHidden={() => setImageVisible(false)}
                    />
                </div>
            ) : (
                <div className="hidden sm:block" />
            )}

            <div className="min-w-0">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-base font-bold tracking-[-0.018em] text-ink group-hover:text-ac sm:text-lg">
                        {data.projName}
                    </h3>
                    <p className="tnum shrink-0 text-[0.80rem] text-ink-soft">
                        {data.startDate} — {data.endDate || '진행 중'}
                        <span className="text-ink-mute"> · {projectDuration(data.startDate, data.endDate)}</span>
                    </p>
                </div>

                <p className="mt-0.5 text-[0.78rem] text-ink-mute">
                    {data.projPtc === ProjPtc.SOLO ? '개인' : '팀'}
                    {data.role && ` · ${data.role}`}
                </p>

                {data.projDesc && (
                    <p className="mt-2 line-clamp-2 text-[0.90rem] leading-[1.7] text-ink-soft">
                        {data.projDesc.replace(/\*\*/g, '')}
                    </p>
                )}

                {data.projSkills && data.projSkills.length > 0 && (
                    <p className="mt-2 text-[0.80rem] leading-[1.6] text-ink-mute">
                        {data.projSkills.map((s) => (typeof s === 'string' ? s : s?.name)).filter(Boolean).join(', ')}
                    </p>
                )}
            </div>
        </Link>
    );
};
