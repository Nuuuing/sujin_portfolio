import { collection, getDocs, query, orderBy, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { careerT, careerSubT } from '../types';
import { toDateSafe } from '@/utils/firestore';

/**
 * Firestore - career 목록
 * @returns careerT[]
 */
export async function getCareers(): Promise<careerT[]> {
    try {
        const careersRef = collection(db, 'careers');
        const q = query(careersRef, orderBy('key', 'desc'));
        const snapshot: QuerySnapshot<DocumentData> = await getDocs(q);

        return snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                key: data.key,
                docId: doc.id,
                company: data.company,
                startTerm: toDateSafe(data.startTerm),
                endTerm: toDateSafe(data.endTerm),
                dateString: data.dateString,
                contents: data.contents,
                teamName: data.team,
                position: data.position,
                displayType: data.displayType || 'project',
                detailContents: data.detailContents,
            } as careerT;
        });
    } catch (error) {
        console.error('Error fetching careers:', error);
        return [];
    }
}

/**
 * Firestore - career 하위 프로젝트 목록
 * career가 project형일 때만 사용
 * @param careerDocId career ID
 * @returns careerSubT[]
 */
export async function getCareerSubs(careerDocId: string): Promise<careerSubT[]> {
    try {
        const careerSubsRef = collection(db, 'careers', careerDocId, 'projects');

        const snapshot: QuerySnapshot<DocumentData> = await getDocs(careerSubsRef);
        console.log('Found projects:', snapshot.size);

        const projects = snapshot.docs.map(doc => {
            const data = doc.data();
            console.log('Project data:', data);
            return {
                key: data.key,
                projTitle: data.projTitle,
                startTerm: toDateSafe(data.startTerm),
                endTerm: toDateSafe(data.endTerm),
                dateString: data.dateString,
                skills: data.skills,
                description: data.description,
                contents: data.contents || [],
                task: data.task || [],
                result: data.result,
                type: data.type,
            } as careerSubT;
        });

        projects.sort((a, b) => (b.key || 0) - (a.key || 0));

        return projects;
    } catch (error) {
        console.error(`Error fetching career subs for career ${careerDocId}:`, error);
        return [];
    }
}
