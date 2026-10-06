import { BlogPostT } from "@/features/blog"

const COLORS = ['c-sky', 'c-lime', 'c-yellow', 'c-pink', 'c-mint']

interface BlogContentsCardProps {
    post: BlogPostT
    index?: number
}

/** 제목에서 앞머리 대괄호 분류를 떼어낸다. "[MSSQL] 쿼리 성능 비교" → { kind: 'MSSQL', title: '쿼리 성능 비교' } */
const splitTitle = (raw: string) => {
    const m = raw.match(/^\s*\[([^\]]{1,20})\]\s*(.+)$/)
    return m ? { kind: m[1].trim(), title: m[2].trim() } : { kind: null, title: raw.trim() }
}

/** 티스토리 카테고리는 "Archive/TroubleShooting" 처럼 경로로 오기도 한다. 끝 조각만 쓴다 */
const lastSegment = (c: string) => c.split('/').pop()?.trim() || c

export const BlogContentsCard = ({ post, index = 0 }: BlogContentsCardProps) => {
    const color = COLORS[index % COLORS.length]
    const { kind, title } = splitTitle(post.title)
    const category = post.categories?.[0] ? lastSegment(post.categories[0]) : null

    return (
        <a
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`${color} card card-hover group flex h-full flex-col gap-3`}
        >
            {/* 제목이 먼저 온다 */}
            <div className="flex items-start justify-between gap-3">
                <h3 className="line-clamp-2 text-[1.12rem] font-bold leading-snug tracking-[-0.025em] text-ink">
                    {title}
                </h3>
                <span
                    className="mt-0.5 shrink-0 text-[1.05rem] leading-none text-ink-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden
                >
                    ↗
                </span>
            </div>

            {post.summary && (
                <p className="line-clamp-3 text-[0.92rem] leading-[1.75] text-ink-soft">
                    {post.summary}
                </p>
            )}

            {/* 분류·날짜는 아래 보조 정보로 */}
            <div className="mt-auto flex flex-wrap items-center gap-x-2.5 gap-y-1 pt-1">
                {kind && <span className="tag">{kind}</span>}
                {category && category !== kind && (
                    <span className="text-[0.85rem] text-ink-mute">{category}</span>
                )}
                <span className="tnum ml-auto text-[0.85rem] text-ink-mute">{post.date}</span>
            </div>
        </a>
    )
}
