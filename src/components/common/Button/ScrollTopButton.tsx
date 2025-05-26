// components/ScrollToTopButton.tsx
'use client';

import { useEffect, useState } from 'react';

export const ScrollToTopButton = () => {
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

    return (
        (isVisible) && (
            <button
                onClick={scrollToTop}
                className={`fixed bottom-6 right-6 z-50 p-3 rounded-full bg-[#72AAFF] text-white shadow-lg hover:bg-[#5e9cfa] transition cursor-pointer`}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                </svg>
            </button>
        )
    );
}
