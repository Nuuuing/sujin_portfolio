'use client';

import { projectT, ProjPtc } from "@/features";
import { ImageWithFallback } from "@/components";
import Link from "next/link";
import { isDisplayableImage } from "@/utils";
import { projectDuration } from "@/utils/career";
import { useState } from "react";

const CARD_COLORS = ['c-sky', 'c-lime', 'c-yellow', 'c-pink', 'c-mint'];

interface ProjDetailCardProps {
    data: projectT;
    index?: number;
}

export const ProjDetailCard = ({ data, index = 0 }: ProjDetailCardProps) => {
    const [imageVisible, setImageVisible] = useState(isDisplayableImage(data.imgUrl));
    const color = CARD_COLORS[index % CARD_COLORS.length];

    const seen = new Set<string>();
    const stack: string[] = [];
    (data.projTag || []).forEach((t) => {
        if (t && !seen.has(t)) { seen.add(t); stack.push(t); }
    });
    (data.projSkills || []).forEach((s) => {
        const name = typeof s === 'string' ? s : s?.name;
        if (name && !seen.has(name)) { seen.add(name); stack.push(name); }
    });

    // projPtc가 문자열("1")/숫자(1)로 섞여 저장돼 있어 숫자로 정규화 후 비교
    const ptc = Number(data.projPtc);
    const ptcLabel = ptc === ProjPtc.SOLO ? '개인' : ptc === ProjPtc.TEAM ? '팀' : null;

    return (
        <Link
            href={`/project/detail/${data.key}`}
            className={`${color} card card-hover group flex h-full flex-col gap-4 p-0`}
        >
            {imageVisible && (
                <div className="aspect-[16/10] w-full overflow-hidden rounded-t-[var(--r-xl)] bg-page">
                    <ImageWithFallback
                        src={data.imgUrl || ''}
                        alt={data.projName}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        hideOnError
                        onHidden={() => setImageVisible(false)}
                    />
                </div>
            )}

            <div className={`flex flex-1 flex-col gap-3 p-6 ${imageVisible ? 'pt-0' : ''} sm:p-7 ${imageVisible ? 'sm:pt-0' : ''}`}>
                <div className="flex flex-wrap items-center gap-2">
                    {ptcLabel && <span className="tag">{ptcLabel}</span>}
                    <span className="tnum text-[0.86rem] text-ink-mute">
                        {data.startDate} — {data.endDate || '진행 중'}
                        {' · '}{projectDuration(data.startDate, data.endDate)}
                    </span>
                </div>

                <h3 className="text-[1.3rem] font-bold leading-snug tracking-[-0.03em] text-ink">
                    {data.projName}
                </h3>

                {data.projDesc && (
                    <p className="line-clamp-3 break-keep text-[0.95rem] leading-[1.8] text-ink-soft">
                        {data.projDesc.replace(/\*\*/g, '')}
                    </p>
                )}

                {stack.length > 0 && (
                    <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
                        {stack.slice(0, 5).map((s) => (
                            <span key={s} className="tag tag-line">{s}</span>
                        ))}
                        {stack.length > 5 && (
                            <span className="tag tag-line">+{stack.length - 5}</span>
                        )}
                    </div>
                )}
            </div>
        </Link>
    );
};
