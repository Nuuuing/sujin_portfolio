interface SplashCardProps {
    title?: string;
    children?: React.ReactNode;
    showDot?: boolean;
    className?: string;
}

export const SplashCard = (props: SplashCardProps) => {
    const { title, children, showDot = false, className = '' } = props;

    return (
        <div
            className={`flex flex-col rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg min-h-[80px] sm:min-h-[100px] bg-card-soft ${className}`}
        >
            {title && (
                <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                    {showDot && <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[var(--taupe)]"></span>}
                    <p className="text-ink text-sm sm:text-base font-semibold">{title}</p>
                </div>
            )}
            <div className="text-left text-ink text-xs sm:text-sm flex-1 flex items-center justify-center">
                {children}
            </div>
        </div>
    )
}