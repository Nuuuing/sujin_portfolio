import styled from "styled-components";

const NotFound = () => {
    return (
        <>
            <StyledNotFoundContainer>
                <StyledContentContainer>
                    <h2>페이지를 찾을 수 없습니다.</h2>
                    <br />
                    <p>다시 확인해주세요.</p>
                </StyledContentContainer>
            </StyledNotFoundContainer>
        </>
    )
}

const StyledNotFoundContainer = styled.div`
    width: 100%;
    height: calc(100% - 5rem);
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const StyledContentContainer = styled.div`
    text-align: center;
`
export default NotFound;