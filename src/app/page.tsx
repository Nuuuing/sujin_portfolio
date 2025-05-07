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
    <div style={{ width: '100vw', height: '100vh', padding: '3rem' }}>
      <Header />
      <div style={{ width: '100%', height: 'calc(100vh - 3rem)', display: 'flex', justifyContent: 'flex-end', marginTop: '8rem' }}>
        <div className="hidden lg:block" style={{ width: '200px', marginRight: '2rem', position: 'fixed', left: 40 }}>
          <Menu onMenuClick={handleMenuClick} />
        </div>
        <div style={{ width: 'calc(100% - 200px)' }}>
          <div ref={mainRef}>
            <MainSplash />
          </div>
          <div ref={projectRef} >
            <ProjSection />
          </div>
          <div ref={careerRef} style={{ height: 400, background: '#ddd' }}>
            <CareerSection />
          </div>
          <div ref={contactRef} style={{ height: 400, background: '#ccc' }}>
            <ContactSection />
          </div>
        </div>
      </div>
    </div>
  );
}
