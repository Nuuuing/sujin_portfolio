'use client'

import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { ExternalLinkIcon, MailIcon, GithubIcon, BlogIcon } from "../common"
import { getDocs, getPreviewUrl, DocsDataT } from "@/features/docs"

const SKILLS = ['TypeScript', 'React', 'Next.js', 'ReactQuery', 'Zustand', 'jQuery', 'Tailwind CSS', 'Motion', 'C#', 'ASP.NET MVC', 'Java', 'Spring Boot', 'JSP', 'Unity', 'OpenAPI', 'MSSQL', 'MySQL', 'Oracle', 'Linux', 'Jenkins', 'GitHub Actions', 'Git', 'Firebase']

const EDU = [
    { period: '2023.08 — 2027.02 졸업예정', badge: '학사', name: '한국방송통신대학', field: '컴퓨터과학', desc: '자료구조, 알고리즘, 운영체제, AI 등 CS' },
    { period: '2024.05 — 2025.01', badge: '수료', name: '디벨로켓', field: '메타버스 플랫폼 게임 개발자과정', desc: 'C#, Unity 프로젝트, AR/XR' },
    { period: '2016.03 — 2018.02', badge: '전문학사', name: '수원여자대학', field: '모바일미디어 (SW)', desc: '웹 기초, DB, Java, Android, CS' },
]

export const MainSplash = () => {
    const [docsData, setDocsData] = useState<DocsDataT>({ resume: null, portfolio: null })

    useEffect(() => {
        getDocs().then(setDocsData)
    }, [])

    const docUrl = (docsData.portfolio || docsData.resume)
        ? getPreviewUrl((docsData.portfolio || docsData.resume)!.url)
        : null

    return (
        <div className="w-full">
            {/* ── HERO ─────────────────────────────────── */}
            <section className="relative w-full">
                {/* 상단 바 */}
                <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-card-soft px-3.5 py-1.5 text-xs tracking-wide text-ink-soft">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--sage)] opacity-70" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--taupe)]" />
                        </span>
                        Frontend &amp; Backend · Open to work
                    </span>
                    <span className="eyebrow">Portfolio</span>
                </div>
                <div className="mt-4 h-px w-full border-t border-line" />

                <div className="mt-12 grid items-center gap-10 lg:mt-16 lg:grid-cols-[1.15fr_0.85fr]">
                    {/* 좌측 타이포 */}
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="font-serif font-medium leading-[0.95] tracking-tight text-taupe text-[3.6rem] sm:text-8xl lg:text-9xl"
                        >
                            KIM SUJIN
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                            className="mt-3 font-serif text-3xl font-light italic tracking-tight text-ink-soft sm:text-4xl"
                        >
                            Crafting Experiences
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.7, delay: 0.45 }}
                            className="mt-5 text-sm leading-relaxed text-ink-soft sm:text-base"
                        >
                            사용자 경험과 운영 효율을 함께 설계합니다
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                            className="mt-8 flex flex-wrap items-center gap-3"
                        >
                            {docUrl && (
                                <a
                                    href={docUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center gap-2 rounded-full bg-[var(--taupe)] px-5 py-2.5 text-sm font-medium text-[var(--bg-card)] transition-all duration-300 hover:gap-3 hover:bg-[var(--ink)]"
                                >
                                    포트폴리오 보기
                                    <ExternalLinkIcon size={14} />
                                </a>
                            )}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.9 }}
                            className="mt-4 flex flex-wrap gap-2"
                        >
                            <a
                                href="mailto:su_042@daum.net"
                                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card-soft px-3.5 py-1.5 text-xs text-ink-soft transition-colors hover:border-line-strong hover:text-ink"
                            >
                                <MailIcon size={12} className="fill-current" />
                                su_042@daum.net
                            </a>
                            <a
                                href="https://github.com/Nuuuing"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card-soft px-3.5 py-1.5 text-xs text-ink-soft transition-colors hover:border-line-strong hover:text-ink"
                            >
                                <GithubIcon size={12} className="fill-current" />
                                GitHub
                            </a>
                            <a
                                href="https://nuu-stradamus.tistory.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card-soft px-3.5 py-1.5 text-xs text-ink-soft transition-colors hover:border-line-strong hover:text-ink"
                            >
                                <BlogIcon size={12} className="fill-current" />
                                Blog
                            </a>
                        </motion.div>
                    </div>

                    {/* 우측 장식 */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.9, delay: 0.35 }}
                        className="relative hidden h-[26rem] items-center justify-center lg:flex"
                    >
                        <motion.div
                            className="h-[24rem] w-[15rem] rounded-full bg-sage"
                            animate={{ y: [0, -12, 0] }}
                            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <div className="absolute bottom-4 left-6 h-36 w-36 rounded-full border border-line-strong" />
                        <motion.span
                            className="absolute right-10 top-10 h-2.5 w-2.5 rounded-full bg-[var(--ink)]"
                            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.6, 1] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </motion.div>
                </div>

                {/* 스킬 마키 */}
                <div className="relative mt-16 overflow-hidden border-y border-line py-4 lg:mt-20">
                    <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[var(--bg)] to-transparent" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[var(--bg)] to-transparent" />
                    <motion.div
                        className="flex w-max gap-10 whitespace-nowrap"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    >
                        {[...SKILLS, ...SKILLS].map((skill, i) => (
                            <span key={i} className="flex items-center gap-10 text-xs uppercase tracking-[0.2em] text-ink-soft/60">
                                {skill}
                                <span className="h-1 w-1 rounded-full bg-[var(--sage)]" />
                            </span>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── Education ── */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="mt-10"
            >
                <p className="eyebrow mb-3">Education</p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {EDU.map((e) => (
                        <div key={e.name} className="rounded-xl border border-line bg-card-soft p-4">
                            <div className="mb-2 flex items-center gap-2">
                                <span className="text-[10px] text-ink-soft/55">{e.period}</span>
                                <span className="rounded bg-[var(--bg)] px-1.5 py-0.5 text-[10px] text-ink-soft">{e.badge}</span>
                            </div>
                            <p className="text-sm font-semibold text-ink">{e.name}</p>
                            <p className="mt-0.5 text-xs text-taupe">{e.field}</p>
                            <p className="mt-1.5 text-xs leading-relaxed text-ink-soft/60">{e.desc}</p>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    )
}
