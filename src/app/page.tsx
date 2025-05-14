'use client'

import { Header, Menu } from "@/components";
import { useEffect, useRef, useState } from "react";
import { CareerSection, ContactSection, MainSplash, ProjSection } from "./main";

export default function MainPage() {
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

        const { top, bottom } = el.getBoundingClientRect();
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
      <div className="flex justify-end mt-32 h-[calc(100vh-3rem)]">
        <div className="hidden lg:block fixed left-10 w-[200px] mr-8">
          <Menu onMenuClick={handleMenuClick} active={activeSection} />
        </div>
        <div className="flex-1 ml-0 lg:ml-[200px] py-8">
          <div ref={mainRef}>
            <MainSplash />
          </div>
          <div ref={projectRef}>
            <ProjSection />
          </div>
          <div ref={careerRef} className="h-[400px] bg-gray-300">
            <CareerSection />
          </div>
          <div ref={contactRef} className="h-[400px] bg-gray-200">
            <ContactSection />
          </div>
        </div>
      </div>
    </div>
  );
}
