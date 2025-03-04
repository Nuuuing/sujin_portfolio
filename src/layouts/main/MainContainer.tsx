import { Footer } from "src/components";
import styled from "styled-components"

interface MainContainerProps {
    children?: React.ReactNode;
    expanded: boolean;
}
export const MainContainer = (props: MainContainerProps) => {
    const { children, expanded } = props;

    return (
        <StyledMainContainer
            expanded={expanded}
        >
            <ContentWrapper>
                {children}
            </ContentWrapper>
            <Footer />
        </StyledMainContainer >
    )
}

const StyledMainContainer = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== "expanded"
})<{ expanded: boolean }>`
    width: ${({ expanded }) => (expanded ? "calc(100% - 18rem)" : "calc(100% - 6rem)")};
    background: radial-gradient(circle, rgba(229,242,255,1) 0%, rgba(255,255,255,1) 43%);
    border-radius: 40px;
    margin: 2.5rem;
    border: solid 1px #dddddd;
    transition: width 0.1s ease-in-out;
    overflow-y: scroll;

    @media (max-width: 768px) {
        width: 100vw;
        height: 100vh;
        margin: 0;
        border-radius: 0;
    }
`

const ContentWrapper = styled.div`
    padding-bottom: 10px;
`