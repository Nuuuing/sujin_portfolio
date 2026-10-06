'use client';

import { contentsT, ContentType } from "@/features";
import { parseContent } from "@/utils";
import { motion } from "motion/react";
import { ImageWithFallback } from "@/components";
import { prepImg } from "@/data";
import { useState } from "react";

const CARD_COLORS = ['c-sky', 'c-lime', 'c-yellow', 'c-pink', 'c-mint'];

interface ContentsContainerProps {
    data: contentsT;
    index?: number;
}

const typeLabel: Record<string, string> = {
    [ContentType.TROUBLESHOOT]: '문제 해결',
    [ContentType.IMPROVEMENT]: '향후 개선',
    [ContentType.GENERAL]: '',
};

/** 라벨 → 표시 제목 */
const sectionTitle: Record<string, string> = {
    '문제': '문제',
    '해결': '설계 · 구현',
    '설계/구현': '설계 · 구현',
    '결과': '결과 · 역량',
    '결과/역량': '결과 · 역량',
};

const normalizeContent = (text: string) => text
    .replace(/\\n/g, '\n')
    .replace(/\s+(설계\/구현|결과\/역량|해결|결과):/g, '\n$1:');

const getStructuredSections = (text?: string) => {
    if (!text) return [];

    return normalizeContent(text)
        .split('\n')
        .map(line => line.trim())
        .filter(Boolean)
        .map(line => {
            const match = line.match(/^(문제|해결|설계\/구현|결과|결과\/역량):\s*(.*)$/);
            if (!match) return null;
            return { label: match[1], content: match[2] };
        })
        .filter((section): section is { label: string; content: string } => Boolean(section));
};

export const ContentsContainer = ({ data, index = 0 }: ContentsContainerProps) => {
    const contentType = data.contentType || ContentType.GENERAL;
    const label = typeLabel[contentType] ?? '';
    const [imageVisible, setImageVisible] = useState(Boolean(data.imgUrl && data.imgUrl !== '-'));
    const structuredSections = getStructuredSections(data.contents);
    const hasStructuredFlow = structuredSections.length >= 2;
    const color = CARD_COLORS[index % CARD_COLORS.length];

    return (
        <motion.div
            className={`${color} card accent-top pt-7 sm:pt-8`}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.1 }}
        >
            <div className="mb-5">
                {label && <span className="tag mb-2.5 inline-flex">{label}</span>}
                <h3 className="text-[1.15rem] font-bold leading-snug tracking-[-0.025em] text-ink sm:text-[1.3rem]">
                    {data.midTitle}
                </h3>
            </div>

            {imageVisible && (
                <div className="img-round mb-4 border border-line">
                    <ImageWithFallback
                        className="h-auto w-full"
                        src={data.imgUrl || ''}
                        fallbackSrc={prepImg}
                        alt={data.midTitle + ' Img'}
                        width={600}
                        height={400}
                        hideOnError
                        onHidden={() => setImageVisible(false)}
                    />
                </div>
            )}

            {hasStructuredFlow ? (
                <div className="grid gap-3 lg:grid-cols-3">
                    {structuredSections.map((section, i) => {
                        const title = sectionTitle[section.label] ?? section.label;
                        const isOutcome = title === '결과 · 역량';

                        return (
                            <section
                                key={`${section.label}-${i}`}
                                className={`min-w-0 rounded-[var(--r-lg)] p-5 ${isOutcome ? 'bg-ac-soft' : 'bg-page'}`}
                            >
                                <span className={`card-label mb-2 ${isOutcome ? 'text-ac' : ''}`}>{title}</span>
                                <div className={`text-[0.95rem] leading-[1.85] ${isOutcome ? 'text-ink' : 'text-ink-soft'}`}>
                                    {parseContent(section.content)}
                                </div>
                            </section>
                        );
                    })}
                </div>
            ) : (
                <div className="space-y-3 rounded-[var(--r-lg)] bg-page p-5 text-[0.96rem] leading-[1.85] text-ink-soft sm:p-6">
                    {data.contents?.split('\n').filter(Boolean).map((paragraph: string, idx: number) => (
                        <div key={idx}>{parseContent(paragraph)}</div>
                    ))}
                </div>
            )}
        </motion.div>
    );
}
