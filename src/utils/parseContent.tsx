
// 라벨 스타일 정의
const labelStyles: Record<string, { bg: string; text: string; border: string }> = {
    '문제': { bg: 'bg-red-500/15', text: 'text-red-400', border: 'border-red-500/30' },
    '해결': { bg: 'bg-emerald-500/15', text: 'text-emerald-400', border: 'border-emerald-500/30' },
    '결과': { bg: 'bg-blue-500/15', text: 'text-blue-400', border: 'border-blue-500/30' },
};

export const parseContent = (text: string) => {
    // 문자열 리터럴 \\n 또는 실제 줄바꿈 \n 처리
    // Firestore에서는 \\n으로 저장될 수 있음
    const normalizedText = text.replace(/\\n/g, '\n');

    // 먼저 라벨 체크 (문제/해결/결과)
    const labelMatch = normalizedText.match(/^(문제|해결|결과):\s*/);
    if (labelMatch) {
        const label = labelMatch[1];
        const style = labelStyles[label];
        const content = normalizedText.slice(labelMatch[0].length);

        // 라벨 뒤 내용에서 줄바꿈 처리
        const contentLines = content.split('\n');

        return (
            <span className="flex items-start gap-2">
                <span className={`inline-flex items-center shrink-0 text-xs font-bold px-2 py-0.5 rounded ${style.bg} ${style.text} border ${style.border}`}>
                    {label}
                </span>
                <span className="flex flex-col gap-1">
                    {contentLines.map((line, idx) => (
                        <span key={idx}>{parseBoldText(line)}</span>
                    ))}
                </span>
            </span>
        );
    }

    // 라벨 없는 경우 줄바꿈 처리
    if (normalizedText.includes('\n')) {
        const lines = normalizedText.split('\n');
        return (
            <span className="flex flex-col gap-1">
                {lines.map((line, idx) => (
                    <span key={idx}>{parseBoldText(line)}</span>
                ))}
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
        parts.push(<strong key={match.index} className="text-[#72AAFF]">{match[1]}</strong>);
        lastIndex = regex.lastIndex;
    }
    if (lastIndex < text.length) {
        parts.push(text.substring(lastIndex));
    }
    return parts.length > 0 ? parts : text;
};