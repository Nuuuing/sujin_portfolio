import { useRef } from "react";
import { Footer } from "src/components";
import { MainCareerSection, MainContactSection, MainProjectSection, MainSplash } from "src/components/main";
import styled from "styled-components";

const Main = () => {
    const projectRef = useRef(null);
    const careerRef = useRef(null);
    const contactRef = useRef(null);

    // 스크롤 이동 함수
    const scrollToSection = (ref: any) => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <StyledMainContainer>
            {/* 버튼이나 트리거 요소 */}
            <MainSplash />

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <StyledIndexContainer>
                    <h2 onClick={() => scrollToSection(projectRef)}>Projects</h2>
                    <h2 onClick={() => scrollToSection(careerRef)}>Career</h2>
                    <h2 onClick={() => scrollToSection(contactRef)}>Contact</h2>
                </StyledIndexContainer>
            </div>
            <div ref={projectRef}>
                <MainProjectSection />
            </div>

            <div ref={careerRef}>
                <MainCareerSection />
            </div>

            <div ref={contactRef}>
                <MainContactSection />
            </div>
            <div style={{ marginBottom: "2rem" }} />
            <Footer />
        </StyledMainContainer>
    )
}
export default Main;

const StyledIndexContainer = styled.div`
    width: 80%;
    h2{
        cursor: pointer;
        margin-bottom: 1.5rem;
    }
`

const StyledMainContainer = styled.div`
    width: 100%;
    height: 100%;
`