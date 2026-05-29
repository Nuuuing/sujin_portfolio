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
        accent: 'bg-[#72AAFF]'
    },
    [ContentType.IMPROVEMENT]: {
        tagLabel: '향후 개선',
        accent: 'bg-amber-400'
    },
    [ContentType.GENERAL]: {
        tagLabel: '',
        accent: 'bg-slate-300 dark:bg-white/20'
    }
};

// 기본 스타일 (GENERAL)
const defaultStyles = contentTypeStyles[ContentType.GENERAL];

const sectionMeta: Record<string, {
    title: string;
    headingClass: string;
    borderClass: string;
}> = {
    '문제': {
        title: '과제',
        headingClass: 'text-gray-900 dark:text-white',
        borderClass: 'border-gray-300 dark:border-white/15',
    },
    '해결': {
        title: '구현',
        headingClass: 'text-[#72AAFF]',
        borderClass: 'border-[#72AAFF]/40',
    },
    '설계/구현': {
        title: '구현',
        headingClass: 'text-[#72AAFF]',
        borderClass: 'border-[#72AAFF]/40',
    },
    '결과': {
        title: '성과',
        headingClass: 'text-amber-500 dark:text-amber-300',
        borderClass: 'border-amber-400/45',
    },
    '결과/역량': {
        title: '성과',
        headingClass: 'text-amber-500 dark:text-amber-300',
        borderClass: 'border-amber-400/45',
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
            className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-colors hover:border-[#72AAFF]/30 dark:border-white/10 dark:bg-[#151515]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
        >
            <div>
                <div className="border-b border-gray-100 p-5 dark:border-white/10 sm:p-6">
                    <div className="flex flex-wrap items-center gap-3">
                        {styles.tagLabel && (
                            <span className="inline-flex items-center rounded-md border border-[#72AAFF]/20 bg-[#72AAFF]/10 px-2.5 py-1 text-[11px] font-semibold text-[#72AAFF]">
                                {styles.tagLabel}
                            </span>
                        )}
                        <h3 className="text-xl font-semibold leading-tight text-gray-900 dark:text-white sm:text-2xl">
                            {data.midTitle}
                        </h3>
                    </div>
                </div>

                <div className="min-w-0 p-5 sm:p-6">

                    {imageVisible && (
                        <div className="mb-5 overflow-hidden rounded-lg border border-gray-200 dark:border-white/10">
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
                                        className={`min-w-0 rounded-xl border-l-2 bg-gray-50/80 p-4 dark:bg-white/[0.035] sm:p-5 ${meta.borderClass}`}
                                    >
                                        <div className="mb-3 flex items-center gap-2">
                                            <h4 className={`text-sm font-semibold ${meta.headingClass}`}>
                                                {meta.title}
                                            </h4>
                                        </div>
                                        <div className="text-[15px] leading-7 text-gray-600 dark:text-gray-300">
                                            {parseContent(section.content)}
                                        </div>
                                    </section>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="space-y-3 text-[15px] leading-7 text-gray-600 dark:text-gray-300 sm:text-base">
                            {renderContents()}
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
