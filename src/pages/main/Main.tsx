import { useRef, useState } from "react";
import { MainCareerSection, MainContactSection, MainProjectSection, MainSplash } from "src/components/main";
import styled from "styled-components";

const Main = () => {
    const [selectNav, setSelectNav] = useState<number>(0);

    const menuItems = ["ME", "PROJECT", "CAREER"];
    const sections = [useRef(null), useRef(null), useRef(null)];

    const scrollToSection = (ref: any) => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleClickMenu = (index: number) => {
        setSelectNav(index);
        scrollToSection(sections[index]);
    }

    return (
        <StyledMainContainer>
            <div ref={sections[0]}>
            </div>
            <StyledMainNavArea>
                <NavContainer>
                    <HighlightBar selectedIndex={selectNav} />
                    {menuItems.map((item, index) => (
                        <MenuItem
                            key={index}
                            onClick={() => handleClickMenu(index)}
                            isActive={selectNav === index}
                        >
                            {item}
                        </MenuItem>
                    ))}
                </NavContainer>
            </StyledMainNavArea>
            <MainSplash />
            <div ref={sections[1]}>
                <MainProjectSection />
            </div>
            <div ref={sections[2]}>
                <MainCareerSection />
            </div>
            <div>
                <MainContactSection />
            </div>
        </StyledMainContainer>
    )
}
export default Main;

const NavContainer = styled.div`
    display: flex;
    position: relative;
    padding: 10px;
    align-items: center;
    text-align: center;
    border-bottom: 1px solid #e9e9e9;
`;

const HighlightBar = styled.div<{ selectedIndex: number }>`
    position: absolute;
    top: 50%;
    left: ${({ selectedIndex }) => selectedIndex === 0 ? '20px' : selectedIndex === 1 ? '138px' : '260px'};
    transform: translateY(-50%);
    width: 100px; 
    height: 3rem;
    background-color: #1e1e1e;
    border-radius: 15px;
    transition: left 0.3s ease-in-out;
    @media (max-width: 768px) {
        width: 76px;
        left: ${({ selectedIndex }) => selectedIndex === 0 ? '10px' : selectedIndex === 1 ? '91px' : '171px'};
    }
`;

const StyledMainNavArea = styled.div`
    position:sticky;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    padding-top: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
`

const MenuItem = styled.button<{ isActive: boolean }>`
    position: relative;
    z-index: 1; 
    background: none;
    border: none;
    cursor: pointer;
    font-weight: 600;
    font-size: 14px;
    font-family: 'omyu_pretty';
    width: 120px;
    color: ${({ isActive }) => isActive ? "#ffffff" : "#000000"};
    transition: color 0.3s ease-in-out;
    @media (max-width: 768px) {
        width: 80px;
        font-size: 12px;
    }
`;

const StyledMainContainer = styled.div`
    width: 100%;
    height: 100%;
`