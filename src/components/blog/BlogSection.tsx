'use client'

import { useEffect, useState } from "react";
import { BlogContentsCard } from "./BlogContentsCard";
import { motion } from "motion/react";

interface BlogPost {
    title: string
    date: string
    link: string
    thumbnail?: string
    categories?: string[]
}

// RSS 파싱 함수
function parseRSS(xml: string): BlogPost[] {
    const items: BlogPost[] = []
    const itemMatches = xml.match(/<item>([\s\S]*?)<\/item>/g)
    if (!itemMatches) return items

    const extractTag = (xml: string, tag: string): string | null => {
        const cdataMatch = xml.match(new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`, 'i'))
        if (cdataMatch) return cdataMatch[1]
        const match = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'))
        return match ? match[1].trim() : null
    }

    const extractCategories = (xml: string): string[] => {
        const categories: string[] = []
        const catMatches = xml.matchAll(/<category[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/category>/gi)
        for (const match of catMatches) {
            if (match[1]) categories.push(match[1].trim())
        }
        return categories
    }

    const extractThumbnail = (content: string | null): string | undefined => {
        if (!content) return undefined
        const imgMatch = content.match(/<img[^>]+src=["']([^"']+)["']/i)
        return imgMatch ? imgMatch[1] : undefined
    }

    for (const itemXml of itemMatches) {
        const title = extractTag(itemXml, 'title')
        const link = extractTag(itemXml, 'link')
        const pubDate = extractTag(itemXml, 'pubDate')
        const content = extractTag(itemXml, 'description')
        const categories = extractCategories(itemXml)

        items.push({
            title: title || '',
            date: pubDate
                ? new Date(pubDate).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                })
                : '',
            link: link || '',
            thumbnail: extractThumbnail(content),
            categories: categories.length > 0 ? categories : undefined
        })
    }
    return items
}

export const BlogSection = () => {
    const [posts, setPosts] = useState<BlogPost[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const CACHE_KEY = 'blog_posts_cache'
        const CACHE_EXPIRY_KEY = 'blog_posts_cache_expiry'
        const CACHE_DURATION = 1000 * 60 * 60 * 6 // 6시간

        const getCachedPosts = (): BlogPost[] | null => {
            try {
                const expiry = localStorage.getItem(CACHE_EXPIRY_KEY)
                const cached = localStorage.getItem(CACHE_KEY)
                if (expiry && cached && Date.now() < parseInt(expiry)) {
                    return JSON.parse(cached)
                }
            } catch {
                // localStorage 에러 무시
            }
            return null
        }

        const setCachedPosts = (posts: BlogPost[]) => {
            try {
                localStorage.setItem(CACHE_KEY, JSON.stringify(posts))
                localStorage.setItem(CACHE_EXPIRY_KEY, String(Date.now() + CACHE_DURATION))
            } catch {
                // localStorage 에러 무시
            }
        }

        const fetchWithRetry = async (url: string, retries = 2): Promise<Response | null> => {
            for (let i = 0; i <= retries; i++) {
                try {
                    const res = await fetch(url, {
                        signal: AbortSignal.timeout(8000),
                        headers: { 'Accept': 'application/rss+xml, application/xml, text/xml, */*' }
                    })
                    if (res.ok) return res
                } catch {
                    if (i === retries) return null
                    await new Promise(r => setTimeout(r, 500)) // 재시도 전 대기
                }
            }
            return null
        }

        const fetchPosts = async () => {
            // 캐시 먼저 확인
            const cached = getCachedPosts()
            if (cached && cached.length > 0) {
                setPosts(cached)
                setLoading(false)
                return
            }

            try {
                const rssUrl = 'https://nuu-stradamus.tistory.com/rss'
                const proxies = [
                    `https://corsproxy.io/?${encodeURIComponent(rssUrl)}`,
                    `https://api.allorigins.win/raw?url=${encodeURIComponent(rssUrl)}`,
                    `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(rssUrl)}`,
                    `https://thingproxy.freeboard.io/fetch/${rssUrl}`,
                ]

                let xml = ''
                for (const proxyUrl of proxies) {
                    const res = await fetchWithRetry(proxyUrl, 1)
                    if (res) {
                        const text = await res.text()
                        // RSS 형식인지 확인
                        if (text.includes('<item>') || text.includes('<rss')) {
                            xml = text
                            break
                        }
                    }
                }

                if (xml) {
                    const fetchedPosts = parseRSS(xml).slice(0, 6)
                    setPosts(fetchedPosts)
                    setCachedPosts(fetchedPosts)
                    setError(false)
                } else {
                    // 모든 프록시 실패 시 만료된 캐시라도 시도
                    const expiredCache = localStorage.getItem(CACHE_KEY)
                    if (expiredCache) {
                        setPosts(JSON.parse(expiredCache))
                    } else {
                        setError(true)
                    }
                }
            } catch (err) {
                console.error('Failed to fetch blog posts:', err)
                setError(true)
            } finally {
                setLoading(false)
            }
        }
        fetchPosts()
    }, [])

    return (
        <div className="relative overflow-hidden">
            {/* 배경 장식 - 컨테이너 내부로 제한 */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-20 -right-20 w-80 h-80 bg-[var(--taupe)]/5 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[var(--sage)]/8 rounded-full blur-3xl" />
            </div>

            <motion.div
                className="relative z-10"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                {/* 섹션 헤더 */}
                <div className="flex flex-col items-center mb-8 sm:mb-12">
                    <div className="text-center">
                        <motion.div
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--taupe)]/10 border border-[var(--taupe)]/20 mb-3 sm:mb-4"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[var(--taupe)] animate-pulse" />
                            <span className="text-[10px] sm:text-xs font-semibold text-[var(--taupe)] tracking-widest">STUDY & INSIGHTS</span>
                        </motion.div>
                        <motion.h2
                            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <span className="text-ink">BL</span>
                            <span className="text-[var(--taupe)]">OG</span>
                        </motion.h2>
                        <motion.p
                            className="text-sm sm:text-base text-ink-soft max-w-md mx-auto"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            개인적으로 공부한 부분 혹은 문제 해결 과정들을 기록합니다.
                        </motion.p>
                    </div>
                </div>
                {loading ? (
                    <div className="text-center text-ink-soft text-sm sm:text-base py-8">
                        <div className="inline-flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-[var(--taupe)] border-t-transparent rounded-full animate-spin" />
                            <span>블로그 글을 불러오는 중...</span>
                        </div>
                    </div>
                ) : error && posts.length === 0 ? (
                    <div className="text-center text-ink-soft text-sm sm:text-base py-8">
                        <p>블로그 글을 불러올 수 없습니다.</p>
                        <p className="text-xs mt-1">직접 블로그를 방문해주세요.</p>
                    </div>
                ) : (
                    <div className="w-full">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                            {posts.slice(0, 3).map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 + index * 0.15, duration: 0.5 }}
                                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                                >
                                    <BlogContentsCard
                                        title={item.title}
                                        date={item.date}
                                        link={item.link}
                                        thumbnail={item.thumbnail}
                                        categories={item.categories}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}
                <motion.div
                    className="text-center mt-10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                >
                    <a
                        href="https://nuu-stradamus.tistory.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full border border-line bg-card-soft text-ink-soft hover:border-line-strong hover:text-ink transition-all duration-300 text-sm sm:text-base font-medium"
                    >
                        블로그 보러가기
                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </motion.div>
            </motion.div>
        </div>
    )
}