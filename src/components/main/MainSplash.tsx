'use client'

import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { getDocs, getPreviewUrl, DocsDataT } from "@/features/docs"
import { CareerT } from "@/features"
import { getCareers } from "@/utils"
import { formatDuration, getCareerStats } from "@/utils/career"

const EDU = [
    { period: '2023.08 — 2027.02', badge: '학사 · 졸업예정', name: '한국방송통신대학', field: '컴퓨터과학', color: 'c-sky' },
    { period: '2024.05 — 2025.01', badge: '수료', name: '디벨로켓', field: '메타버스 플랫폼 게임 개발자과정', color: 'c-lime' },
    { period: '2016.03 — 2018.02', badge: '전문학사', name: '수원여자대학', field: '모바일미디어 (SW)', color: 'c-pink' },
]

const SKILLS = [
    'TypeScript', 'React', 'Next.js', 'ReactQuery', 'Zustand', 'Tailwind CSS',
    'C#', 'ASP.NET MVC', 'Java', 'Spring Boot', 'Flutter',
    'MSSQL', 'MySQL', 'Oracle', 'PostgreSQL',
    'AWS', 'Linux', 'Jenkins', 'GitHub Actions', 'Firebase', 'Git',
]

const DOT_COLORS = ['var(--c-sky)', 'var(--c-lime)', 'var(--c-yellow)', 'var(--c-pink)', 'var(--c-mint)']

/** 레퍼런스의 2색 점 묶음 */
const Dots = ({ a = 0, b = 1, row = false }: { a?: number; b?: number; row?: boolean }) => (
    <span className={`dots ${row ? 'dots-row' : ''}`} aria-hidden>
        <i style={{ background: DOT_COLORS[a % DOT_COLORS.length] }} />
        <i style={{ background: DOT_COLORS[b % DOT_COLORS.length] }} />
    </span>
)

interface Stat {
    value: string
    label: string
    caption?: string
    color: string
}

