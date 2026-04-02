export * from './parseContent'
export * from './firestore'

/**
 * YouTube URL에서 비디오 ID를 추출하여 임베드 URL 반환
 * 지원 형식:
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://youtube.com/shorts/VIDEO_ID
 */
export function getYoutubeEmbedUrl(url: string | undefined): string | null {
    if (!url) return null;

    // youtu.be 단축 URL
    const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
    if (shortMatch) {
        return `https://www.youtube.com/embed/${shortMatch[1]}`;
    }

    // youtube.com/watch?v= 형식
    const watchMatch = url.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/);
    if (watchMatch) {
        return `https://www.youtube.com/embed/${watchMatch[1]}`;
    }

    // youtube.com/embed/ 형식
    const embedMatch = url.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
    if (embedMatch) {
        return `https://www.youtube.com/embed/${embedMatch[1]}`;
    }

    // youtube.com/shorts/ 형식
    const shortsMatch = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/);
    if (shortsMatch) {
        return `https://www.youtube.com/embed/${shortsMatch[1]}`;
    }

    return null;
}

/**
 * Google Drive 공유 링크를 직접 이미지 URL로 변환
 * 또는 파일명만 있으면 로컬 projImg 경로로 변환
 */
export function convertDriveUrl(url: string | undefined): string {
    if (!url) return '';

    // Google Drive 공유 링크 패턴 확인
    const driveMatch = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
    if (driveMatch) {
        const fileId = driveMatch[1];
        // lh3.googleusercontent.com 형식 사용 (CORS 우회)
        return `https://lh3.googleusercontent.com/d/${fileId}`;
    }

    // 이미 전체 URL이면 그대로 반환
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/')) {
        return url;
    }

    // 파일명만 있으면 로컬 projImg 경로로 변환
    // 확장자가 없으면 .png 추가
    const hasExtension = /\.(png|jpg|jpeg|gif|webp|svg)$/i.test(url);
    return `/projImg/${url}${hasExtension ? '' : '.png'}`;
}