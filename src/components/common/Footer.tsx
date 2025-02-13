import styled from "styled-components"

export const Footer = () => {
    return (
        <StyledFooterContainer>
            <StyledFooterContentContainer>
                <p style={{ marginBottom: 10 }}>본 페이지는 상업적 목적이 아닌 개인 포트폴리오용으로 제작되었습니다.</p>
                <p>© 2025 Kim Sujin. All Rights Reserved.</p>
            </StyledFooterContentContainer>
        </StyledFooterContainer>
    )
}

const StyledFooterContainer = styled.div`
    width: 100%;
    height: 7rem;
    display: flex;
    justify-content: left;
    padding: 15px 5rem;
    font-size: small;
    border-top: 1px solid #e9e9e9;
`

const StyledFooterContentContainer = styled.div`
    padding-top: 1rem;
    text-align: left;
`