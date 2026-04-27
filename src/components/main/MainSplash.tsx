'use client'

import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { SplashCard } from "./SplashCard"
import { ExternalLinkIcon, MailIcon, GithubIcon, BlogIcon, SkillIcon, ExperienceItem } from "../common"
import { getDocs, getPreviewUrl, DocsDataT } from "@/features/docs"

// 문서 버튼 컴포넌트
const DocButton = ({
    url,
    label,
    variant = 'primary'
}: {
    url: string
    label: string
    variant?: 'primary' | 'secondary'
}) => {
    const isPrimary = variant === 'primary'
    const bgColor = isPrimary ? 'bg-[#72AAFF]' : 'bg-[#535353]'
    const hoverColor = isPrimary ? 'hover:bg-[#5a9aef]' : 'hover:bg-[#4a4a4a]'

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`
                ${bgColor} ${hoverColor}
                text-white px-5 py-2.5 rounded-full
                text-sm font-medium
                inline-flex items-center gap-2
                hover:scale-105 hover:shadow-lg
                active:scale-95
                transition-all duration-200
            `}
        >
            <span>{label}</span>
            <ExternalLinkIcon size={14} />
        </a>
    )
}

// 버튼 스켈레톤
const DocButtonSkeleton = () => (
    <div className="h-10 w-24 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
)

export const MainSplash = () => {
    const [docsData, setDocsData] = useState<DocsDataT>({ resume: null, portfolio: null })
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getDocs().then((data) => {
            setDocsData(data)
            setIsLoading(false)
        })
    }, [])

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full flex flex-col lg:flex-row gap-8 lg:gap-12 items-center"
            >
                {/* 좌측 텍스트 영역 */}
                <div className="w-full lg:w-1/2 flex flex-col items-center text-center">
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-sm sm:text-base md:text-lg text-[#72AAFF] font-medium mb-2 tracking-wider"
                    >
                        WEB DEVELOPER
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4"
                    >
                        <p className="text-gray-800 dark:text-white">안녕하세요!</p>
                        <p className="text-[#72AAFF]">김수진입니다</p>
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="text-gray-500 dark:text-gray-400 text-sm sm:text-base md:text-lg mb-6 max-w-md px-4"
                    >
                        프론트엔드부터 백엔드까지, <br className="hidden sm:block" />서비스의 모든 과정을 경험하고 성장하고 있습니다.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="flex flex-row gap-3"
                    >
                        {isLoading ? (
                            <DocButtonSkeleton />
                        ) : (
                            <>
                                {(docsData.portfolio || docsData.resume) && (
                                    <DocButton
                                        url={getPreviewUrl((docsData.portfolio || docsData.resume)!.url)}
                                        label="이력서/포폴"
                                        variant="primary"
                                    />
                                )}
                            </>
                        )}
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-3"
                >
                    <SplashCard title="Contact" showDot className="col-span-1">
                        <div className="flex items-center justify-center gap-6 sm:gap-8">
                            <a
                                className="group flex flex-col items-center gap-1.5 hover:text-[#72AAFF] duration-150"
                                href="mailto:su_042@daum.net"
                            >
                                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 border-current flex items-center justify-center group-hover:scale-110 group-hover:border-[#72AAFF] transition-all duration-200">
                                    <MailIcon size={20} className="fill-current" />
                                </div>
                                <p className="text-[10px] sm:text-xs font-medium">MAIL</p>
                            </a>
                            <a
                                href="https://github.com/Nuuuing"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex flex-col items-center gap-1.5 hover:text-[#72AAFF] transition-colors duration-150"
                            >
                                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 border-current flex items-center justify-center group-hover:scale-110 group-hover:border-[#72AAFF] transition-all duration-200">
                                    <GithubIcon size={20} className="fill-current" />
                                </div>
                                <p className="text-[10px] sm:text-xs font-medium">GITHUB</p>
                            </a>
                            <a
                                className="group flex flex-col items-center gap-1.5 hover:text-[#72AAFF] duration-150"
                                href="https://nuu-stradamus.tistory.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 border-current flex items-center justify-center group-hover:scale-110 group-hover:border-[#72AAFF] transition-all duration-200">
                                    <BlogIcon size={20} className="fill-current" />
                                </div>
                                <p className="text-[10px] sm:text-xs font-medium">BLOG</p>
                            </a>
                        </div>
                    </SplashCard>
                    <SplashCard title="Experience" showDot className="col-span-1 sm:row-span-2">
                        <div className="space-y-4 text-left">
                            <ExperienceItem
                                period="2023.08 - ing"
                                badge="학사"
                                institution="한국방송통신대학"
                                field="컴퓨터과학"
                                description="자료구조, 알고리즘, 운영체제, 컴퓨터 보안, AI 등 CS 학습"
                                isActive
                            />
                            <ExperienceItem
                                period="2024.05 - 2025.01"
                                badge="수료"
                                institution="경일IT게임아카데미"
                                field="메타버스 플랫폼 게임 개발자과정"
                                description="Unity 프로젝트, AR/XR 학습"
                            />
                            <ExperienceItem
                                period="2016.03 - 2018.02"
                                badge="전문학사"
                                institution="수원여자대학"
                                field="모바일미디어 (SW)"
                                description="웹 기초 및 DB, C, Java, Android 및 기본 CS 학습"
                            />
                        </div>
                    </SplashCard>
                    <SplashCard title="Skills" showDot className="col-span-1">
                        <div className="grid grid-cols-5 gap-1.5 sm:gap-2 justify-items-center">
                            {['TypeScript', 'JavaScript', 'React', 'Next.js', 'Tanstack', 'Java', 'Spring Boot', 'C#', 'Unity', '.NET', 'Tailwind CSS', 'MySQL', 'Linux', 'Photoshop', 'Figma'].map((skill) => (
                                <div
                                    key={skill}
                                    className="flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 hover:scale-110 hover:shadow-md transition-all duration-200 w-10 h-10 sm:w-11 sm:h-11"
                                    title={skill}
                                >
                                    <SkillIcon skillName={skill} size={38} />
                                </div>
                            ))}
                        </div>
                    </SplashCard>
                </motion.div>
            </motion.div>
        </>
    )
}
