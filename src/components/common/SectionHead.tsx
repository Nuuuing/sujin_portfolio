interface SectionHeadProps {
    /** 한글 제목 */
    title: string
    /** 제목 옆에 붙는 영문 스크립트 악센트 */
    script?: string
    meta?: string
    action?: React.ReactNode
    /** 색 로테이션 클래스: c-sky / c-lime / c-yellow / c-pink / c-mint */
    color?: string
}

/** 섹션 머리. 컬러 점 + 제목 + 스크립트 악센트, 우측에 보조 정보 */
export const SectionHead = ({ title, script, meta, action, color = 'c-sky' }: SectionHeadProps) => (
    <div className={`${color} mb-6 flex flex-wrap items-end justify-between gap-x-5 gap-y-3`}>
        <div>
            <span className="dots dots-row mb-2.5" aria-hidden>
                <i style={{ background: 'var(--ac)' }} />
                <i style={{ background: 'var(--ac-soft)' }} />
            </span>
            <h2 className="flex flex-wrap items-baseline gap-x-3 text-[1.9rem] font-bold leading-tight tracking-[-0.025em] text-ink sm:text-[2.4rem]">
                {title}
                {script && <span className="script text-[1.45em] text-ac">{script}</span>}
            </h2>
        </div>
        <div className="flex items-center gap-3 pb-1">
            {meta && <p className="tnum text-[0.92rem] text-ink-mute">{meta}</p>}
            {action}
        </div>
    </div>
)
