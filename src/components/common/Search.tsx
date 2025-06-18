'use client';

import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface SearchProps {
    title: string;
    motionKey?: string;
    motionArea: number[];
    motionIndex: number;
    children: React.ReactNode;
}

export const Search = ({ title, motionKey, motionArea, motionIndex, children }: SearchProps) => {
    const [isSmall, setIsSmall] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsSmall(window.innerWidth < 640); 
        };
        handleResize(); // 초기값 설정
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const left = `${isSmall ? motionArea[motionIndex] * 0.9 : motionArea[motionIndex]}rem`;

    return (
        <div className="mb-6 w-full">
            <p className="font-extrabold mb-2 sm:mb-0 sm:w-24">{title}</p>
            <div className="relative flex flex-wrap justify-start sm:justify-center bg-[#353535] rounded-full p-2 gap-2 w-fit max-w-full">
                {motionKey && (
                    <motion.div
                        layoutId={motionKey}
                        className="absolute top-1 bottom-1 w-[4.5rem] sm:w-20 rounded-full bg-black z-0"
                        style={{ left }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                )}
                {children}
            </div>
        </div>
    );
};
