interface SplashCardProps {
    title?: string;
    children?: React.ReactNode;
    showDot?: boolean;
    className?: string;
}

export const SplashCard = (props: SplashCardProps) => {
    const { title, children, className = '' } = props;

    return (
        <div className={`flex flex-col border border-line bg-card-soft p-4 ${className}`}>
            {title && (
                <p className="eyebrow mb-2">{title}</p>
            )}
            <div className="flex-1 text-left text-xs text-ink">
                {children}
            </div>
        </div>
    )
}
