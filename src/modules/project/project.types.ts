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
}

export enum ProjType{
    default = 0,
    game,
    web
}