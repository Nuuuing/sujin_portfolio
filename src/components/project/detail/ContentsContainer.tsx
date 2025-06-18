'use client'

import { contentsT } from "@/types";
import { parseContent } from "@/utils";
import { motion } from "motion/react";
import Image from 'next/image';

interface ContentsProps {
    data: contentsT;
}

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