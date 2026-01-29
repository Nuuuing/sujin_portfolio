import { collection, getDocs, query, orderBy, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { skillStackT } from '../types';

let skillsCache: skillStackT[] | null = null;
let skillsPromise: Promise<skillStackT[]> | null = null;

/**
 * 스킬 목록
 * @returns skillStackT[]
 */
export async function getSkills(): Promise<skillStackT[]> {

    if (skillsCache) {
        return skillsCache;
    }

    if (skillsPromise) {
        return skillsPromise;
    }

    skillsPromise = (async () => {
        try {
            const skillsRef = collection(db, 'skills');
            const q = query(skillsRef, orderBy('key', 'asc'));
            const snapshot: QuerySnapshot<DocumentData> = await getDocs(q);

            const skills = snapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    key: data.key,
                    name: data.name,
                    type: data.type,
                } as skillStackT;
            });

            skillsCache = skills;
            skillsPromise = null;
            return skills;
        } catch (error) {
            console.error('Error fetching skills:', error);
            skillsPromise = null;
            return [];
        }
    })();

    return skillsPromise;
}

export function clearSkillsCache(): void {
    skillsCache = null;
    skillsPromise = null;
}
