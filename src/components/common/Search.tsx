'use client';

import { motion } from "motion/react";

interface SearchProps {
    title: string;
    motionArea?: number[];
    motionIndex?: number;
    motionKey?: string;
    children: React.ReactNode
}

export const Search = (props: SearchProps) => {
    const { title, motionArea, motionIndex, children, motionKey } = props;

    const shouldAnimate = motionArea && motionKey && typeof motionIndex === 'number';

    return (
        <div className="flex items-center mb-4">
            <p className="w-24 p-2 font-extrabold">{title}</p>
            <div className="font-extrabold relative flex justify-center bg-[#353535] rounded-full p-2 gap-2 min-w-[17rem]">
                {shouldAnimate && (
                    <motion.div
                        layoutId={motionKey}
                        className="absolute top-1 bottom-1 w-20 rounded-full bg-black z-0"
                        style={{
                            left: `${motionArea[motionIndex]}rem`
                        }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                )}
                {children}
            </div>
        </div>
    );
}
