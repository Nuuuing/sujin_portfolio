import { Outlet } from "react-router-dom"
import { InfoContainer, MainContainer } from "."
import { useState } from "react";
import styled from "styled-components";

export const MainLayout = () => {
    const [expanded, setExpanded] = useState<boolean>(false);

    return (
        <StyledMain>
            <MainContainer
                expanded={expanded}>
                <Outlet />
            </MainContainer>
            <InfoContainer
                expanded={expanded}
                toggleClick={() => setExpanded(!expanded)}
            />
        </StyledMain>
    )
}

const StyledMain = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 100%;
`