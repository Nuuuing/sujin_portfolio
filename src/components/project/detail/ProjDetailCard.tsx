'use client';

import { projectT, ProjPtc } from "@/features";
import { ImageWithFallback } from "@/components";
import Link from "next/link";
import { isDisplayableImage, parseContent } from "@/utils";
import { useState } from "react";

interface ProjDetailCardProps {
    data: projectT;
    index?: number;
}

export const ProjDetailCard = ({ data, index }: ProjDetailCardProps) => {
    const [imageVisible, setImageVisible] = useState(isDisplayableImage(data.imgUrl));

    // 스킬 이름 중복 제거 (projTag + projSkills 합산)
    const seen = new Set<string>();
    const skillChips: string[] = [];
    (data.projTag || []).forEach((t) => {
        if (!seen.has(t)) { seen.add(t); skillChips.push(t); }
    });
    (data.projSkills || []).forEach((s) => {
        const name = typeof s === 'string' ? s : s?.name;
        if (name && !seen.has(name)) { seen.add(name); skillChips.push(name); }
    });

    // 기술 분야 추론 — WEB / UNITY를 모두 표기 (type 필드 기반)
    const techTypes = new Set(
        (data.projSkills || [])
            .map((s) => (typeof s === 'object' ? s?.type : null))
            .filter(Boolean) as string[]
    );
    const techLabels = ['WEB', 'UNITY'].filter((t) => techTypes.has(t));
    // projPtc가 문자열("1")/숫자(1)로 섞여 저장돼 있어 숫자로 정규화 후 비교
    const ptc = Number(data.projPtc);
    const ptcLabel = ptc === ProjPtc.SOLO ? 'SOLO' : ptc === ProjPtc.TEAM ? 'TEAM' : null;
    const footerParts = [...techLabels, ptcLabel].filter(Boolean);

    const periodStr = [data.startDate, data.endDate || 'ing'].filter(Boolean).join(' — ');

    return (
        <Link href={`/project/detail/${data.key}`} className="block w-full h-full">
            <div className="bg-[var(--bg-card)] rounded-2xl overflow-hidden flex flex-col h-full group border border-line shadow-[0_4px_20px_-8px_rgba(63,59,48,0.12)] hover:shadow-[0_14px_36px_-10px_rgba(63,59,48,0.2)] hover:border-[var(--taupe)]/30 transition-all duration-300">

                {/* 이미지 */}
                {imageVisible && (
                    <div className="h-44 bg-[var(--bg-soft)] relative overflow-hidden shrink-0">
                        <ImageWithFallback
                            src={data.imgUrl || ''}
                            alt={data.projName}
                            className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:scale-[1.04] group-hover:opacity-100 transition-transform duration-500 ease-out"
                            hideOnError
                            onHidden={() => setImageVisible(false)}
                        />
                    </div>
                )}

                <div className="p-5 flex flex-col flex-1 min-h-0">
                    {/* 상단: 인덱스 라벨 + 기간 */}
                    <div className="flex items-center justify-between mb-3">
                        <span className="eyebrow">
                            {index !== undefined
                                ? `PROJECT · ${String(index + 1).padStart(2, '0')}`
                                : 'PROJECT'}
                        </span>
                        <span className="text-[10px] text-ink-soft/50 tracking-wide tabular-nums">
                            {periodStr}
                        </span>
                    </div>

                    {/* 제목 + 설명 */}
                    <div className="flex-1">
                        <h2 className="text-lg font-bold text-ink group-hover:text-[var(--taupe)] transition-colors leading-snug line-clamp-1 mb-1.5">
                            {data.projName}
                        </h2>
                        {data.projDesc && (
                            <p className="text-sm text-ink-soft/70 leading-relaxed line-clamp-2 break-keep">
                                {parseContent(data.projDesc)}
                            </p>
                        )}
                    </div>

                    {/* 스킬 칩 */}
                    {skillChips.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-4">
                            {skillChips.slice(0, 5).map((name) => (
                                <span
                                    key={name}
                                    className="text-[11px] px-2.5 py-[3px] rounded-full bg-[var(--bg-soft)] text-ink-soft border border-line leading-none"
                                >
                                    {name}
                                </span>
                            ))}
                            {skillChips.length > 5 && (
                                <span className="text-[11px] px-2 py-[3px] text-ink-soft/50 leading-none self-center">
                                    +{skillChips.length - 5}
                                </span>
                            )}
                        </div>
                    )}

                    {/* 푸터 */}
                    {footerParts.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-line">
                            <span className="text-[10px] font-medium text-ink-soft/50 tracking-widest uppercase">
                                {footerParts.join(' · ')}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
};
