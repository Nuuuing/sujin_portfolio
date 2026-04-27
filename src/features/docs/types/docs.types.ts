export interface DocT {
    id: string;
    date: string;
    url: string;
    ver: string;
}

export interface DocsDataT {
    resume: DocT | null;
    portfolio: DocT | null;
}
