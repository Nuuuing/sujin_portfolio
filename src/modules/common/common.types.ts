export interface skillStackT {
    key: number;
    name: string;
    type?: stackType;
}

export enum stackType {
    WEB = 0,
    LANG,
    ENGINE,
    OTHER,
    DB
}