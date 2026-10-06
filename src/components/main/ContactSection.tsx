'use client'

import { motion } from "motion/react"
import { SectionHead } from "@/components/common"

const CONTACTS = [
    {
        label: '메일',
        script: 'mail',
        value: 'su_042@daum.net',
        href: 'mailto:su_042@daum.net',
        color: 'c-pink',
    },
    {
        label: '깃헙',
        script: 'code',
        value: 'github.com/Nuuuing',
        href: 'https://github.com/Nuuuing',
        color: 'c-sky',
        external: true,
    },
    {
        label: '블로그',
        script: 'notes',
        value: 'nuu-stradamus.tistory.com',
        href: 'https://nuu-stradamus.tistory.com/',
        color: 'c-mint',
        external: true,
    },
]

export const ContactSection = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full"
        >
            <SectionHead title="연락처" script="say hi" color="c-pink" />

            <div className="grid gap-3 sm:grid-cols-3">
                {CONTACTS.map((c) => (
                    <a
                        key={c.label}
                        href={c.href}
                        target={c.external ? '_blank' : undefined}
                        rel={c.external ? 'noopener noreferrer' : undefined}
                        className={`${c.color} card card-hover group flex flex-col gap-2`}
                    >
                        <div className="flex items-baseline justify-between gap-3">
                            <span className="tag">{c.label}</span>
                            <span className="script text-[1.4rem] text-ac">{c.script}</span>
                        </div>
                        <p className="tnum break-all text-[1rem] font-semibold leading-snug text-ink">
                            {c.value}
                        </p>
                        <span className="mt-1 inline-flex items-center gap-1 text-[0.88rem] font-semibold text-ac">
                            열기
                            <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>↗</span>
                        </span>
                    </a>
                ))}
            </div>

            <p className="mt-4 text-center text-[0.95rem] text-ink-soft">
                새로운 기회와 협업에 항상 열려 있습니다. 편하게 연락 주세요.
            </p>
        </motion.div>
    )
}
