'use client'

import { motion } from "motion/react";
import { BlogPostT } from "@/features/blog";
import { SectionHead } from "@/components/common";
import { BlogContentsCard } from "./BlogContentsCard";

interface BlogSectionProps {
    /** 빌드 시점에 RSS에서 가져온 글 목록 */
    posts: BlogPostT[];
}

const BLOG_URL = 'https://nuu-stradamus.tistory.com/';

export const BlogSection = ({ posts }: BlogSectionProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <SectionHead
                title="블로그"
                script="notes"
                color="c-mint"
                meta={posts.length > 0 ? `최근 ${posts.length}건` : undefined}
                action={
                    <a href={BLOG_URL} target="_blank" rel="noopener noreferrer" className="pill pill-soft c-mint">
                        전체 보기 ↗
                    </a>
                }
            />

            {posts.length === 0 ? (
                <div className="c-mint card flex flex-col items-center gap-3 py-10 text-center">
                    <span className="script text-[2rem] text-ac">oops</span>
                    <p className="text-[0.95rem] text-ink-soft">지금은 글 목록을 가져오지 못했어요.</p>
                    <a href={BLOG_URL} target="_blank" rel="noopener noreferrer" className="pill pill-solid">
                        블로그 바로가기 ↗
                    </a>
                </div>
            ) : (
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {posts.map((item, index) => (
                        <BlogContentsCard key={item.link || index} post={item} index={index} />
                    ))}
                </div>
            )}
        </motion.div>
    )
}
