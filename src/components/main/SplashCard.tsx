interface SplashCardProps {
    title?: string;
    children?: React.ReactNode;
    bgColor?: string;
    showDot?: boolean;
    className?: string;
}

export const SplashCard = (props: SplashCardProps) => {
    const { title, children, bgColor = '#333335', showDot = false, className = '' } = props;

    return (
        <div
            className={`flex flex-col rounded-2xl p-5 md:p-6 ${className}`}
            style={{ backgroundColor: bgColor }}>
            {title && (
                <div className="flex items-center gap-2 mb-3">
                    {showDot && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                    <p className="text-white text-sm font-medium">{title}</p>
                </div>
            )}
            <div className="text-left text-white text-sm">
                {children}
            </div>
        </div>
    )
}