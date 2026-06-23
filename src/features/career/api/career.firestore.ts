import { collection, getDocs, query, orderBy, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { CareerT, CareerProjectT, CareerDisplayType } from '../types';

// 캐시 변수
let careersCache: CareerT[] | null = null;
let careersPromise: Promise<CareerT[]> | null = null;

/**
 * Firestore - career 목록 (캐싱)
 * @returns CareerT[]
 */
export async function getCareers(): Promise<CareerT[]> {
    // 캐시가 있으면 바로 반환
    if (careersCache) {
        return careersCache;
    }

    // 이미 요청 중이면 해당 Promise 반환
    if (careersPromise) {
        return careersPromise;
    }

    careersPromise = (async () => {
        try {
            const careersRef = collection(db, 'careers');
            const q = query(careersRef, orderBy('key', 'desc'));
            const snapshot: QuerySnapshot<DocumentData> = await getDocs(q);

            const data = snapshot.docs.map(doc => {
                const data = doc.data();

                // projects 배열 변환
                const projects: CareerProjectT[] = (data.projects || []).map((proj: DocumentData) => ({
                    key: proj.key,
                    projName: proj.projName,
                    description: proj.description,
                    startDate: proj.startDate,
                    endDate: proj.endDate,
                    duration: proj.duration,
                    role: proj.role,
                    tasks: proj.tasks || [],
                    achievements: proj.achievements || [],
                    skills: proj.skills || [],
                }));

                return {
                    key: data.key,
                    docId: doc.id,
                    company: data.company,
                    team: data.team,
                    position: data.position,
                    contents: data.contents,
                    description: data.description,
                    displayType: (data.displayType || 'project') as CareerDisplayType,
                    startTerm: data.startTerm,
                    endTerm: data.endTerm,
                    projects,
                    detailContents: data.detailContents || [],
                    metrics: data.metrics || [],
                } as CareerT;
            });

            careersCache = data;
            careersPromise = null;
            return data;
        } catch (error) {
            console.error('Error fetching careers:', error);
            careersPromise = null;
            return [];
        }
    })();

    return careersPromise;
}

/**
 * Firestore - 특정 career 조회
 * @param key career key
 * @returns CareerT | null
 */
export async function getCareerByKey(key: number): Promise<CareerT | null> {
    try {
        const careers = await getCareers();
        return careers.find(c => c.key === key) || null;
    } catch (error) {
        console.error('Error fetching career by key:', error);
        return null;
    }
}
