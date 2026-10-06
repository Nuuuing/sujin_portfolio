export interface BlogPostT {
    title: string;
    date: string;
    link: string;
    thumbnail?: string;
    categories?: string[];
    /** 본문에서 뽑은 짧은 요약 */
    summary?: string;
}
