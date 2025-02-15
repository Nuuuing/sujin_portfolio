import { Outlet } from "react-router-dom"
import { InfoContainer, MainContainer, MobileInfoContainer } from "."
import { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { useRecoilState } from "recoil";
import { isMobileAtom } from "src/modules";
import { throttle } from 'lodash';

const fadeIn = keyframes`
    from { opacity: 0; transform: translateX(+100px); }
    to { opacity: 1; transform: translateX(0); }
`;

export const MainLayout = () => {
    const [expanded, setExpanded] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useRecoilState<boolean>(isMobileAtom);
    const [isFullScreen, setIsFullScreen] = useState<boolean>(false);


    useEffect(() => {
        const handleResize = throttle(() => {
            setIsMobile(window.innerWidth <= 768);
        }, 200);

        handleResize(); // 초기 실행
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [setIsMobile]);

    return (
        <StyledMain
            isFullScreen={isFullScreen}
            isMobile={isMobile}>
            {
                (isMobile && isFullScreen) ?
                    (
                        <MobileInfoContainer
                            handleClose={() => setIsFullScreen(!isFullScreen)}
                        />
                    ) :
                    (<MainContainer
                        expanded={expanded}>
                        <Outlet />
                    </MainContainer>)
            }
            {
                !isMobile &&
                (<InfoContainer
                    expanded={expanded}
                    toggleClick={() => setExpanded(!expanded)}
                />)
            }
            {
                (isMobile && !isFullScreen) &&
                <FloatingButton
                    onClick={() => setIsFullScreen(!isFullScreen)}>
                    <p> About Me </p>
                </FloatingButton>
            }
        </StyledMain >
    )
}

const StyledMain = styled.div.withConfig({
    shouldForwardProp: (prop) => !["isFullScreen", "isMobile"].includes(prop)
})<{ isFullScreen: boolean, isMobile: boolean }>`
    display: flex;
    justify-content: space-around;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: relative;

    ${props => props.isFullScreen && props.isMobile && css`
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: fixed;
        width: 100%;
        top: 0;
        left: 0;
        background-color: white;
        z-index: 9999;
        animation: ${fadeIn} 0.5s ease-in-out;        
        overflow-y: scroll;
        overflow-x: hidden;
    `}

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

const FloatingButton = styled.div`
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: rgba(176, 220, 255);
    color: white;
    border: none;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    font-size: 16px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s;
    padding: 15px 0;

    &:hover {
        background-color: rgba(176, 220, 255);
    }
`