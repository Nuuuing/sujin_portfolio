'use client';

import { motion } from "motion/react";

export const ArrowIcon = () => {
    return (
        <motion.div
            animate={{
                y: [10, 0, 10],
                transition: {
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut",
                },
            }}
            className="flex flex-col items-center rotate-180"
        >
            {[...Array(2)].map((_, i) => (
                <svg
                    className="rotate-180"
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="18"
                    viewBox="0 0 28 17"
                    fill="none"
                >
                    <path
                        d="M26 2L14 14L2 2"
                        stroke="#fff"
                        strokeWidth="3"
                        strokeLinecap="round"
                    />
                </svg>
            ))}
        </motion.div>
    )
}