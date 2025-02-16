import { careerData, careerT } from "src/modules"
import styled from "styled-components"
import dayjs from 'dayjs';
import { useNavigate } from "react-router-dom";
import { ROUT_CAREER_DETAIL_WITH_ID, ROUTE_CAREER } from "src/routes/const";

export const MainCareerSection = () => {

    const navigate = useNavigate();

    const handleClickCareerDetail = (key: number) => {
        navigate(`${ROUTE_CAREER}/${ROUT_CAREER_DETAIL_WITH_ID(key)}`);
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
            <div style={{ width: "100%", display: "flex", justifyContent: "center", paddingTop:'1rem' }}>
                <ContentContainer>
                    {careerData.map((data: careerT) => {
                        return (
                            <StyledCareerContainer
                                style={{ cursor: "pointer" }}
                                onClick={() => handleClickCareerDetail(data.key)}
                                key={data.key}>
                                <h2>{data.company}</h2>
                                <p>{dayjs(data.startTerm).format("YYYY.MM")} ~ {data?.endTerm ? dayjs(data.endTerm).format("YYYY.MM") : "ing"} {data.dateString ? <>({data.dateString})</> : <></>}</p>
                                {data?.contents ? <p>{data.contents}</p> : <></>}
                            </StyledCareerContainer>
                        )})}
                    <p
                        onClick={() => handleClickCareerMain()}
                        style={{ textAlign: "right", cursor: 'pointer' }}>
                        Detail →
                    </p>
                </ContentContainer>
            </div>
        </StyledSectionContainer>
    )
}

const StyledSectionContainer = styled.section`
    width: 100%;
    padding: 4rem 0;
`

const StyledSectionHeader = styled.div`
    margin: 4rem 5rem;
    cursor: pointer;
    text-align: center;
    font-size: 1.2rem;
    font-weight: 800;
    h1 {
    margin: 0;
    font-size: 2.5rem;
    position: relative;
    }

    h1 span {
        position: relative; 
        font-weight: 400;
        color: #333;
        z-index: 1; 
    }

    h1 span:before {
        content: '';
        display: block;
        position: absolute;
        top: calc(50% + 2px);
        left: -10px;
        width: calc(100% + 20px);
        height: 30%;
        transform: translateY(-50%);
        z-index: -1;
        background-color: rgba(176, 220, 255, 0.904);
        border-radius: 4px;
    }

    @media (max-width: 768px) {
        font-size: 0.8rem;
        margin: 2rem auto;

        h1 span:before {
            height: 40%;
        }
        h1 {
            font-size: 1.5rem;
        }
    }
`

const StyledCareerContainer = styled.div`
    text-align: right;
    border-bottom: 1px #e9e9e9 solid;
    width: 100%;
    padding: 1rem;
    margin-bottom: 15px;
    p{
        margin-top: 0.5rem;
        font-size: clamp(0.8rem, 5vw, 1rem);
    }
    h2{
        font-size: clamp(1rem, 5vw, 1.6rem);
    }

    @media (max-width: 768px) {
        p{
            margin-top: 0.5rem;
            font-size: clamp(0.5rem, 5vw, 0.9rem);
        }
        h2{
            font-size: clamp(0.8rem, 5vw, 1.4rem);
        }
    }
`

const ContentContainer = styled.div`
    width: 90%;
    @media (max-width: 768px) {
        width: 95%;
    }
`