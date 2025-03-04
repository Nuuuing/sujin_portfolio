import { useNavigate } from "react-router-dom";
import { projectT, skillStackT } from "src/modules";
import { ROUTE_PROJ, ROUTE_PROJ_DETAIL_WITH_ID } from "src/routes/const";
import styled from "styled-components";

import youtubeLogo from 'src/assets/img/icon/youtube_logo.png';
import notionLogo from 'src/assets/img/icon/notion_logo.png';
import githubLogo from 'src/assets/img/icon/github_logo.png';
import { Tooltip } from "react-tooltip";

interface ProjectCardProps {
    data: projectT;
    isMain: boolean;
}
export const ProjectCard = (props: ProjectCardProps) => {
    const { data, isMain } = props;

    const navigate = useNavigate();

    const handleClickProj = (key: number) => {
        isMain ? navigate(`${ROUTE_PROJ}/${ROUTE_PROJ_DETAIL_WITH_ID(key)}`) : navigate(ROUTE_PROJ_DETAIL_WITH_ID(key));
    }

    const gitLinks = () => {
        if (!data?.gitUrl) {
            return <></>
        } else {
            if (data?.gitUrl.length > 1) {
                if (data?.gitUrl[0] === "NONE") {
                    return (
                        <div>
                            <a href={data.gitUrl[1]}
                                data-tooltip-id='githubBack'
                                data-tooltip-content="Backend GitHub">
                                <img src={githubLogo} alt="Backend GitHub" />
                            </a>
                            <Tooltip
                                id='githubBack'
                                place="top"
                                arrowColor='transparent' />
                        </div>
                    )
                } else {
                    return (
                        <>
                            <div>
                                <a href={data.gitUrl[0]}
                                    data-tooltip-id='githubClient'
                                    data-tooltip-content="Front GitHub"
                                >
                                    <img src={githubLogo} alt="Front GitHub" />
                                </a>
                                <Tooltip
                                    id='githubClient'
                                    place="top"
                                    arrowColor='transparent' />
                            </div>
                            <div>
                                <a href={data.gitUrl[1]}
                                    data-tooltip-id='githubBack'
                                    data-tooltip-content="Backend GitHub">
                                    <img src={githubLogo} alt="Backend GitHub" />
                                </a>
                                <Tooltip
                                    id='githubBack'
                                    place="top"
                                    arrowColor='transparent' />
                            </div>
                        </>
                    )
                }
            } else {
                return (
                    <div>
                        <a href={data.gitUrl[0]}
                            data-tooltip-id='github'
                            data-tooltip-content="GitHub">
                            <img src={githubLogo} alt="github" />
                        </a>
                        <Tooltip
                            id='github'
                            place="top"
                            arrowColor='transparent' />
                    </div>
                )
            }
        }
    }

    return (
        <>
            <StyledProjectContainer
                key={data.key}>
                <div style={{ display: "flex", justifyContent: "right" }}>
                    <StyledContentWrapper>
                        <StyledProjContents
                            onClick={() => handleClickProj(data.key)}>
                            <h1 >{data.projName}</h1>
                            <p>{data.startDate} - {data.endDate}</p>
                            <div>
                                {
                                    data.projTag?.map((data: string, index) => {
                                        return (
                                            <span key={index}>#{data} </span>
                                        )
                                    })
                                }
                            </div>
                            <p>{data.projContents}</p>
                        </StyledProjContents>
                        <StyledLinkContainer>
                            {
                                gitLinks()
                            }
                            {
                                data.notionUrl ?
                                    <div>
                                        <a href={data.notionUrl}
                                            data-tooltip-id='notion'
                                            data-tooltip-content="Notion">
                                            <img src={notionLogo}
                                                alt="notion" />
                                        </a>
                                        <Tooltip
                                            id='notion'
                                            place="top"
                                            arrowColor='transparent' />
                                    </div>
                                    : <></>
                            }
                            {
                                data.youtubeUrl ?
                                    <div>
                                        <a href={data.youtubeUrl}
                                            data-tooltip-id='youtube'
                                            data-tooltip-content="Video">
                                            <img src={youtubeLogo}
                                                alt="youtube" />
                                        </a>
                                        <Tooltip
                                            id='youtube'
                                            place="top"
                                            arrowColor='transparent' />
                                    </div> : <></>
                            }
                        </StyledLinkContainer>
                        <StyledSkillContainer>
                            {data?.projSkills?.map((skill: skillStackT) => (
                                <StyledSkillTag
                                    key={skill.name}
                                >
                                    {skill.name}
                                </StyledSkillTag>
                            ))}
                        </StyledSkillContainer>
                    </StyledContentWrapper>
                    <StyledCardImg
                        onClick={() => handleClickProj(data.key)}>
                        <img src={data.imgUrl} alt={data.projName} />
                    </StyledCardImg>
                </div>
            </StyledProjectContainer >
        </>
    )
}

const StyledProjectContainer = styled.div`
    text-align: right;
    border-bottom: 1px #e9e9e9 solid;
    width: 95%;
    padding: 1rem 0 2rem 0;
    margin: 0 5% 15px 5%;
    /* 기본 회색 처리 */
    color: #aaa; /* 텍스트 회색 */
    img {
        filter: grayscale(100%); /* 이미지 회색 */
        transition: filter 0.1s ease;
    }

    /* 마우스 오버 효과 */
    &:hover {
        color: #000; /* 텍스트 원래 색상 */
        img {
            filter: grayscale(0%); /* 이미지 원래 색상 */
        }
    }
`

const StyledLinkContainer = styled.div`
    display: flex;
    justify-content: end;
    margin-top: 10px;
    img{
        width : 35px;
    }
    a{
        margin-left: 8px;
    }
    @media (max-width: 768px) {
        img{
            width : 30px;
            margin-left: 2px;
        }
        a{
            margin-left: 5px;
        }
    }
`

const StyledContentWrapper = styled.div`
    width: 70%;
    text-align: right;
    cursor: pointer;
    
    @media (max-width: 768px) {
        width: 65%;
    }
`

const StyledProjContents = styled.div`
    cursor: pointer;
    margin-top: 10px;
    h1 {
        font-size: clamp(1.3rem, 5vw, 2rem); 
        line-height: 1.2;
    }

    p {
        font-size: clamp(1.1rem, 2.5vw, 1.5rem);
        line-height: 1.8;
    }

    span {
        font-size: clamp(0.8rem, 2vw, 1rem); 
    }

    div {
        margin-top: 5px;
    }
    @media (max-width: 768px) {
        h1{
            font-size: clamp(1.3rem, 3vw, 2rem);
        }
    }
`

const StyledCardImg = styled.div`
    width: 30%;
    margin-left: 2rem;
    height: auto;
    cursor: pointer;
    overflow: hidden;
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }
    
    @media (max-width: 768px) {
        margin-left: 0.5rem;
        width: 35%;
    }
`

const StyledSkillContainer = styled.div`
    margin-top: 1rem;
    font-size: 0.9rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: end;
`

const StyledSkillTag = styled.span`
    padding: 5px;
    border: 1px #e9e9e9 solid;
    border-radius: 10px;
    margin: 5px;
    font-size: clamp(0.75rem, 1.5vw, 0.9rem);
`