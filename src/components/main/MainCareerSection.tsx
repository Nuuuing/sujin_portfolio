import { careerData, careerT } from "src/modules"
import styled from "styled-components"
import dayjs from 'dayjs';
import { useNavigate } from "react-router-dom";
import { ROUT_CAREER_DETAIL_WITH_ID, ROUTE_CAREER } from "src/routes/const";

export const MainCareerSection = () => {

    const navigate = useNavigate();

    const handleClickCareerDetail = (key: number) => {
        navigate(ROUT_CAREER_DETAIL_WITH_ID(key));
    }

    const handleClickCareerMain = () => {
        navigate(ROUTE_CAREER);
    }

    return (
        <StyledSectionContainer
            key={1}
        >
            <StyledSectionHeader
                key={1}
                onClick={() => handleClickCareerMain()}>
                <h1><span>Career</span></h1>
            </StyledSectionHeader>
            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <div style={{ width: "90%" }}>
                    {careerData.map((data: careerT) => {
                        return (
                            <StyledCareerContainer
                                style={{cursor:"pointer"}}
                                onClick={() => handleClickCareerDetail(data.key)}
                                key={data.key}
                            >
                                <h2>{data.company}</h2>
                                <p>{dayjs(data.startTerm).format("YYYY.MM")} ~ {data?.endTerm ? dayjs(data.endTerm).format("YYYY.MM") : "ing"}</p>
                            </StyledCareerContainer>
                        )
                    })
                    }
                </div>
            </div>
        </StyledSectionContainer>
    )
}

const StyledSectionContainer = styled.section`
    width: 100%;
`

const StyledSectionHeader = styled.div`
    margin: 4rem 5rem;
    cursor: pointer;
    text-align: center;
    font-size: 1.2rem;
    font-weight: 800
    h1 {
        margin: 0;
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

const StyledCareerContainer = styled.div`
    text-align: right;
    border-bottom: 1px #e9e9e9 solid;
    width: 90%;
    padding: 1rem;
    margin-bottom: 15px;
`
