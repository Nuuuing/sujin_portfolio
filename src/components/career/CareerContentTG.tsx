import dayjs from "dayjs"
import { MiddleHeader } from "src/layouts"
import { careerData, careerSubDataTG, careerSubT, skillStackT } from "src/modules"
import styled from "styled-components"

export const CareerContentTG = () => {
    return (
        <>
            <MiddleHeader
                title={'Career'} />
            <StyledCareerContentHeader
                key={careerData[0].key}>
                <h1>{careerData[0].company}</h1>
                <p>{dayjs(careerData[0].startTerm).format("YYYY.MM")} ~ {careerData[0]?.endTerm ? dayjs(careerData[0].endTerm).format("YYYY.MM") : "ing"} {careerData[0].dateString ? <>({careerData[0].dateString})</> : <></>}</p>
                {careerData[0]?.contents ? <p>{careerData[0].contents}</p> : <></>}
            </StyledCareerContentHeader>
            {careerSubDataTG.map((data: careerSubT, index: number) => (
                <StyledCareerContents
                    key={index}>
                    <h3>{data.projTitle}</h3>
                    <h4>
                        {dayjs(data.startTerm || new Date()).format("YYYY.MM")} ~ {dayjs(data.endTerm || new Date()).format("YYYY.MM")} ({data?.dateString})
                    </h4>
                    <p style={{ marginBottom: 5 }}> {data.description} </p>
                    {data?.contents?.map((data: string) => { return (<p> ▪ {data} </p>) })}
                    <p style={{ display: "flex", justifyContent: "left", marginTop: 10 }}>
                        {data.skills?.map((skill: skillStackT, index: number) => (
                            <StyledStackBubble key={index}>
                                {skill.name}
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
    h4{
        margin: 10px 0;
    }
`

const StyledStackBubble = styled.div`
    border-radius: 10px;
    border: 1px #e9e9e9 solid;
    padding: 5px;
    font-size: 13px;
    margin: 0 2px;
`
