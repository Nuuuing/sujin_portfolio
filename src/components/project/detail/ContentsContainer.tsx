'use client'

import { contentsT } from "@/types";
import { motion } from "motion/react";
import Image from 'next/image';

interface ContentsProps {
    data: contentsT;
}
const parseContent = (text: string) => {
    const regex = /\*\*(.*?)\*\*/g;  // **강조** 패턴 찾기
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
        // 일반 텍스트
        if (match.index > lastIndex) {
            parts.push(text.substring(lastIndex, match.index));
        }
        // 강조 텍스트
        parts.push(<strong key={match.index} className="text-[#72AAFF]">{match[1]}</strong>);
        lastIndex = regex.lastIndex;
    }
    // 마지막 일반 텍스트
    if (lastIndex < text.length) {
        parts.push(text.substring(lastIndex));
    }
    return parts;
};

export const ContentsContainer = (props: ContentsProps) => {
    const { data } = props;

    const renderContents = () => {
        if (!data?.contents) return null;
        const paragraphs = data.contents.split('\n');
        return paragraphs.map((paragraph, idx) => (
            <p key={idx} className="leading-relaxed">
                {parseContent(paragraph)}
            </p>
        ));
    };

    return (
        <motion.div 
            className="my-[5rem]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
        >
            {data?.imgUrl && (
                <Image
                    className="w-xl h-auto rounded-3xl mb-5 mx-auto"
                    src={`${data.imgUrl}`}
                    alt={data.midTitle + ' Img'}
                    width={500}
                    height={500}
                />
            )}
            <h2 className="text-2xl font-semibold mb-4">▶ {data.midTitle}</h2>
            {renderContents()}
        </motion.div>
    );
}