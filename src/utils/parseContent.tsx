
// 라벨 스타일 정의
const labelStyles: Record<string, { bg: string; text: string; border: string }> = {
    '문제': { bg: 'bg-[var(--taupe)]/8', text: 'text-[var(--taupe)]', border: 'border-[var(--taupe)]/25' },
    '해결': { bg: 'bg-[var(--taupe)]/10', text: 'text-[var(--taupe)]', border: 'border-[var(--taupe)]/20' },
    '설계/구현': { bg: 'bg-[var(--taupe)]/10', text: 'text-[var(--taupe)]', border: 'border-[var(--taupe)]/20' },
    '결과': { bg: 'bg-[var(--sage)]/22', text: 'text-[var(--taupe)]', border: 'border-[var(--sage)]/45' },
    '결과/역량': { bg: 'bg-[var(--sage)]/22', text: 'text-[var(--taupe)]', border: 'border-[var(--sage)]/45' },
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
        parts.push(<strong key={match.index} className="font-semibold text-ink">{match[1]}</strong>);
        lastIndex = regex.lastIndex;
    }
    if (lastIndex < text.length) {
        parts.push(text.substring(lastIndex));
    }
    return parts.length > 0 ? parts : text;
};
