import styled from "styled-components"

export const ProjHeader = () => {
    return (
        <StyledProjHeader
            key={0}>
            <h1><span>Projects</span></h1>
        </StyledProjHeader>
    )
}

const StyledProjHeader = styled.div`
    margin: 8rem 5rem;
    text-align: center;
    font-size: 1.2rem;
    font-weight: 800;
    padding-bottom: 8rem;
    border-bottom: 1px #e9e9e9 solid;
    h1 {
        margin: 0;
        font-size: 2.5rem;
    }

    h1 span {
        position: relative;
        font-weight: 400;
        color: #333;
    }

    h1 span:before {
        content: '';
        display: block;
        position: absolute;
        top: 50%;
        left: -10px;
        width: calc(100% + 20px);
        height: 30%; /* 높이 조정 */
        transform: translateY(-50%);
        z-index: -1;
        background-color: rgba(176, 220, 255, 0.904); /* 투명도 추가 */
        border-radius: 4px; /* 부드러운 테두리 */
    }

    @media (max-width: 768px) {
        font-size: 1rem; /* 작은 화면에 맞게 폰트 크기 조정 */
        margin: 2rem auto;

        h1 span:before {
            height: 40%; /* 더 적은 여백 */
        }
    }
`