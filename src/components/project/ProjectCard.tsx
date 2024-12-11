import { useNavigate } from "react-router-dom";
import { projectT, skillStackT } from "src/modules";
import { ROUTE_PROJ_DETAIL_WITH_ID } from "src/routes/const";
import styled from "styled-components";

import youtubeLogo from 'src/assets/img/icon/youtube_logo.png';
import notionLogo from 'src/assets/img/icon/notion_logo.png';
import githubLogo from 'src/assets/img/icon/github_logo.png';

interface ProjectCardProps {
    data: projectT;
}
export const ProjectCard = (props: ProjectCardProps) => {
    const { data } = props;
    
    const navigate = useNavigate();

    const handleClickProj = (key: number) => {
        navigate(ROUTE_PROJ_DETAIL_WITH_ID(key));
    }

    return (
        <>
            <StyledProjectContainer
                key={data.key}>
                <div style={{ display: "flex", justifyContent: "right" }}>
                    <div>
                        <StyledProjContents
                            onClick={() => handleClickProj(data.key)}>
                            <h1 >{data.projName}</h1>
                            <p>{data.startDate} - {data.endDate}</p>
                            <div>
                                {
                                    data.projTag?.map((data: string) => {
                                        return (
                                            <span>#{data} </span>
                                        )
                                    })
                                }
                            </div>
                            <p>{data.projContents}</p>
                        </StyledProjContents>
                        <div style={{ marginTop: "1rem" }}>
                            {
                                data.gitUrl ?
                                    <a href={data.gitUrl}>
                                        <img src={githubLogo} alt="github" width="30" />
                                    </a> : <></>
                            }
                            {
                                data.notionUrl ?
                                    <a href={data.notionUrl}>
                                        <img src={notionLogo}
                                            alt="notion" width="30" />
                                    </a> : <></>
                            }
                            {
                                data.youtubeUrl ?
                                    <a href={data.youtubeUrl}>
                                        <img src={youtubeLogo}
                                            alt="youtube" width="30" />
                                    </a> : <></>
                            }
                        </div>
                        <div style={{ marginTop: "1rem", fontSize: '0.9rem' }}>
                            {data?.projSkills?.map((skill: skillStackT) => (
                                <span
                                    key={skill.name}
                                    style={{
                                        padding: 5,
                                        border: "1px #e9e9e9 solid",
                                        borderRadius: 10,
                                        margin: 5,
                                    }}
                                >
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                    </div>
                    <StyledCardImg
                        style={{ }}
                        onClick={() => handleClickProj(data.key)}>
                        <img src={data.imgUrl} alt={data.projName} />
                    </StyledCardImg>
                </div>
            </StyledProjectContainer>
        </>
    )
}

const StyledProjectContainer = styled.div`
    text-align: right;
    border-bottom: 1px #e9e9e9 solid;
    width: 90%;
    padding: 1rem 0 2rem 0;
    margin-bottom: 15px;
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

const StyledProjContents = styled.div`
    cursor: pointer;
    margin-top: 10px;
      /* 반응형 텍스트 크기 */
    h1 {
        font-size: clamp(1.8rem, 5vw, 3rem); /* 최소 2rem, 최대 3rem, 화면 크기에 따라 조정 */
        line-height: 1.2;
    }

    p {
        font-size: clamp(0.8rem, 2.5vw, 1.5rem); /* 최소 1rem, 최대 1.5rem */
        line-height: 1.5;
    }

    span {
        font-size: clamp(0.6rem, 1.5vw, 1rem); /* 최소 0.8rem, 최대 1rem */
    }

    div {
        margin-top: 5px;
    }
`

const StyledCardImg = styled.div`
    width: 28%;
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
`