import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { DocT, DocsDataT } from '../types';

// 캐시 변수
let docsCache: DocsDataT | null = null;
let docsPromise: Promise<DocsDataT> | null = null;

/**
 * Firestore - docs 컬렉션에서 resume, portfolio 문서 가져오기 (캐싱)
 * @returns DocsDataT
 */
export async function getDocs(): Promise<DocsDataT> {
    // 캐시가 있으면 바로 반환
    if (docsCache) {
        return docsCache;
    }

    // 이미 요청 중이면 해당 Promise 반환
    if (docsPromise) {
        return docsPromise;
    }

    docsPromise = (async () => {
        try {
            const [resumeSnap, portfolioSnap] = await Promise.all([
                getDoc(doc(db, 'docs', 'resume')),
                getDoc(doc(db, 'docs', 'portfolio'))
            ]);

            const resumeData = resumeSnap.exists() ? {
                id: resumeSnap.id,
                date: resumeSnap.data().date || '',
                url: resumeSnap.data().url || '',
                ver: resumeSnap.data().ver || ''
            } as DocT : null;

            const portfolioData = portfolioSnap.exists() ? {
                id: portfolioSnap.id,
                date: portfolioSnap.data().date || '',
                url: portfolioSnap.data().url || '',
                ver: portfolioSnap.data().ver || ''
            } as DocT : null;

            docsCache = {
                resume: resumeData,
                portfolio: portfolioData
            };

            return docsCache;
        } catch (error) {
            console.error('getDocs 에러:', error);
            docsPromise = null;
            return { resume: null, portfolio: null };
        }
    })();

    return docsPromise;
}

/**
 * Google Drive URL에서 미리보기/다운로드 URL 생성
 */
export function getPreviewUrl(url: string): string {
    // 이미 view URL이면 그대로 반환
    if (url.includes('/view')) {
        return url;
    }
    // file/d/{id} 형식에서 id 추출
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match) {
        return `https://drive.google.com/file/d/${match[1]}/view`;
    }
    return url;
}

export function getDownloadUrl(url: string): string {
    // file/d/{id} 형식에서 id 추출
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match) {
        // confirm=t 추가로 대용량 파일 다운로드 지원
        return `https://drive.google.com/uc?export=download&confirm=t&id=${match[1]}`;
    }
    return url;
}
