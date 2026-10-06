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
        <div className={`border-l-2 pl-3 ${isActive ? 'border-ac' : 'border-line-strong'}`}>
            <div className="flex items-center gap-2 mb-1">
                <span className={`tnum text-[0.82rem] font-semibold ${isActive ? 'text-ac' : 'text-ink-soft'}`}>
                    {period}
                </span>
                <span className="eyebrow">{badge}</span>
            </div>
            <p className="text-[1.02rem] font-semibold text-ink">{institution}</p>
            <p className="mt-0.5 text-[0.88rem] text-ink-soft">{field}</p>
            <p className="mt-1 text-[0.82rem] text-ink-mute">{description}</p>
        </div>
    );
};
