import { skillStackT } from "../common";

export interface projectT {
    key: number;
    projName : string;
    projContents : string;
    projSkills?: skillStackT[];
    gitUrl?:string;
    notionUrl?:string;
    youtubeUrl?:string;
}