import { collection, getDocs, query, orderBy, QuerySnapshot, DocumentData, doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { projectT, projDetailT } from '../types';
import { convertDriveUrl } from '@/utils';
import { getSkills } from '@/features/skill/api/skill.firestore';

// 캐시 변수
let projectsCache: DocumentData[] | null = null;
let projectsPromise: Promise<DocumentData[]> | null = null;

/**
 * Firestore에서 프로젝트 원본 데이터 가져오기 (캐싱)
 */
async function getProjectsRaw(): Promise<DocumentData[]> {
    if (projectsCache) {
        return projectsCache;
    }

    if (projectsPromise) {
        return projectsPromise;
    }

    projectsPromise = (async () => {
        try {
            const projectsRef = collection(db, 'projects');
            const q = query(projectsRef, orderBy('key', 'desc'));
            const snapshot: QuerySnapshot<DocumentData> = await getDocs(q);

            const data = snapshot.docs.map(doc => doc.data());
            projectsCache = data;
            projectsPromise = null;
            return data;
        } catch (error) {
            console.error('Error fetching projects raw:', error);
            projectsPromise = null;
            return [];
        }
    })();

    return projectsPromise;
}

/**
 * Firestore - Project 데이터 추가
 */
export async function addProject(project: projectT): Promise<boolean> {
    try {
        const docRef = doc(db, 'projects', project.key.toString());
        await setDoc(docRef, project);
        return true;
    } catch (error) {
        console.error('Error adding project:', error);
        return false;
    }
}

/**
 * Firestore - Project 상세 데이터 추가
 */
export async function addProjectDetail(projectDetail: projDetailT): Promise<boolean> {
    try {
        const docRef = doc(db, 'projectDetails', projectDetail.key.toString());
        await setDoc(docRef, projectDetail);
        return true;
    } catch (error) {
        console.error('Error adding project detail:', error);
        return false;
    }
}

/**
 * Firestore - Project 데이터 목록
 */
export async function getProjects(): Promise<projectT[]> {
    try {
        // 스킬 데이터 먼저 가져오기
        const skills = await getSkills();
        const skillMap = new Map(skills.map(s => [s.key, s]));

        // 캐시된 원본 데이터 사용
        const rawData = await getProjectsRaw();

        return rawData.map(data => {
            // imgUrl이 배열이면 첫 번째 요소 사용 + Google Drive URL 변환
            const rawImgUrl = Array.isArray(data.imgUrl) ? data.imgUrl[0] : data.imgUrl;
            const imgUrl = convertDriveUrl(rawImgUrl);

            // projSkills 숫자 배열을 스킬 객체 배열로 변환
            const projSkills = (data.projSkills || [])
                .map((skillKey: number) => skillMap.get(skillKey))
                .filter(Boolean);

            return {
                key: data.key,
                projName: data.projName,
                projTag: data.projTag,
                projDesc: data.projDesc,
                projSkills: projSkills,
                startDate: data.startDate,
                endDate: data.endDate,
                gitUrl: data.gitUrl,
                notionUrl: data.notionUrl,
                siteUrl: data.siteUrl,
                youtubeUrl: data.youtubeUrl,
                projSize: data.projSize,
                projPtc: data.projPtc,
                imgUrl: imgUrl,
                mainviewyn: data.mainviewyn,
                role: data.role,
                achievements: data.achievements,
            } as projectT;
        });
    } catch (error) {
        console.error('Error fetching projects:', error);
        return [];
    }
}

/**
 * Firestore - Project 상세 데이터 (projects 컬렉션에서 가져옴)
 */
export async function getProjectDetails(): Promise<projDetailT[]> {
    try {
        // 스킬 데이터 먼저 가져오기
        const skills = await getSkills();
        const skillMap = new Map(skills.map(s => [s.key, s]));

        // 캐시된 원본 데이터 사용
        const rawData = await getProjectsRaw();

        return rawData.map(data => {
            // imgUrl이 문자열이면 배열로 변환 + Google Drive URL 변환
            const rawImgUrls = Array.isArray(data.imgUrl) ? data.imgUrl : (data.imgUrl ? [data.imgUrl] : []);
            const imgUrl = rawImgUrls.map((url: string) => convertDriveUrl(url));

            // projSkills 숫자 배열을 스킬 객체 배열로 변환
            const projSkills = (data.projSkills || [])
                .map((skillKey: number) => skillMap.get(skillKey))
                .filter(Boolean);

            return {
                key: data.key,
                projName: data.projName,
                projTag: data.projTag,
                projDesc: data.projDesc,
                projSkills: projSkills,
                startDate: data.startDate,
                endDate: data.endDate,
                gitUrl: data.gitUrl,
                notionUrl: data.notionUrl,
                siteUrl: data.siteUrl,
                youtubeUrl: data.youtubeUrl,
                projSize: data.projSize,
                projPtc: data.projPtc,
                imgUrl: imgUrl,
                mainviewyn: data.mainviewyn,
                role: data.role,
                achievements: data.achievements,
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

