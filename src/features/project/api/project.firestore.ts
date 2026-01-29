import { collection, getDocs, query, orderBy, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { projectT, projDetailT } from '../types';

/**
 * Firestore - Project 데이터 목록
 */
export async function getProjects(): Promise<projectT[]> {
    try {
        const projectsRef = collection(db, 'projects');
        const q = query(projectsRef, orderBy('key', 'desc'));
        const snapshot: QuerySnapshot<DocumentData> = await getDocs(q);

        return snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                key: data.key,
                projName: data.projName,
                projTag: data.projTag,
                projDesc: data.projDesc,
                projSkills: data.projSkills,
                startDate: data.startDate,
                endDate: data.endDate,
                gitUrl: data.gitUrl,
                notionUrl: data.notionUrl,
                siteUrl: data.siteUrl,
                youtubeUrl: data.youtubeUrl,
                projSize: data.projSize,
                projPtc: data.projPtc,
                imgUrl: data.imgUrl,
            } as projectT;
        });
    } catch (error) {
        console.error('Error fetching projects:', error);
        return [];
    }
}

/**
 * Firestore - Project 상세 데이터
 */
export async function getProjectDetails(): Promise<projDetailT[]> {
    try {
        const projectsRef = collection(db, 'projectDetails');
        const q = query(projectsRef, orderBy('key', 'desc'));
        const snapshot: QuerySnapshot<DocumentData> = await getDocs(q);

        return snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                key: data.key,
                projName: data.projName,
                projTag: data.projTag,
                projDesc: data.projDesc,
                projSkills: data.projSkills,
                startDate: data.startDate,
                endDate: data.endDate,
                gitUrl: data.gitUrl,
                notionUrl: data.notionUrl,
                siteUrl: data.siteUrl,
                youtubeUrl: data.youtubeUrl,
                projSize: data.projSize,
                projPtc: data.projPtc,
                imgUrl: data.imgUrl,
                projDescDetail: data.projDescDetail,
                roles: data.roles,
                contents: data.contents,
            } as projDetailT;
        });
    } catch (error) {
        console.error('Error fetching project details:', error);
        return [];
    }
}

