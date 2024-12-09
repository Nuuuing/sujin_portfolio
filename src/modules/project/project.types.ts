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