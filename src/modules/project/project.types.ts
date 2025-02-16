import { skillStackT } from "../common";

export interface projectT {
    key: number;
    projName : string;
    projTag?: string[];
    projContents ?: string;
    projSkills?: skillStackT[];
    startDate:string;
    endDate?:string;
    gitUrl?:string;
    notionUrl?:string;
    youtubeUrl?:string;
    mainYn:boolean;
    imgUrl?:string|any;
    projSize?: ProjSize;
}

export interface projDetailT{
    key: number;
    projName : string;
    projTag?: string[];
    projContents ?: string[];
    projSkills?: skillStackT[];
    startDate:string;
    endDate?:string;
    gitUrl?:string;
    notionUrl?:string;
    youtubeUrl?:string;
    imgUrl?:string[]|any[];
    projType?: ProjType;
    subTitle?:string;
    youtubeId?:string;
    projSize?: ProjSize;
}

export enum ProjType{
    default = 0,
    game,
    web
}
export enum ProjSize{
    side = 0,
    toy,
    work
}