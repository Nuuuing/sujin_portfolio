'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { MenuIcon, CloseIcon } from '../common/icons'

interface HeaderProps {
    onMenuClick?: (section: string) => void
    onMenuOpenChange?: (isOpen: boolean) => void
}

export const Header = ({ onMenuClick, onMenuOpenChange }: HeaderProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = (open: boolean) => {
        setIsMenuOpen(open)
        onMenuOpenChange?.(open)
    }

    const menuItems = [
        { label: '소개', section: 'INTRO' },
        { label: '경력', section: 'CAREER' },
        { label: '프로젝트', section: 'PROJECT' },
        { label: '블로그', section: 'BLOG' },
        { label: '연락처', section: 'CONTACT' },
    ]

    const handleMenuItemClick = (section: string) => {
        toggleMenu(false)
        onMenuClick?.(section)
    }

    return (
        <>
            <header className="w-full fixed top-0 left-0 flex justify-between items-center z-50 h-12 sm:h-14 px-4 sm:px-6 lg:px-8 bg-[var(--bg)]/85 backdrop-blur-md border-b border-line">
                <button
                    onClick={() => handleMenuItemClick('INTRO')}
                    className="text-sm font-semibold tracking-[0.22em] text-taupe uppercase cursor-pointer"
                >
                    Kim Sujin
                </button>
                {/* Desktop Menu */}
                <nav className="hidden lg:flex gap-7 xl:gap-9 text-sm font-medium items-center">
                    {menuItems.map((item) => (
                        <button
                            key={item.section}
                            className="cursor-pointer text-ink-soft hover:text-ink transition-colors relative group"
                            onClick={() => handleMenuItemClick(item.section)}
                        >
                            {item.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-[var(--taupe)] group-hover:w-full transition-all duration-300" />
                        </button>
                    ))}
                </nav>
                {/* Mobile Menu Button */}
                <button
                    className="lg:hidden flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 cursor-pointer z-50 text-ink"
                    onClick={() => toggleMenu(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
                </button>
            </header>

            {/* Mobile Fullscreen Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.nav
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="lg:hidden fixed inset-0 z-40 bg-[var(--bg)] flex flex-col items-center justify-center gap-6 sm:gap-8"
                    >
                        {menuItems.map((item, index) => (
                            <motion.button
                                key={item.section}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="text-xl sm:text-2xl font-medium text-ink cursor-pointer hover:text-taupe transition-colors"
                                onClick={() => handleMenuItemClick(item.section)}
                            >
                                {item.label}
                            </motion.button>
                        ))}
                    </motion.nav>
                )}
            </AnimatePresence>
        </>
    )
}