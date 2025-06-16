import { skillStackT } from "./common.types";

export interface projectT {
    key: number;
    projName: string;               //프로젝트 명
    projTag?: string[];             //프로젝트 태그
    projDesc?: string;              //프로젝트 설명
    projSkills?: skillStackT[];     //프로젝트 기술 스택
    startDate: string;              //프로젝트 시작일자
    endDate?: string;               //프로젝트 종료일자
    gitUrl?: string[];              //git URL
    notionUrl?: string;             //notion URL
    youtubeUrl?: string;            //youtube URL
    //mainYn:boolean;               //메인 게시 여부   
    projSize?: ProjSize;            //프로젝트 규모
    projPtc: ProjPtc;                //프로젝트 참여 형태 (TEAM, SOLO)
    imgUrl?: string;          //이미지 URL
}

export interface projDetailT extends  Omit<projectT, 'imgUrl'>{
    imgUrl?: string[];
    projDescDetail: string;                 //  overview text
    roles?: contentsT[];                    //  담당 정보
    contents?: contentsT[];                 // 추가 정보
}

export interface contentsT {
    imgUrl?: string;
    midTitle?: string;
    contents?: string;
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