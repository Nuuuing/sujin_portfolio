import { careerData, careerT } from "src/modules"
import styled from "styled-components"
import { useNavigate } from "react-router-dom";
import { ROUT_CAREER_DETAIL_WITH_ID } from "src/routes/const";
import dayjs from "dayjs";
import { MiddleHeader } from "src/layouts";

export const CareerList = () => {

    const navigate = useNavigate();

    const handleClickCareerDetail = (key: number) => {
        navigate(ROUT_CAREER_DETAIL_WITH_ID(key));
    }

    return (
        <div>
            <MiddleHeader
                title={'Career'} />
            {careerData.map((data: careerT) => {
                return (
                    <StyledCareerContainer
                        style={{ cursor: "pointer" }}
                        onClick={() => handleClickCareerDetail(data.key)}
                        key={data.key}>
                        <p>●</p>
                        <br />
                        <br />
                        <h2>{data.company}</h2>
                        <p>{dayjs(data.startTerm).format("YYYY.MM")} ~ {data?.endTerm ? dayjs(data.endTerm).format("YYYY.MM") : "ing"} {data.dateString ? <>({data.dateString})</> : <></>}</p>
                        {data?.contents ? <p>{data.contents}</p> : <></>}
                    </StyledCareerContainer>
                )
            })}
        </div>
    )
}

const StyledCareerContainer = styled.div`
    text-align: center;
    width: 100%;
    padding: 1rem;
    margin-bottom: 8rem;
    p{
        margin-top: 0.5rem;
    }
    @media (max-width: 768px) {
        margin-bottom: 10rem;
    }
`