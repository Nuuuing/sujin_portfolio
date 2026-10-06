/* 라벨 표시명. '성과'(결과)만 포인트 색을 쓴다 */
const labelText: Record<string, string> = {
    '문제': '과제',
    '해결': '구현',
    '설계/구현': '구현',
    '결과': '성과',
    '결과/역량': '성과',
};

const isOutcome = (label: string) => label === '결과' || label === '결과/역량';

export const parseContent = (text: string) => {
    // Firestore에 리터럴 "\n" (역슬래시 + n) 으로 저장되는 경우가 있어 함께 처리
    const normalizedText = text
        .replace(/\\n/g, '\n')
        .replace(/\s+(설계\/구현|결과\/역량|해결|결과):/g, '\n$1:');

    if (normalizedText.includes('\n')) {
        const lines = normalizedText.split('\n').filter(Boolean);
        return (
            <span className="flex flex-col gap-2.5">
                {lines.map((line, idx) => (
                    <span key={idx}>{parseContent(line)}</span>
                ))}
            </span>
        );
    }

    const labelMatch = normalizedText.match(/^(문제|해결|설계\/구현|결과|결과\/역량):\s*/);
    if (labelMatch) {
        const label = labelMatch[1];
        const content = normalizedText.slice(labelMatch[0].length);
        const outcome = isOutcome(label);

        return (
            <span className="flex flex-col gap-1.5 sm:flex-row sm:items-start sm:gap-3">
                <span className={`tag shrink-0 ${outcome ? '' : 'tag-line'}`}>
                    {labelText[label] || label}
                </span>
                <span className="min-w-0 leading-[1.85]">{parseBoldText(content)}</span>
            </span>
        );
    }

    return parseBoldText(normalizedText);
};

/** **강조** 패턴 파싱 */
const parseBoldText = (text: string) => {
    const regex = /\*\*(.*?)\*\*/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            parts.push(text.substring(lastIndex, match.index));
        }
        parts.push(
            <strong key={match.index} className="font-bold text-ink">
                {match[1]}
            </strong>
        );
        lastIndex = regex.lastIndex;
    }
    if (lastIndex < text.length) {
        parts.push(text.substring(lastIndex));
    }
    return parts.length > 0 ? parts : text;
};
