'use client'

import { CareerSection, ContactSection, Header, MainSplash, Menu, ProjSection, ScrollToTopButton } from "@/components";
import { useEffect, useRef, useState } from "react";

export default function Home() {
    const mainRef = useRef<HTMLDivElement>(null);
    const projectRef = useRef<HTMLDivElement>(null);
    const careerRef = useRef<HTMLDivElement>(null);
    const contactRef = useRef<HTMLDivElement>(null);

    const [activeSection, setActiveSection] = useState<'PROJECT' | 'CAREER' | 'CONTACT' | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            const sections = [
                { key: 'PROJECT', ref: projectRef },
                { key: 'CAREER', ref: careerRef },
                { key: 'CONTACT', ref: contactRef },
            ] as const;

            const scrollY = window.scrollY + window.innerHeight / 3;

            for (const section of sections) {
                const el = section.ref.current;
                if (!el) continue;

                const { top, } = el.getBoundingClientRect();
                const offsetTop = top + window.scrollY;
                const offsetBottom = offsetTop + el.offsetHeight;

                if (scrollY >= offsetTop && scrollY < offsetBottom) {
                    setActiveSection(section.key);
                    break;
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // 초기 상태

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleMenuClick = (section: 'PROJECT' | 'CAREER' | 'CONTACT') => {
        const refs = {
            PROJECT: projectRef,
            CAREER: careerRef,
            CONTACT: contactRef,
        };

        const selectedRef = refs[section];
        if (selectedRef?.current) {
            selectedRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }

        setActiveSection(section);
    };

    return (
        <div className="w-screen h-screen p-12">
            <Header />
            <div className="mt-[2rem]">
                <div className="hidden lg:block fixed left-10 w-[200px] mr-8">
                    <Menu onMenuClick={handleMenuClick} active={activeSection} />
                </div>
                <div className="flex-1 ml-0 lg:ml-[200px] py-6">
                    <div ref={mainRef} className="mt-[11rem] mb-[14rem]">
                        <MainSplash />
                    </div>
                    <div ref={projectRef}>
                        <ProjSection />
                    </div>
                    <div ref={careerRef} className="mt-[10rem] mb-[12rem]">
                        <CareerSection />
                    </div>
                    <div ref={contactRef} className="mt-[6rem] mb-[5rem]">
                        <ContactSection />
                    </div>
                </div>
                <div className='w-100% mx-20 py-8 border-[#f0f0f0] border-t-1 text-sm'>
                    <p>본 페이지는 상업적 목적이 아닌 개인 포트폴리오용으로 제작되었습니다.</p>
                    <p>© 2025 Kim Sujin. All Rights Reserved.</p>
                </div>
            </div>
            <ScrollToTopButton />
        </div>
  );
}
