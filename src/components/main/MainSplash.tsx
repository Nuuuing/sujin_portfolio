'use client'

import { motion } from "motion/react"
import { SplashCard } from "./SplashCard"

export const MainSplash = () => {
    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.4, ease: "easeOut" }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                className="text-center leading-snug break-keep flex"
            >
                <div
                    className="w-[50%] flex flex-col items-start justify-center">
                    <div className="w-full">
                        <div
                            className="text-4xl md:text-5xl font-semibold mb-4">
                            <p>안녕하세요,</p>
                            <p>김수진입니다</p>
                        </div>
                        <div
                            className="bg-[#535353] text-white px-4 py-2 rounded-full inline-block cursor-pointer">
                            이력서 다운로드
                        </div>
                    </div>
                </div>
                <div className="w-[50%] flex gap-3 items-start">
                    <div className="flex flex-col gap-3">
                        <SplashCard title="Contact & Social" showDot>
                            <div className="flex flex-col gap-1.5">
                                <div className="flex items-center gap-2">
                                    <span>✉</span>
                                    <span>su_042@daum.net</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span>⊙</span>
                                    <span>GitHub</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span>✎</span>
                                    <span>BLOG</span>
                                </div>
                            </div>
                        </SplashCard>
                        <SplashCard title="Certifications">
                            test
                        </SplashCard>
                    </div>
                    <div className="flex flex-col gap-3">
                        <SplashCard title="Experience" bgColor="#535353">
                            test
                        </SplashCard>
                        <SplashCard title="Skills" bgColor="#707070">
                            test
                        </SplashCard>
                    </div>
                </div>
            </motion.div>
        </>
    )
}
