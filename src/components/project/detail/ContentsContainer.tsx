'use client';

import { contentsT, ContentType } from "@/features";
import { parseContent } from "@/utils";
import { motion } from "motion/react";
import { ImageWithFallback } from "@/components";
import { prepImg } from "@/data";
import { useState } from "react";

interface ContentsContainerProps {
    data: contentsT;
}

const contentTypeStyles: Record<string, {
    tagLabel: string;
    accent: string;
}> = {
    [ContentType.TROUBLESHOOT]: {
        tagLabel: '문제 해결',
        accent: 'bg-[var(--taupe)]'
    },
    [ContentType.IMPROVEMENT]: {
        tagLabel: '향후 개선',
        accent: 'bg-[var(--taupe)]'
    },
    [ContentType.GENERAL]: {
        tagLabel: '',
        accent: 'bg-[var(--taupe)]/40'
    }
};

// 기본 스타일 (GENERAL)
const defaultStyles = contentTypeStyles[ContentType.GENERAL];

const sectionMeta: Record<string, {
    title: string;
    headingClass: string;
    borderClass: string;
    dotClass: string;
}> = {
    '문제': {
        title: '과제',
        headingClass: 'text-ink',
        borderClass: 'border-line-strong',
        dotClass: 'bg-line-strong',
    },
    '해결': {
        title: '구현',
        headingClass: 'text-[var(--taupe)]',
        borderClass: 'border-[var(--taupe)]/40',
        dotClass: 'bg-[var(--taupe)]',
    },
    '설계/구현': {
        title: '구현',
        headingClass: 'text-[var(--taupe)]',
        borderClass: 'border-[var(--taupe)]/40',
        dotClass: 'bg-[var(--taupe)]',
    },
    '결과': {
        title: '성과',
        headingClass: 'text-[var(--taupe)]',
        borderClass: 'border-[var(--sage)]/45',
        dotClass: 'bg-[var(--sage)]',
    },
    '결과/역량': {
        title: '성과',
        headingClass: 'text-[var(--taupe)]',
        borderClass: 'border-[var(--sage)]/45',
        dotClass: 'bg-[var(--sage)]',
    },
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
            return {
                label: match[1],
                content: match[2],
            };
        })
        .filter((section): section is { label: string; content: string } => Boolean(section));
};

export const ContentsContainer = ({ data }: ContentsContainerProps) => {
    const contentType = data.contentType || ContentType.GENERAL;
    const styles = contentTypeStyles[contentType] || defaultStyles;
    const [imageVisible, setImageVisible] = useState(Boolean(data.imgUrl && data.imgUrl !== '-'));
    const structuredSections = getStructuredSections(data.contents);
    const hasStructuredFlow = structuredSections.length >= 2;

    const renderContents = () => {
        if (!data?.contents) return null;

        return data.contents.split('\n').map((paragraph: string, idx: number) => (
            <p key={idx} className="leading-relaxed">
                {parseContent(paragraph)}
            </p>
        ));
    };

    return (
        <motion.div
            className="overflow-hidden rounded-2xl border border-line bg-[var(--bg-card)] shadow-sm transition-colors hover:border-[var(--taupe)]/30"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
        >
            <div>
                <div className="border-b border-line p-5 sm:p-6">
                    <div className="flex flex-wrap items-center gap-3">
                        {styles.tagLabel && (
                            <span className="inline-flex items-center rounded-md border border-[var(--taupe)]/20 bg-[var(--taupe)]/10 px-2.5 py-1 text-[11px] font-semibold text-[var(--taupe)]">
                                {styles.tagLabel}
                            </span>
                        )}
                        <h3 className="text-xl font-semibold leading-tight text-ink sm:text-2xl">
                            {data.midTitle}
                        </h3>
                    </div>
                </div>

                <div className="min-w-0 p-5 sm:p-6">

                    {imageVisible && (
                        <div className="mb-5 overflow-hidden rounded-lg border border-line">
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
                            {structuredSections.map((section, index) => {
                                const meta = sectionMeta[section.label] || sectionMeta['문제'];

                                return (
                                    <section
                                        key={`${section.label}-${index}`}
                                        className={`min-w-0 rounded-xl border-l-2 bg-cream/80 p-4 sm:p-5 ${meta.borderClass}`}
                                    >
                                        <div className="mb-3 flex items-center gap-2">
                                            <span className={`h-1.5 w-1.5 rounded-full ${meta.dotClass}`} />
                                            <h4 className={`text-xs font-bold uppercase tracking-wide ${meta.headingClass}`}>
                                                {meta.title}
                                            </h4>
                                        </div>
                                        <div className="text-[15px] leading-7 text-ink-soft">
                                            {parseContent(section.content)}
                                        </div>
                                    </section>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="space-y-3 text-[15px] leading-7 text-ink-soft sm:text-base">
                            {renderContents()}
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
