'use client'

import { motion } from "motion/react"
import { SplashCard } from "./SplashCard"
import { DownloadIcon, MailIcon, GithubIcon, BlogIcon, SkillIcon, ExperienceItem } from "../common"

export const MainSplash = () => {
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
                        className="text-gray-500 dark:text-gray-400 text-base sm:text-lg mb-6 max-w-md"
                    >
                        프론트엔드부터 백엔드까지, <br />서비스의 모든 과정을 경험하고 성장하고 있습니다.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="flex flex-row gap-3"
                    >
                        <a
                            href="https://drive.google.com/uc?export=download&id=1E_b19a5rAa_CVtc7_cChuYSv3XV4r-35"
                            download
                            className="bg-[#535353] text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-full cursor-pointer inline-flex items-center justify-center gap-1.5 hover:bg-[#3a3a3a] hover:scale-105 transition-all duration-200 text-sm sm:text-base"
                        >
                            <span>이력서</span>
                            <DownloadIcon size={18} />
                        </a>
                        <a
                            href="https://drive.google.com/uc?export=download&id=YOUR_PORTFOLIO_FILE_ID"
                            download
                            className="bg-[#72AAFF] text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-full cursor-pointer inline-flex items-center justify-center gap-1.5 hover:bg-[#5a8fd9] hover:scale-105 transition-all duration-200 text-sm sm:text-base"
                        >
                            <span>포트폴리오</span>
                            <DownloadIcon size={18} />
                        </a>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-3"
                >
                    <SplashCard title="Contact" showDot className="col-span-1">
                        <div className="flex items-center justify-center gap-3 sm:gap-4">
                            <a
                                className="group flex flex-col items-center gap-1.5 hover:text-[#72AAFF] duration-150"
                                href="mailto:su_042@daum.net"
                            >
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-current flex items-center justify-center group-hover:scale-105 transition-transform duration-150">
                                    <MailIcon size={18} className="fill-current sm:w-5 sm:h-5" />
                                </div>
                                <p className="text-[10px] sm:text-xs">MAIL</p>
                            </a>
                            <a
                                href="https://github.com/Nuuuing"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex flex-col items-center gap-1.5 hover:text-[#72AAFF] transition-colors duration-150"
                            >
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-current flex items-center justify-center group-hover:scale-105 transition-transform duration-150">
                                    <GithubIcon size={18} className="fill-current sm:w-5 sm:h-5" />
                                </div>
                                <p className="text-[10px] sm:text-xs">GITHUB</p>
                            </a>
                            <a
                                className="group flex flex-col items-center gap-1.5 hover:text-[#72AAFF] duration-150"
                                href="https://nuu-stradamus.tistory.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-current flex items-center justify-center group-hover:scale-105 transition-transform duration-150">
                                    <BlogIcon size={18} className="fill-current sm:w-5 sm:h-5" />
                                </div>
                                <p className="text-[10px] sm:text-xs">BLOG</p>
                            </a>
                        </div>
                    </SplashCard>
                    {/* <SplashCard title="Certifications" showDot className="col-span-1">
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">준비중</p>
                    </SplashCard> */}
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
                        <div className="grid grid-cols-5 gap-2 justify-items-center">
                            {['TypeScript', 'JavaScript', 'React', 'Next.js', 'Tanstack', 'Java', 'Spring Boot', 'C#', 'Unity', '.NET', 'Tailwind CSS', 'MySQL', 'Linux', 'Photoshop', 'Figma'].map((skill) => (
                                <div
                                    key={skill}
                                    className="flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 hover:scale-110 transition-transform"
                                    style={{ width: '2.8rem', height: '2.8rem' }}
                                    title={skill}
                                >
                                    <SkillIcon skillName={skill} size={42} />
                                </div>
                            ))}
                        </div>
                    </SplashCard>
                </motion.div>
            </motion.div>
        </>
    )
}
