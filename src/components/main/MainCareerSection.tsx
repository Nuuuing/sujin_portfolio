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
                style={{cursor:"pointer"}}
                onClick={() => handleClickCareerMain()}>
                <h2>Career</h2>
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
    margin: 2rem 5rem;
`

const StyledCareerContainer = styled.div`
    text-align: right;
    border-bottom: 1px #e9e9e9 solid;
    width: 90%;
    padding: 1rem;
    margin-bottom: 15px;
`
