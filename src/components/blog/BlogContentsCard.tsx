import { BaseCard } from '../common'

interface BlogContentsCardProps {
    title: string
    date: string
    link: string
    thumbnail?: string
    categories?: string[]
}

export const BlogContentsCard = ({ title, date, link, thumbnail, categories }: BlogContentsCardProps) => {
    return (
        <a href={link} target="_blank" rel="noopener noreferrer" className="block h-full">
            <BaseCard
                backgroundImage={thumbnail}
                className="h-full min-h-[160px] sm:min-h-[180px] lg:min-h-[200px] group/card border border-transparent hover:border-[var(--taupe)]/30 transition-all duration-300"
            >
                <div className="flex flex-col h-full relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--taupe)]/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 rounded-xl" />

                    <div className="relative z-10 flex-1">
                        {categories && categories.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mb-2 sm:mb-2.5">
                                {categories.map((cat, idx) => (
                                    <span
                                        key={idx}
                                        className="text-xs sm:text-sm px-2 py-0.5 rounded-full bg-[var(--sage)]/25 text-ink-soft group-hover/card:bg-[var(--sage)]/40 transition-colors"
                                    >
                                        {cat}
                                    </span>
                                ))}
                            </div>
                        )}
                        <h3 className="font-bold text-base sm:text-lg lg:text-xl line-clamp-2 mb-1 sm:mb-1.5 group-hover/card:text-[var(--taupe)] transition-colors">{title}</h3>
                        <p className="text-sm sm:text-base text-ink-soft">{date}</p>
                    </div>
                    <p className="text-sm sm:text-base text-ink-soft/60 group-hover/card:text-[var(--taupe)] transition-colors flex items-center gap-1 relative z-10 mt-auto pt-3">
                        자세히보기
                        <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover/card:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </p>
                </div>
            </BaseCard>
        </a>
    )
}
