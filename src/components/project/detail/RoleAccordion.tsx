'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { contentsT } from '@/features';
import { parseContent } from '@/utils';
import { ImageWithFallback } from '@/components';
import { prepImg } from '@/data';

interface RoleAccordionProps {
    roles: contentsT[];
}

export const RoleAccordion = ({ roles }: RoleAccordionProps) => {
    const [openIndex, setOpenIndex] = useState<number | null>(0); // 첫 번째 열림

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="space-y-3">
            {roles.map((role, index) => {
                const isOpen = openIndex === index;

                return (
                    <div
                        key={`role-${index}`}
                        className={`rounded-xl border transition-all duration-300 overflow-hidden ${isOpen
                            ? 'bg-gray-100 dark:bg-gray-900/50 border-[#72AAFF]/30'
                            : 'bg-gray-50 dark:bg-gray-900/30 border-gray-200 dark:border-gray-800/50 hover:border-gray-300 dark:hover:border-gray-700'
                            }`}
                    >
                        {/* 아코디언 헤더 */}
                        <button
                            onClick={() => toggleAccordion(index)}
                            className="w-full flex items-center gap-4 p-4 text-left cursor-pointer group"
                        >
                            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${isOpen
                                ? 'bg-[#72AAFF]/20 text-[#72AAFF]'
                                : 'bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400 group-hover:bg-[#72AAFF]/10 group-hover:text-[#72AAFF]'
                                }`}>
                                {index + 1}
                            </div>
                            <h3 className={`flex-1 text-lg sm:text-xl font-semibold transition-colors ${isOpen ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white'
                                }`}>
                                {role.midTitle}
                            </h3>
                            <motion.svg
                                animate={{ rotate: isOpen ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                                className={`w-5 h-5 transition-colors ${isOpen ? 'text-[#72AAFF]' : 'text-gray-500'
                                    }`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </motion.svg>
                        </button>

                        {/* 아코디언 내용 */}
                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                >
                                    <div className="px-4 pb-5 pt-0 ml-12">
                                        {role.imgUrl && (
                                            <div className="mb-4 rounded-xl overflow-hidden max-w-lg">
                                                <ImageWithFallback
                                                    className="w-full h-auto"
                                                    src={role.imgUrl}
                                                    fallbackSrc={prepImg}
                                                    alt={`${role.midTitle}`}
                                                    width={500}
                                                    height={300}
                                                />
                                            </div>
                                        )}
                                        <div className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed space-y-3">
                                            {role.contents?.split('\n').map((paragraph, idx) => (
                                                <p key={idx}>{parseContent(paragraph)}</p>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );
};
