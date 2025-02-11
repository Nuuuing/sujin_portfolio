import styled from "styled-components"
import fold from 'src/assets/img/icon/fold.svg';
import open from 'src/assets/img/icon/open.svg';

interface InfoContainerProps {
    expanded: boolean;
    toggleClick: () => void;
}
export const InfoContainer = (props: InfoContainerProps) => {
    const { expanded, toggleClick } = props;
    return (
        <StyledInfoContainer
            expanded={expanded}>
            <StyledButtonArea>
                <img
                    src={expanded ? fold : open}
                    alt={expanded ? "fold" : "open"}
                    onClick={toggleClick}
                />
            </StyledButtonArea>
        </StyledInfoContainer>
    )
}

const StyledInfoContainer = styled.div<{ expanded: boolean }>`
    width: ${({ expanded }) => (expanded ? "18rem" : "6rem")};
    background-color: #ffffff;
    border-radius: 40px;
    margin: 2.5rem 2.5rem 2.5rem 1.5rem;
    border: solid 1px #dddddd;
    padding: 1rem 2.2rem;
    transition: width 0.2s ease-in-out;
`

const StyledButtonArea = styled.div`
    cursor: pointer;
`