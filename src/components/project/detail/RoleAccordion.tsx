'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { contentsT } from '@/features';
import { parseContent } from '@/utils';
import { ImageWithFallback } from '@/components';
import { prepImg } from '@/data';

const CARD_COLORS = ['c-sky', 'c-lime', 'c-yellow', 'c-pink', 'c-mint'];

interface RoleAccordionProps {
    roles: contentsT[];
}

export const RoleAccordion = ({ roles }: RoleAccordionProps) => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const [hiddenImageIndexes, setHiddenImageIndexes] = useState<Set<number>>(new Set());

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="space-y-4">
            {roles.map((role, index) => {
                const isOpen = openIndex === index;
                const showImage = role.imgUrl && role.imgUrl !== '-' && !hiddenImageIndexes.has(index);
                const color = CARD_COLORS[index % CARD_COLORS.length];

                return (
                    <div key={`role-${index}`} className={`${color} card accent-top pt-7 sm:pt-8`}>
                        <button
                            onClick={() => toggleAccordion(index)}
                            aria-expanded={isOpen}
                            className="flex w-full cursor-pointer items-center gap-3.5 text-left"
                        >
                            <span className="fig flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ac-soft text-[1rem] text-ac">
                                {String(index + 1).padStart(2, '0')}
                            </span>
                            <h3 className="flex-1 text-[1.15rem] font-bold leading-snug tracking-[-0.025em] text-ink sm:text-[1.3rem]">
                                {role.midTitle}
                            </h3>
                            <span className="pill pill-soft shrink-0 py-1.5 text-[0.82rem]">
                                {isOpen ? '접기' : '펼치기'}
                            </span>
                        </button>

                        <AnimatePresence initial={false}>
                            {isOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.28, ease: 'easeInOut' }}
                                    className="overflow-hidden"
                                >
                                    <div className="pt-5">
                                        {showImage && (
                                            <div className="img-round mb-4 max-w-xl border border-line">
                                                <ImageWithFallback
                                                    className="h-auto w-full"
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
                                        <div className="space-y-3 rounded-[var(--r-lg)] bg-page p-5 text-[0.96rem] leading-[1.85] text-ink-soft sm:p-6">
                                            {role.contents?.split('\n').filter(Boolean).map((paragraph, idx) => (
                                                <div key={idx}>{parseContent(paragraph)}</div>
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
