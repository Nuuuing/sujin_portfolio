'use client'

import { BlogSection, CareerSection, ContactSection, Header, MainSplash, ProjSection, ScrollToTopButton } from "@/components";
import { useEffect, useRef, useState } from "react";
import { BlogPostT } from "@/features/blog";

type Section = 'INTRO' | 'PROJECT' | 'CAREER' | 'CONTACT' | 'BLOG';

interface HomeClientProps {
    posts: BlogPostT[];
}

export function HomeClient({ posts }: HomeClientProps) {
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
                { key: 'CAREER', ref: careerRef },
                { key: 'PROJECT', ref: projectRef },
                { key: 'BLOG', ref: blogRef },
                { key: 'CONTACT', ref: contactRef },
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


    return (
        <div className="relative min-h-screen w-full">
            <Header onMenuClick={handleMenuClick} onMenuOpenChange={setIsMenuOpen} activeSection={activeSection} />

            <main className="pt-20 sm:pt-24">
                <div className="shell">
                    <section ref={introRef} className="pb-14 sm:pb-20">
                        <MainSplash />
                    </section>

                    <section ref={careerRef} className="py-14 sm:py-20">
                        <CareerSection />
                    </section>

                    <section ref={projectRef} className="py-14 sm:py-20">
                        <ProjSection />
                    </section>

                    <section ref={blogRef} className="py-14 sm:py-20">
                        <BlogSection posts={posts} />
                    </section>

                    <section ref={contactRef} className="py-14 sm:py-20">
                        <ContactSection />
                    </section>

                    <footer className="flex flex-wrap items-center justify-between gap-2 px-1 pb-10 pt-4 text-center sm:text-left">
                        <p className="text-[0.85rem] text-ink-mute">본 페이지는 상업적 목적이 아닌 개인 포트폴리오용으로 제작되었습니다.</p>
                        <p className="tnum text-[0.85rem] text-ink-faint">© 2026 Kim Sujin</p>
                    </footer>
                </div>
            </main>

            <ScrollToTopButton className={isMenuOpen ? 'z-30' : 'z-50'} />
        </div>
    );
}
