
// 라벨 스타일 정의
const labelStyles: Record<string, { bg: string; text: string; border: string }> = {
    '문제': { bg: 'bg-slate-100 dark:bg-white/5', text: 'text-slate-700 dark:text-slate-200', border: 'border-slate-200 dark:border-white/10' },
    '해결': { bg: 'bg-[#72AAFF]/10', text: 'text-[#72AAFF]', border: 'border-[#72AAFF]/20' },
    '설계/구현': { bg: 'bg-[#72AAFF]/10', text: 'text-[#72AAFF]', border: 'border-[#72AAFF]/20' },
    '결과': { bg: 'bg-amber-400/10', text: 'text-amber-500 dark:text-amber-300', border: 'border-amber-400/20' },
    '결과/역량': { bg: 'bg-amber-400/10', text: 'text-amber-500 dark:text-amber-300', border: 'border-amber-400/20' },
};

const labelText: Record<string, string> = {
    '문제': '과제',
    '해결': '구현',
    '설계/구현': '구현',
    '결과': '성과',
    '결과/역량': '성과',
};

export const parseContent = (text: string) => {
    // 문자열 리터럴 \\n 또는 실제 줄바꿈 \n 처리
    // Firestore에서는 \\n으로 저장될 수 있음
    const normalizedText = text
        .replace(/\\n/g, '\n')
        .replace(/\s+(설계\/구현|결과\/역량|해결|결과):/g, '\n$1:');

    if (normalizedText.includes('\n')) {
        const lines = normalizedText.split('\n').filter(Boolean);
        return (
            <span className="flex flex-col gap-2">
                {lines.map((line, idx) => (
                    <span key={idx}>{parseContent(line)}</span>
                ))}
            </span>
        );
    }

    // 먼저 라벨 체크 (문제/해결/결과)
    const labelMatch = normalizedText.match(/^(문제|해결|설계\/구현|결과|결과\/역량):\s*/);
    if (labelMatch) {
        const label = labelMatch[1];
        const style = labelStyles[label];
        const content = normalizedText.slice(labelMatch[0].length);

        return (
            <span className="flex flex-col gap-1.5 sm:flex-row sm:items-start sm:gap-3">
                <span className={`inline-flex w-fit shrink-0 items-center text-[11px] font-semibold px-2.5 py-1 rounded-md ${style.bg} ${style.text} border ${style.border}`}>
                    {labelText[label] || label}
                </span>
                <span className="min-w-0 leading-relaxed">{parseBoldText(content)}</span>
            </span>
        );
    }

    return parseBoldText(normalizedText);
};

// **강조** 패턴 파싱
const parseBoldText = (text: string) => {
    const regex = /\*\*(.*?)\*\*/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            parts.push(text.substring(lastIndex, match.index));
        }
        parts.push(<strong key={match.index} className="font-semibold text-gray-900 dark:text-white">{match[1]}</strong>);
        lastIndex = regex.lastIndex;
    }
    if (lastIndex < text.length) {
        parts.push(text.substring(lastIndex));
    }
    return parts.length > 0 ? parts : text;
};
