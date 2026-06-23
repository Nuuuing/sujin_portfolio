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

    const [activeSection, setActiveSection] = useState<Section | null>(null);

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
                    setActiveSection(section.key as Section);
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
    }

    const NAV_SECTIONS: { key: Section; label: string }[] = [
        { key: 'INTRO', label: '소개' },
        { key: 'CAREER', label: '경력' },
        { key: 'PROJECT', label: '프로젝트' },
        { key: 'BLOG', label: '블로그' },
        { key: 'CONTACT', label: '연락처' },
    ];;

    return (
        <div className="w-full min-h-screen relative">
            {/* 전역 배경 장식 */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[18%] -left-40 w-80 h-80 bg-[var(--sage)]/25 rounded-full blur-3xl" />
                <div className="absolute top-[55%] -right-40 w-96 h-96 bg-[var(--sage)]/20 rounded-full blur-3xl" />
                <div className="absolute top-[82%] left-1/4 w-56 h-56 bg-[var(--taupe)]/8 rounded-full blur-3xl" />
            </div>

            <Header onMenuClick={handleMenuClick} onMenuOpenChange={setIsMenuOpen} />

            <main className="pt-16 relative z-10">
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <section ref={introRef} className="flex items-start py-10 sm:py-14">
                        <MainSplash />
                    </section>

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

                    <footer className="py-8 sm:py-12 border-t border-line text-center text-ink-soft">
                        <p className="text-xs sm:text-sm mb-2">본 페이지는 상업적 목적이 아닌 개인 포트폴리오용으로 제작되었습니다.</p>
                        <p className="text-xs sm:text-sm text-ink-soft/70">© 2026 Kim Sujin. All Rights Reserved.</p>
                    </footer>
                </div>
            </main>

            {/* 우측 섹션 dot nav */}
            <nav className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center">
                {NAV_SECTIONS.map((s, i) => (
                    <div key={s.key} className="flex flex-col items-center">
                        {i > 0 && (
                            <div className={`w-px transition-all duration-500 ${activeSection === s.key ? 'h-7 bg-[var(--taupe)]/30' : 'h-7 bg-line'}`} />
                        )}
                        <button
                            onClick={() => handleMenuClick(s.key)}
                            className="group relative flex items-center justify-center p-1.5 cursor-pointer"
                            aria-label={s.label}
                        >
                            <span className="absolute right-6 whitespace-nowrap text-[11px] font-medium text-ink-soft opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                {s.label}
                            </span>
                            <span className={`rounded-full transition-all duration-300 ${
                                activeSection === s.key
                                    ? 'w-2 h-2 bg-[var(--taupe)] ring-2 ring-[var(--taupe)]/30 ring-offset-2 ring-offset-[var(--bg)]'
                                    : 'w-1.5 h-1.5 bg-[var(--line-strong)] group-hover:bg-[var(--taupe)]/60 group-hover:scale-125'
                            }`} />
                        </button>
                    </div>
                ))}
            </nav>

            <ScrollToTopButton className={isMenuOpen ? 'z-30' : 'z-50'} />
        </div>
    );
}
