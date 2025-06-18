
export const parseContent = (text: string) => {
    const regex = /\*\*(.*?)\*\*/g;  // **강조** 패턴 찾기
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
        // 일반 텍스트
        if (match.index > lastIndex) {
            parts.push(text.substring(lastIndex, match.index));
        }
        // 강조 텍스트
        parts.push(<strong key={match.index} className="text-[#72AAFF]">{match[1]}</strong>);
        lastIndex = regex.lastIndex;
    }
    // 마지막 일반 텍스트
    if (lastIndex < text.length) {
        parts.push(text.substring(lastIndex));
    }
    return parts;
};