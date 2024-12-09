import dayjs from "dayjs"
import { careerData, careerSubDataTG, careerSubT, skillStackT } from "src/modules"
import styled from "styled-components"

export const CareerContentTG = () => {
    return (
        <>
            <StyledCareerHeader
                key={0}>
                <h1><span>Career</span></h1>
            </StyledCareerHeader>
            <StyledCareerContentHeader
                key={careerData[0].key}>
                <h1>{careerData[0].company}</h1>
                <p>{dayjs(careerData[0].startTerm).format("YYYY.MM")} ~ {careerData[0]?.endTerm ? dayjs(careerData[0].endTerm).format("YYYY.MM") : "ing"} {careerData[0].dateString ? <>({careerData[0].dateString})</> : <></>}</p>
                {careerData[0]?.contents ? <p>{careerData[0].contents}</p> : <></>}
            </StyledCareerContentHeader>
            {careerSubDataTG.map((data: careerSubT, index: number) => (
                <StyledCareerContents
                    key={index}>
                    <h4>{data.projTitle || "No Title"}</h4>
                    <p>
                        {dayjs(data.startTerm || new Date()).format("YYYY.MM")} ~ {dayjs(data.endTerm || new Date()).format("YYYY.MM")}
                    </p>
                    <p style={{ display: "flex", justifyContent: "right", marginTop: 10 }}>
                        {data.skills?.map((skill: skillStackT, index: number) => (
                            <StyledStackBubble key={index}>
                                {skill.name || "Unknown Skill"}
                            </StyledStackBubble>
                        ))}
                    </p>
                </StyledCareerContents>
            ))}
        </>
    )
}

const StyledCareerContentHeader = styled.div`
    margin-top: 1rem;
    width: 90%;
    text-align: right;
    margin-bottom: 4rem;
    padding: 2rem;
    h1{
        font-size: 2rem;
    }
    p{
        margin-top: 0.5rem;
        font-size: 1.2rem;
    }
`

const StyledCareerContents = styled.div`
    padding: 1rem;
    border-bottom: solid 1px #e9e9e9;
    width: 100%;
    text-align: right;
`

const StyledStackBubble = styled.div`
    border-radius: 10px;
    border: 1px #e9e9e9 solid;
    padding: 5px;
    font-size: 13px;
    margin: 0 2px;
`

const StyledCareerHeader = styled.div`
    margin: 4rem 5rem;
    cursor: pointer;
    text-align: center;
    font-size: 1.2rem;
    font-weight: 800;
    padding-bottom: 4rem;
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