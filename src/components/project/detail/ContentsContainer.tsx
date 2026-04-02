'use client';

import { contentsT, ContentType } from "@/features";
import { parseContent } from "@/utils";
import { motion } from "motion/react";
import { ImageWithFallback } from "@/components";
import { prepImg } from "@/data";

interface ContentsContainerProps {
    data: contentsT;
}

// 콘텐츠 타입별 스타일 설정
const contentTypeStyles: Record<string, {
    borderColor: string;
    hoverBorderColor: string;
    bgColor: string;
    dotColor: string;
    tagBg: string;
    tagText: string;
    tagLabel: string;
    icon: React.ReactNode;
}> = {
    [ContentType.TROUBLESHOOT]: {
        borderColor: 'border-emerald-500/30',
        hoverBorderColor: 'hover:border-emerald-500/50',
        bgColor: 'bg-emerald-500/5',
        dotColor: 'bg-emerald-400',
        tagBg: 'bg-emerald-500/15',
        tagText: 'text-emerald-400',
        tagLabel: '고민 → 해결',
        icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
        )
    },
    [ContentType.IMPROVEMENT]: {
        borderColor: 'border-amber-500/30',
        hoverBorderColor: 'hover:border-amber-500/50',
        bgColor: 'bg-amber-500/5',
        dotColor: 'bg-amber-400',
        tagBg: 'bg-amber-500/15',
        tagText: 'text-amber-400',
        tagLabel: '향후 개선',
        icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
        )
    },
    [ContentType.GENERAL]: {
        borderColor: 'border-gray-200 dark:border-gray-800',
        hoverBorderColor: 'hover:border-gray-300 dark:hover:border-gray-700',
        bgColor: 'bg-gray-50 dark:bg-gray-800/30',
        dotColor: 'bg-[#72AAFF]',
        tagBg: '',
        tagText: '',
        tagLabel: '',
        icon: null
    }
};

// 기본 스타일 (GENERAL)
const defaultStyles = contentTypeStyles[ContentType.GENERAL];

export const ContentsContainer = ({ data }: ContentsContainerProps) => {
    const contentType = data.contentType || ContentType.GENERAL;
    const styles = contentTypeStyles[contentType] || defaultStyles;

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
            className={`p-6 rounded-2xl ${styles.bgColor} border ${styles.borderColor} ${styles.hoverBorderColor} transition-all`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
        >
            {/* 콘텐츠 타입 태그 (GENERAL이 아닌 경우만 표시) */}
            {contentType !== ContentType.GENERAL && styles.tagLabel && (
                <div className="mb-4">
                    <span className={`inline-flex items-center gap-2 text-sm font-semibold px-3 py-1.5 rounded-full ${styles.tagBg} ${styles.tagText}`}>
                        {styles.icon}
                        {styles.tagLabel}
                    </span>
                </div>
            )}

            {data?.imgUrl && (
                <div className="mb-6 rounded-xl overflow-hidden">
                    <ImageWithFallback
                        className="w-full h-auto"
                        src={data.imgUrl}
                        fallbackSrc={prepImg}
                        alt={data.midTitle + ' Img'}
                        width={600}
                        height={400}
                    />
                </div>
            )}
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${styles.dotColor}`}></span>
                {data.midTitle}
            </h3>
            <div className="text-gray-300 text-base sm:text-lg leading-relaxed space-y-3">
                {renderContents()}
            </div>
        </motion.div>
    );
}