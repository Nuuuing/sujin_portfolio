'use client';

import { motion } from "motion/react";

interface SearchProps {
    title: string;
    motionKey?: string;
    motionArea: number[];
    motionIndex: number;
    children: React.ReactNode;
}

export const Search = ({ title, motionKey, motionArea, motionIndex, children }: SearchProps) => {
 

    return (
      <div className="lg:flex lg:items-center mb-4 sm:w-full">
        <p className="font-extrabold w-24 p-2 whitespace-nowrap">{title}</p>
        <div className="font-extrabold relative flex justify-start sm:justify-center bg-[#f1f1f1] dark:bg-[#353535] rounded-full p-2 gap-2 w-fit max-w-full">
            {motionKey && (
                <motion.div
                    layoutId={motionKey}
                    className="absolute top-1 bottom-1 w-[4.5rem] rounded-full bg-black z-0"
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
};
