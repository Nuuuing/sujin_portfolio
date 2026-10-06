'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { MenuIcon, CloseIcon } from '../common/icons'

interface HeaderProps {
    onMenuClick?: (section: string) => void
    onMenuOpenChange?: (isOpen: boolean) => void
    activeSection?: string | null
}

const MENU_ITEMS = [
    { label: '소개', section: 'INTRO' },
    { label: '경력', section: 'CAREER' },
    { label: '프로젝트', section: 'PROJECT' },
    { label: '블로그', section: 'BLOG' },
]

export const Header = ({ onMenuClick, onMenuOpenChange, activeSection }: HeaderProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    // 스크롤하면 바탕을 깔아 본문이 헤더 밑으로 비쳐 보이지 않게 한다
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8)
        window.addEventListener('scroll', onScroll, { passive: true })
        onScroll()
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const toggleMenu = (open: boolean) => {
        setIsMenuOpen(open)
        onMenuOpenChange?.(open)
    }

    const handleMenuItemClick = (section: string) => {
        toggleMenu(false)
        onMenuClick?.(section)
    }

    return (
        <>
            <header
                className={`fixed left-0 top-0 z-50 w-full transition-colors duration-200 ${
                    scrolled ? 'border-b border-line bg-page/95 backdrop-blur-md' : ''
                }`}
            >
                <div className="shell flex h-16 items-center justify-between gap-4 sm:h-[4.5rem]">
                    {/* 로고 */}
                    <button
                        onClick={() => handleMenuItemClick('INTRO')}
                        className="c-sky flex cursor-pointer items-center gap-2.5"
                    >
                        <span className="flex h-9 w-9 items-center justify-center rounded-[0.7rem] bg-ac text-[0.85rem] font-extrabold text-white">
                            KS
                        </span>
                        <span className="text-[1.08rem] font-bold tracking-[-0.025em] text-ink">Kim Sujin</span>
                    </button>

                    {/* 데스크톱 내비 */}
                    <nav className="hidden items-center gap-1 rounded-[var(--r-pill)] bg-surface p-1.5 shadow-[var(--shadow)] lg:flex">
                        {MENU_ITEMS.map((item) => {
                            const isActive = activeSection === item.section
                            return (
                                <button
                                    key={item.section}
                                    onClick={() => handleMenuItemClick(item.section)}
                                    aria-current={isActive ? 'true' : undefined}
                                    className={`c-sky pill cursor-pointer py-2 ${
                                        isActive ? 'pill-solid' : 'text-ink-soft hover:text-ink'
                                    }`}
                                >
                                    {item.label}
                                </button>
                            )
                        })}
                    </nav>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => handleMenuItemClick('CONTACT')}
                            className="pill pill-dark hidden cursor-pointer lg:inline-flex"
                        >
                            연락처
                        </button>

                        {/* 모바일 */}
                        <button
                            className="z-50 flex h-11 w-11 cursor-pointer items-center justify-center rounded-[var(--r-pill)] bg-surface text-ink shadow-[var(--shadow)] lg:hidden"
                            onClick={() => toggleMenu(!isMenuOpen)}
                            aria-label="메뉴 열기"
                            aria-expanded={isMenuOpen}
                        >
                            {isMenuOpen ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
                        </button>
                    </div>
                </div>
            </header>

            {/* 모바일 전체 메뉴 */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.nav
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="fixed inset-0 z-40 flex flex-col justify-center bg-page lg:hidden"
                    >
                        <div className="shell space-y-2">
                            {[...MENU_ITEMS, { label: '연락처', section: 'CONTACT' }].map((item, index) => {
                                const isActive = activeSection === item.section
                                return (
                                    <motion.button
                                        key={item.section}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.22, delay: index * 0.045 }}
                                        onClick={() => handleMenuItemClick(item.section)}
                                        className={`c-sky flex w-full cursor-pointer items-center justify-between rounded-[var(--r-lg)] px-5 py-4 text-left ${
                                            isActive ? 'bg-ac' : 'bg-surface shadow-[var(--shadow)]'
                                        }`}
                                    >
                                        <span className={`text-[1.3rem] font-bold tracking-[-0.025em] ${isActive ? 'text-white' : 'text-ink'}`}>
                                            {item.label}
                                        </span>
                                        <span className={isActive ? 'text-white/80' : 'text-ink-faint'} aria-hidden>↗</span>
                                    </motion.button>
                                )
                            })}
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </>
    )
}
