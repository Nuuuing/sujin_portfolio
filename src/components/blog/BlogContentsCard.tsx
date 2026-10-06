import { BlogPostT } from "@/features/blog"

const COLORS = ['c-sky', 'c-lime', 'c-yellow', 'c-pink', 'c-mint']

interface BlogContentsCardProps {
    post: BlogPostT
    index?: number
}

/** 블로그 글 카드. 색은 순서대로 돌아간다 */
export const BlogContentsCard = ({ post, index = 0 }: BlogContentsCardProps) => {
    const color = COLORS[index % COLORS.length]

    return (
        <a
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`${color} card card-hover group flex h-full flex-col gap-3`}
        >
            <div className="flex items-start justify-between gap-3">
                {post.categories && post.categories.length > 0 ? (
                    <span className="tag">{post.categories[0]}</span>
                ) : (
                    <span className="tag">글</span>
                )}
                <span
                    className="mt-0.5 text-[1.05rem] leading-none text-ink-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden
                >
                    ↗
                </span>
            </div>

            <h3 className="line-clamp-2 text-[1.08rem] font-bold leading-snug tracking-[-0.02em] text-ink">
                {post.title}
            </h3>

            {post.summary && (
                <p className="line-clamp-3 text-[0.9rem] leading-[1.7] text-ink-soft">
                    {post.summary}
                </p>
            )}

            <p className="tnum mt-auto pt-1 text-[0.85rem] text-ink-mute">{post.date}</p>
        </a>
    )
}