export const MainSplash = () => {
    const [docsData, setDocsData] = useState<DocsDataT>({ resume: null, portfolio: null })
    const [careers, setCareers] = useState<CareerT[]>([])

    useEffect(() => {
        getDocs().then(setDocsData)
        getCareers().then(setCareers)
    }, [])

    const docUrl = (docsData.portfolio || docsData.resume)
        ? getPreviewUrl((docsData.portfolio || docsData.resume)!.url)
        : null

    const sorted = careers.slice().sort((a, b) => (b.startTerm || '').localeCompare(a.startTerm || ''))
    const current = sorted[0]

    const stats: Stat[] = (() => {
        if (careers.length === 0) return []
        const s = getCareerStats(careers)
        const palette = ['c-sky', 'c-lime', 'c-yellow']

        // 회사마다 대표 지표 1개씩. 어느 것이 올라올지는 Firestore metrics 배열의 첫 항목이 결정한다.
        const fromData = sorted
            .map((c) => (c.metrics ?? [])[0])
            .filter((m): m is NonNullable<typeof m> => Boolean(m))
            .slice(0, 2)
            .map((m) => ({ value: m.value, label: m.label, caption: m.caption }))

        return [
            { value: formatDuration(s.totalMonths), label: `경력 · 회사 ${s.companyCount}곳`, caption: `${s.firstTerm}부터` },
            ...fromData,
        ].slice(0, 3).map((x, i) => ({ ...x, color: palette[i] }))
    })()

    return (
        <div className="w-full">
            {/* ── 히어로 ─────────────────────────── */}
            <section className="text-center">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-wrap items-center justify-center gap-1.5"
                >
                    <span className="tag c-sky">#프론트엔드</span>
                    <span className="tag c-lime">#백엔드</span>
                    <span className="tag c-pink">#운영까지</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="c-sky mx-auto mt-5 max-w-[15em] text-[2.2rem] font-semibold leading-[1.22] tracking-[-0.025em] text-ink sm:text-[3rem] lg:text-[3.6rem]"
                >
                    요구사항 분석부터{' '}
                    <span className="underline-wavy">DB 프로시저</span>까지
                    <br className="hidden sm:block" />{' '}
                    <span className="script text-[1.35em] text-[var(--c-lime)]">one flow</span>
                    로 만듭니다
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-7 flex flex-wrap items-center justify-center gap-2"
                >
                    {docUrl && (
                        <a href={docUrl} target="_blank" rel="noopener noreferrer" className="pill pill-solid c-sky">
                            포트폴리오 보기 <span aria-hidden>↗</span>
                        </a>
                    )}
                    <a href="mailto:su_042@daum.net" className="pill pill-solid c-lime">
                        연락하기 <span aria-hidden>↗</span>
                    </a>
                    <a href="https://github.com/Nuuuing" target="_blank" rel="noopener noreferrer" className="pill pill-line">
                        GitHub
                    </a>
                </motion.div>
            </section>

            {/* ── 벤토 그리드 ────────────────────── */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35 }}
                className="mt-10 grid gap-3 sm:mt-14 lg:grid-cols-[1.1fr_1.15fr_1fr]"
            >
                {/* 좌: 현재 소속 — 따옴표 장식 */}
                <div className="card c-sky card-hover flex flex-col justify-between gap-4">
                    <div>
                        <span className="quote-mark">&ldquo;</span>
                        {current && (
                            <>
                                <div className="mt-1 flex items-center gap-2">
                                    <span className="tag">{current.endTerm ? '최근 경력' : '재직 중'}</span>
                                    <Dots a={0} b={1} row />
                                </div>
                                <h2 className="mt-2.5 text-[1.55rem] font-bold leading-tight tracking-[-0.025em] text-ink">
                                    {current.company}
                                </h2>
                                <p className="mt-0.5 text-[0.95rem] text-ink-soft">
                                    {current.team && `${current.team} · `}{current.position}
                                </p>
                            </>
                        )}
                        <p className="mt-4 text-[0.95rem] leading-[1.75] text-ink-soft">
                            공공 SI/SM에서 시작해 사내 업무 시스템 재구축과 결제 연동을 거쳐,
                            지금은 자사 서비스와 고객사 플랫폼의 개발·운영·배포를 함께 맡고 있습니다.
                        </p>
                    </div>
                    <p className="text-[0.88rem] text-ink-mute">su_042@daum.net</p>
                </div>

                {/* 중앙: 지표 스택 */}
                <div className="grid content-start gap-3">
                    {stats.map((s, i) => (
                        <div
                            key={`${s.label}-${i}`}
                            className={`card card-sm card-hover flex items-center justify-between gap-4 ${s.color}`}
                        >
                            <div className="flex min-w-0 items-center gap-3">
                                <Dots a={i} b={i + 1} />
                                <div className="min-w-0">
                                    <p className="text-[0.95rem] font-semibold text-ink">{s.label}</p>
                                    {s.caption && (
                                        <p className="mt-0.5 text-[0.85rem] leading-snug text-ink-mute">{s.caption}</p>
                                    )}
                                </div>
                            </div>
                            <span className="fig shrink-0 text-[1.75rem] text-ac sm:text-[2rem]">{s.value}</span>
                        </div>
                    ))}
                </div>

                {/* 우: 학력 */}
                <div className="card">
                    <div className="flex items-baseline justify-between">
                        <p className="eyebrow">학력 · 교육</p>
                        <span className="script text-[1.5rem] text-[var(--c-pink)]">study</span>
                    </div>
                    <ul className="mt-2 space-y-2.5">
                        {EDU.map((e, i) => (
                            <li key={e.name} className={`${e.color} ${i > 0 ? 'rule pt-2.5' : ''}`}>
                                <div className="flex items-baseline justify-between gap-3">
                                    <p className="text-[1rem] font-semibold text-ink">{e.name}</p>
                                    <span className="tag shrink-0">{e.badge}</span>
                                </div>
                                <p className="tnum mt-0.5 text-[0.85rem] text-ink-mute">{e.period}</p>
                                <p className="mt-0.5 text-[0.88rem] leading-snug text-ink-soft">{e.field}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </motion.section>

            {/* ── 스킬 마키 ──────────────────────── */}
            <div className="marquee mt-10 rounded-[var(--r-pill)] sm:mt-14">
                <div className="marquee-track">
                    {[...SKILLS, ...SKILLS].map((skill, i) => (
                        <span key={i} className="flex items-center gap-2.5 text-[0.92rem] font-semibold text-ink-soft">
                            {skill}
                            <i
                                className="block h-1.5 w-1.5 rounded-full"
                                style={{ background: DOT_COLORS[i % DOT_COLORS.length] }}
                                aria-hidden
                            />
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}
