'use client'

import { motion } from "motion/react"

export const ContactSection = () => {
    const contactItems = [
        {
            value: "su_042@daum.net",
            href: "mailto:su_042@daum.net",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M2 4C1.447 4 1 4.447 1 5V19C1 19.553 1.447 20 2 20H22C22.553 20 23 19.553 23 19V5C23 4.447 22.553 4 22 4H2zM2 6L12 13L22 6V8L12 15L2 8V6Z" />
                </svg>
            )
        },
        {
            value: "github.com/Nuuuing",
            href: "https://github.com/Nuuuing",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.04c-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.082-.73.082-.73 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.11-.775.418-1.305.76-1.605-2.665-.305-5.467-1.334-5.467-5.93 0-1.31.47-2.38 1.236-3.22-.125-.304-.535-1.527.115-3.18 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.655 1.653.245 2.876.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.62-5.475 5.92.43.37.81 1.096.81 2.21v3.27c0 .32.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
            ),
            external: true
        }
    ];

    return (
        <div className="w-full relative">
            {/* 배경 장식 */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-radial from-[var(--taupe)]/8 via-[var(--sage)]/5 to-transparent rounded-full blur-3xl" />
                {/* 장식 라인 */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-[var(--taupe)]/30 to-transparent" />
            </div>

            {/* 헤더 메시지 */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
                className="text-center mb-8 sm:mb-12 relative z-10"
            >
                <motion.div
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--taupe)]/10 border border-[var(--taupe)]/20 mb-3 sm:mb-4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                >
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[var(--taupe)] animate-pulse" />
                    <span className="text-xs sm:text-sm font-semibold text-[var(--taupe)] tracking-widest">GET IN TOUCH</span>
                </motion.div>
                <motion.h2
                    className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <span className="text-ink">THANK </span>
                    <span className="text-[var(--taupe)]">YOU</span>
                </motion.h2>
                <motion.p
                    className="text-sm sm:text-base text-ink-soft max-w-md mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                >
                    새로운 기회와 협업에 항상 열려 있습니다.<br />편하게 연락주세요!
                </motion.p>
            </motion.div>

            {/* 연락처 카드 */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-2xl mx-auto"
            >
                {contactItems.map((item, index) => (
                    <motion.a
                        key={index}
                        href={item.href}
                        target={item.external ? "_blank" : undefined}
                        rel={item.external ? "noopener noreferrer" : undefined}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        className="group relative flex-1 w-full sm:w-auto flex flex-col items-center gap-2 sm:gap-3 px-6 sm:px-8 py-4 sm:py-6 rounded-xl sm:rounded-2xl bg-card-soft border border-line hover:border-[var(--taupe)]/50 hover:bg-[var(--taupe)]/5 transition-all duration-300"
                    >
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[var(--taupe)]/10 flex items-center justify-center text-[var(--taupe)] group-hover:bg-[var(--taupe)] group-hover:text-[var(--bg-card)] transition-all duration-300 [&>svg]:w-4 [&>svg]:h-4 sm:[&>svg]:w-5 sm:[&>svg]:h-5">
                            {item.icon}
                        </div>
                        <div className="text-center">
                            <p className="text-sm sm:text-base font-medium text-ink group-hover:text-[var(--taupe)] transition-colors">
                                {item.value}
                            </p>
                        </div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="absolute top-3 right-3 sm:top-4 sm:right-4 w-3.5 h-3.5 sm:w-4 sm:h-4 text-ink-soft group-hover:text-[var(--taupe)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                        >
                            <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
                        </svg>
                    </motion.a>
                ))}
            </motion.div>
        </div>
    )
}