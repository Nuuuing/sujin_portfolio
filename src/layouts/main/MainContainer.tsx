import { useState } from "react";
import styled from "styled-components"

interface MainContainerProps {
    children?: React.ReactNode;
    expanded: boolean;
}
export const MainContainer = (props: MainContainerProps) => {
    const { children, expanded } = props;

    const [selectNav, setSelectNav] = useState<number>(0);

    const menuItems = ["ME", "PROJECT", "CAREER"];

    return (
        <StyledMainContainer
            expanded={expanded}
        >
            <StyledMainNavArea>
                <NavContainer>
                    {/* 선택 배경 (애니메이션 적용) */}
                    <HighlightBar selectedIndex={selectNav} />

                    {/* 메뉴 리스트 */}
                    {menuItems.map((item, index) => (
                        <MenuItem
                            key={index}
                            onClick={() => setSelectNav(index)}
                            isActive={selectNav === index}
                        >
                            {item}
                        </MenuItem>
                    ))}
                </NavContainer>
            </StyledMainNavArea>
            {children}
        </StyledMainContainer >
    )
}

const StyledMainContainer = styled.div<{ expanded: boolean }>`
    width: ${({ expanded }) => (expanded ? "calc(100% - 18rem)" : "calc(100% - 6rem)")};
    background-color: #ffffff;
    border-radius: 40px;
    margin: 2.5rem 0 2.5rem 2.5rem;
    overflow: scroll;
    border: solid 1px #dddddd;
    transition: width 0.2s ease-in-out;
`

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
    left: ${({ selectedIndex }) => selectedIndex == 0 ? '20px' : selectedIndex ==1 ?  '140px' : '260px'};
    transform: translateY(-50%);
    width: 100px; 
    height: 3rem;
    background-color: #a9dcff;
    border-radius: 15px;
    transition: left 0.3s ease-in-out;
`;

const MenuItem = styled.button<{ isActive: boolean }>`
    position: relative;
    z-index: 1; 
    background: none;
    border: none;
    cursor: pointer;
    font-weight: 600;
    font-size: 14px;
    width: 120px;
    color: ${({ isActive }) => ( "#1c1c1c")};
    transition: color 0.3s ease-in-out;
`;