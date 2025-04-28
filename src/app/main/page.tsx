'use client'

import { Header, Menu } from "@/components";
import { useRef } from "react";

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
    <div style={{ width: '100%', height: '100%', padding: '3rem' }}>
      <Header />
      <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'flex-end' }}>
        <div className="hidden lg:block" style={{ width: '200px', marginRight: '2rem' }}>
          <Menu onMenuClick={handleMenuClick} />
        </div>
        <div style={{ flex: 1 }}>
          <div ref={mainRef}>
            <h1></h1>
          </div>
          <div ref={projectRef} style={{ height: 400, background: '#eee' }}>
            <h1>PROJECT 섹션</h1>
          </div>
          <div ref={careerRef} style={{ height: 400, background: '#ddd' }}>
            <h1>CAREER 섹션</h1>
          </div>
          <div ref={contactRef} style={{ height: 400, background: '#ccc' }}>
            <h1>CONTACT 섹션</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
