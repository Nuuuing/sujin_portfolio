import { getBlogPosts } from "@/features/blog";
import { HomeClient } from "./HomeClient";

/**
 * 서버 컴포넌트. 빌드 시점에 블로그 RSS를 가져와 클라이언트 셸에 넘긴다.
 * (정적 내보내기라 브라우저에서 직접 가져오면 CORS에 막힌다)
 */
export default async function Home() {
    const posts = await getBlogPosts(6);
    return <HomeClient posts={posts} />;
}
