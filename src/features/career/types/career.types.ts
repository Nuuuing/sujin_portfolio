import { skillStackT } from '@/types/common.types';

export interface careerSubT {
    key: number;
    projTitle: string;
    startTerm?: Date;
    endTerm?: Date;
    dateString?: string;
    skills?: skillStackT[];
    description?: string;
    contents?: string[];
    task?: string[];
    result?: string[];
    type?: string;
}

export interface careerT {
    key: number;
    docId?: string;
    company: string;
    startTerm?: Date;
    endTerm?: Date;
    dateString?: string;
    contents?: string;
    teamName?: string;
    position?: string;
    displayType?: 'project' | 'contents';
    detailContents?: string[];  // contents형일 때 사용할 상세 내용
}
