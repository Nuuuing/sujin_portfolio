import { skillStackT } from '@/features';

export interface projectT {
    key: number;
    projName: string;               //프로젝트 명
    projTag?: string[];             //프로젝트 태그
    projDesc?: string;              //프로젝트 설명
    projSkills?: skillStackT[];     //프로젝트 기술 스택
    startDate: string;              //프로젝트 시작일자
    endDate?: string;               //프로젝트 종료일자
    gitUrl?: gitUrlT[];             //git URL
    notionUrl?: string;             //notion URL
    siteUrl?: string;
    youtubeUrl?: string;            //youtube URL
    mainviewyn?: boolean;           //메인 게시 여부   
    role?: string;                  //역할
    achievements?: string[];        //주요 성과
    projSize?: ProjSize;            //프로젝트 규모
    projPtc: ProjPtc;               //프로젝트 참여 형태 (TEAM, SOLO)
    imgUrl?: string;                //이미지 URL
}

export interface projDetailT extends Omit<projectT, 'imgUrl'> {
    imgUrl?: string[];
    projDescDetail: string;                 //  overview text
    roles?: contentsT[];                    //  담당 정보
    contents?: contentsT[];                 // 추가 정보
}

export interface contentsT {
    contentType?: ContentType;     // 콘텐츠 타입
    imgUrl?: string;
    midTitle?: string;
    contents?: string;
}

// 콘텐츠 타입 enum
export enum ContentType {
    TROUBLESHOOT = 'troubleshoot',  // 고민 -> 해결
    IMPROVEMENT = 'improvement',     // 향후 개선
    GENERAL = 'general'              // 일반 (태그 표시 안함)
}

export enum ProjSize {
    side = 0,
    toy,
    work
}

export enum ProjPtc {
    TEAM = 1,
    SOLO
}

export interface gitUrlT {
    url: string;
    title: string;
}
