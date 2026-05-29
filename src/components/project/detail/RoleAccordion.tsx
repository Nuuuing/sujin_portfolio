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
    const [hiddenImageIndexes, setHiddenImageIndexes] = useState<Set<number>>(new Set());

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="space-y-4">
            {roles.map((role, index) => {
                const isOpen = openIndex === index;
                const showImage = role.imgUrl && role.imgUrl !== '-' && !hiddenImageIndexes.has(index);

                return (
                    <div
                        key={`role-${index}`}
                        className={`overflow-hidden rounded-xl border bg-white shadow-sm transition-colors duration-300 dark:bg-[#161616] ${isOpen
                            ? 'border-[#72AAFF]/35'
                            : 'border-gray-200 hover:border-[#72AAFF]/25 dark:border-white/10 dark:hover:border-[#72AAFF]/25'
                            }`}
                    >
                        {/* 아코디언 헤더 */}
                        <button
                            onClick={() => toggleAccordion(index)}
                            className="group flex w-full cursor-pointer items-center gap-4 p-5 text-left"
                        >
                            <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md text-xs font-semibold transition-colors ${isOpen
                                ? 'bg-[#72AAFF]/15 text-[#72AAFF]'
                                : 'bg-gray-100 text-gray-500 group-hover:bg-[#72AAFF]/10 group-hover:text-[#72AAFF] dark:bg-white/5 dark:text-gray-400'
                                }`}>
                                {String(index + 1).padStart(2, '0')}
                            </div>
                            <h3 className={`flex-1 text-base font-semibold leading-tight transition-colors sm:text-lg ${isOpen ? 'text-gray-900 dark:text-white' : 'text-gray-700 group-hover:text-gray-900 dark:text-gray-300 dark:group-hover:text-white'
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
                                    <div className="border-t border-gray-100 px-5 pb-5 pt-5 dark:border-white/10 sm:pl-[68px]">
                                        {showImage && (
                                            <div className="mb-4 max-w-lg overflow-hidden rounded-lg border border-gray-200 dark:border-white/10">
                                                <ImageWithFallback
                                                    className="w-full h-auto"
                                                    src={role.imgUrl || ''}
                                                    fallbackSrc={prepImg}
                                                    alt={`${role.midTitle}`}
                                                    width={500}
                                                    height={300}
                                                    hideOnError
                                                    onHidden={() => setHiddenImageIndexes(prev => new Set(prev).add(index))}
                                                />
                                            </div>
                                        )}
                                        <div className="space-y-3 text-[15px] leading-7 text-gray-600 dark:text-gray-300 sm:text-base">
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
