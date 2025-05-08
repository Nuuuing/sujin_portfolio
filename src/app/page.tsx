'use client'

import { Header, Menu } from "@/components";
import { useRef } from "react";
import { CareerSection, ContactSection, MainSplash, ProjSection } from "./main";

export default function MainPage() {
  const mainRef = useRef<HTMLDivElement>(null);
  const projectRef = useRef<HTMLDivElement>(null);
  const careerRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);


  const handleMenuClick = (section: 'MAIN' | 'PROJECT' | 'CAREER' | 'CONTACT') => {
    const refs = {
      MAIN: mainRef,
      PROJECT: projectRef,
      CAREER: careerRef,
      CONTACT: contactRef,
    };

    const selectedRef = refs[section];
    if (selectedRef?.current) {
      selectedRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="w-screen h-screen p-12">
      <Header />
      <div className="flex justify-end mt-32 h-[calc(100vh-3rem)]">
        <div className="hidden lg:block fixed left-10 w-[200px] mr-8">
          <Menu onMenuClick={handleMenuClick} />
        </div>
        <div className="flex-1 ml-[200px] py-8">
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
