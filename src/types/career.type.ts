import { skillStackT } from "./common.types";

export interface careerSubT {
    key: number;
    projTitle: string;
    startTerm?: Date;
    endTerm?: Date;
    dateString?: string;
    skills?: skillStackT[];
    description?: string;
    contents?: string[];
    result?: string[];
    type?: string;
}

export interface careerT {
    key: number;
    company: string;
    startTerm?: Date;
    endTerm?: Date;
    dateString?: string;
    contents?: string;
    teamName?: string;
    position?: string;
}