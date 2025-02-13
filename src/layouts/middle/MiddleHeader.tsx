import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface MiddleHeaderProps {
    title: string;
}
export const MiddleHeader = (props: MiddleHeaderProps) => {
    const { title } = props;

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }


    return (
        <>
            <StyledBackContainer>
                <StyledBackButton
                    onClick={() => { goBack() }}
                >
                    {"< 돌아가기"}
                </StyledBackButton>
            </StyledBackContainer>
            <StyledHeaderContent
                key={0}>
                <h1><span>{title}</span></h1>
            </StyledHeaderContent>
        </>
    )
}


const StyledBackContainer = styled.div`
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

const StyledHeaderContent = styled.div`
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