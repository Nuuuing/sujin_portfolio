import { skillStackT } from "../common";

export interface careerSubT {
    key: number;
    projTitle: string;
    startTerm?: Date;
    endTerm?: Date;
    skills?: skillStackT[];
    description?: string;
    contents?: string[];
    result?: string[];
}

export interface careerT {
    key: number;
    company: string;
    startTerm?: Date;
    endTerm?: Date;
}