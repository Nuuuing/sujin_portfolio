interface ExperienceItemProps {
    period: string;
    badge: string;
    institution: string;
    field: string;
    description: string;
    isActive?: boolean;
}

export const ExperienceItem = ({
    period,
    badge,
    institution,
    field,
    description,
    isActive = false,
}: ExperienceItemProps) => {
    return (
        <div className={`border-l-2 pl-3 ${isActive ? 'border-[var(--taupe)]' : 'border-line-strong'}`}>
            <div className="flex items-center gap-2 mb-1">
                <span className={`text-sm font-semibold ${isActive ? 'text-taupe' : 'text-ink-soft'}`}>
                    {period}
                </span>
                <span className={`text-xs px-1.5 py-0.5 rounded ${isActive ? 'bg-[var(--taupe)]/12 text-taupe' : 'bg-cream text-ink-soft'}`}>
                    {badge}
                </span>
            </div>
            <p className="text-sm sm:text-base font-medium text-ink">{institution}</p>
            <p className="text-xs sm:text-sm text-ink-soft mt-0.5">{field}</p>
            <p className="text-xs text-ink-soft/70 mt-1">{description}</p>
        </div>
    );
};
