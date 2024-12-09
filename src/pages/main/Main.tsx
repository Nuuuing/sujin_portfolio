import { useRef } from "react";
import { Footer } from "src/components";
import { MainCareerSection, MainContactSection, MainProjectSection, MainSplash } from "src/components/main";
import styled from "styled-components";

const Main = () => {
    const projectRef = useRef(null);
    const careerRef = useRef(null);
    const contactRef = useRef(null);

    const scrollToSection = (ref: any) => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <StyledMainContainer>
            <MainSplash />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <StyledIndexContainer>
                    <h2 onClick={() => scrollToSection(projectRef)}>💻 Projects</h2>
                    <br/>
                    <h2 onClick={() => scrollToSection(careerRef)}>💼 Career</h2>
                    <br/>
                    <h2 onClick={() => scrollToSection(contactRef)}>📧 Contact</h2>
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
        display: inline-block;
        margin-bottom: 1.5rem;
        padding : 0 0.4rem 0.4rem 0.4rem;
        border-bottom: 2px #e9e9e9 solid;
    }
`

const StyledMainContainer = styled.div`
    width: 100%;
    height: 100%;
`