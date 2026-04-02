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
        <div className={`border-l-2 pl-3 ${isActive ? 'border-[#72AAFF]' : 'border-gray-300 dark:border-gray-600'}`}>
            <div className="flex items-center gap-2 mb-1">
                <span className={`text-sm sm:text-base font-semibold ${isActive ? 'text-[#72AAFF]' : 'text-gray-500 dark:text-gray-400'}`}>
                    {period}
                </span>
                <span className={`text-xs px-1.5 py-0.5 rounded ${isActive ? 'bg-[#72AAFF]/10 text-[#72AAFF]' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
                    {badge}
                </span>
            </div>
            <p className="text-sm sm:text-base font-medium text-gray-800 dark:text-white">{institution}</p>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">{field}</p>
            <p className="text-xs sm:text-xs text-gray-400 dark:text-gray-500 mt-1">{description}</p>
        </div>
    );
};
