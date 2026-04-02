'use client'

import { BlogSection, CareerSection, ContactSection, Header, MainSplash, ProjSection, ScrollToTopButton } from "@/components";
import { useEffect, useRef, useState } from "react";

type Section = 'INTRO' | 'PROJECT' | 'CAREER' | 'CONTACT' | 'BLOG';

export default function Home() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const introRef = useRef<HTMLDivElement>(null);
    const projectRef = useRef<HTMLDivElement>(null);
    const careerRef = useRef<HTMLDivElement>(null);
    const contactRef = useRef<HTMLDivElement>(null);
    const blogRef = useRef<HTMLDivElement>(null);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_activeSection, setActiveSection] = useState<Section | null>(null);

    const sectionRefs: Record<Section, React.RefObject<HTMLDivElement | null>> = {
        INTRO: introRef,
        PROJECT: projectRef,
        CAREER: careerRef,
        BLOG: blogRef,
        CONTACT: contactRef,
    };

    useEffect(() => {
        const handleScroll = () => {
            const sections: { key: Section; ref: React.RefObject<HTMLDivElement | null> }[] = [
                { key: 'INTRO', ref: introRef },
                { key: 'PROJECT', ref: projectRef },
                { key: 'CAREER', ref: careerRef },
                { key: 'CONTACT', ref: contactRef },
                { key: 'BLOG', ref: blogRef },
            ];

            const scrollY = window.scrollY + window.innerHeight / 3;

            for (const section of sections) {
                const el = section.ref.current;
                if (!el) continue;

                const { top } = el.getBoundingClientRect();
                const offsetTop = top + window.scrollY;
                const offsetBottom = offsetTop + el.offsetHeight;

                if (scrollY >= offsetTop && scrollY < offsetBottom) {
                    setActiveSection(section.key);
                    break;
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleMenuClick = (section: string) => {
        const selectedRef = sectionRefs[section as Section];
        if (selectedRef?.current) {
            selectedRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        setActiveSection(section as Section);
    };

    return (
        <div className="w-full min-h-screen relative">
            {/* 전역 배경 장식 */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[20%] -left-32 w-64 h-64 bg-[#72AAFF]/3 rounded-full blur-3xl" />
                <div className="absolute top-[50%] -right-32 w-72 h-72 bg-[#72AAFF]/3 rounded-full blur-3xl" />
                <div className="absolute top-[80%] left-1/4 w-48 h-48 bg-purple-500/3 rounded-full blur-3xl" />
            </div>

            <Header onMenuClick={handleMenuClick} onMenuOpenChange={setIsMenuOpen} />

            <main className="pt-16 relative z-10">
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <section ref={introRef} className="min-h-[calc(90vh-4rem)] flex items-center py-4 sm:py-6">
                        <MainSplash />
                    </section>

                    <div className="flex flex-col items-center pb-12">
                        <div className="w-5 h-8 sm:w-6 sm:h-10 rounded-full border-2 border-gray-600 flex justify-center pt-1.5 sm:pt-2">
                            <div className="w-1 h-1.5 sm:h-2 bg-[#72AAFF] rounded-full animate-bounce" />
                        </div>
                        <svg
                            className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 mt-2 animate-pulse"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </div>

                    <section ref={careerRef} className="py-12 sm:py-16 lg:py-20">
                        <CareerSection />
                    </section>

                    <section ref={projectRef} className="py-12 sm:py-16 lg:py-20">
                        <ProjSection />
                    </section>

                    <section ref={blogRef} className="py-12 sm:py-16 lg:py-20">
                        <BlogSection />
                    </section>

                    <section ref={contactRef} className="py-12 sm:py-16 lg:py-20">
                        <ContactSection />
                    </section>

                    <footer className="py-8 sm:py-12 border-t border-gray-800 text-center text-gray-500">
                        <p className="text-xs sm:text-sm mb-2">본 페이지는 상업적 목적이 아닌 개인 포트폴리오용으로 제작되었습니다.</p>
                        <p className="text-xs sm:text-sm text-gray-600">© 2026 Kim Sujin. All Rights Reserved.</p>
                    </footer>
                </div>
            </main>

            <ScrollToTopButton className={isMenuOpen ? 'z-30' : 'z-50'} />
        </div>
    );
}
