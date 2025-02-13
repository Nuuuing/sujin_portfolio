import { useNavigate } from "react-router-dom";
import styled from "styled-components"

export const DetailHeader = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }
    
    return (
        <StyledContainer>
            <StyledBackButton
                onClick={() => { goBack() }}
            >
                {"< 돌아가기"}
            </StyledBackButton>
            <div style={{ width: "5rem" }}></div>
        </StyledContainer>
    )
}

const StyledContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 2rem;
    @media (max-width: 768px) {
        margin: 1rem;
    }
`

const StyledBackButton = styled.div`
    background-color: #252425;
    color: white;
    width: 6rem;
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 15px;
    @media (max-width: 768px) {
        width: 5rem;
        padding: 5px 10px;
        font-size: 13px;
    }
`