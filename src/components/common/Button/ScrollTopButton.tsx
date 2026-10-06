// components/ScrollToTopButton.tsx
'use client';

import { useEffect, useState } from 'react';

interface ScrollToTopButtonProps {
    className?: string
}

export const ScrollToTopButton = ({ className }: ScrollToTopButtonProps) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > 200);
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (!isVisible) return null;

    return (
        <button
            onClick={scrollToTop}
            aria-label="맨 위로"
            className={`fixed bottom-5 right-5 cursor-pointer border border-[var(--line-strong)] bg-[var(--ink)] p-2.5 text-[var(--bg)] transition-colors hover:bg-[var(--ac)] hover:border-[var(--ac)] ${className ?? 'z-50'}`}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
        </button>
    );
}
