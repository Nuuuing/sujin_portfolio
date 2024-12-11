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
    margin: 1rem 3rem 4rem 3rem;
`

const StyledBackButton = styled.div`
    background-color: #252425;
    color: white;
    width: 6rem;
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 15px;
`