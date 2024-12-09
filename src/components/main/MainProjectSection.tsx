import { projectData, projectT, skillStackT } from "src/modules"
import styled from "styled-components"
import youtubeLogo from 'src/assets/img/icon/youtube_logo.png';
import notionLogo from 'src/assets/img/icon/notion_logo.png';
import githubLogo from 'src/assets/img/icon/github_logo.png';
import { useNavigate } from "react-router-dom";
import { ROUTE_PROJ, ROUTE_PROJ_DETAIL_WITH_ID } from "src/routes/const";

export const MainProjectSection = () => {
    const navigate = useNavigate();

    const handleClickProj = (key: number) => {
        navigate(ROUTE_PROJ_DETAIL_WITH_ID(key));
    }

    const handleClickProjectMain = () => {
        navigate(ROUTE_PROJ);
    }

    const projectList = () => {
        return projectData
            .filter((data) => data.mainYn)
            .map((data: projectT) => {
                return (
                    <StyledProjectContainer
                        key={data.key}
                    >
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
                                                    <span>#{data}</span>
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
                            <div
                                style={{ width: "25%", marginLeft: '2rem', cursor: 'pointer' }}
                                onClick={() => handleClickProj(data.key)}>
                                <img src={data.imgUrl} alt={data.projName} width="100%" />
                            </div>
                        </div>
                    </StyledProjectContainer>
                )
            });
    };

    return (
        <StyledSectionContainer
            key={0}>
            <StyledSectionHeader
                key={0}
                onClick={() => handleClickProjectMain()}>
                <h1><span>Projects</span></h1>
            </StyledSectionHeader>
            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <div style={{ width: "90%" }}>
                    {projectList()}
                    <p
                        onClick={() => handleClickProjectMain()}
                        style={{ textAlign: "right", marginRight: '8%', cursor: 'pointer' }}>
                        More Project →
                    </p>
                </div>
            </div>
        </StyledSectionContainer >
    )
}

const StyledSectionContainer = styled.section`
    width: 100%;
`

const StyledSectionHeader = styled.div`
    margin: 4rem 5rem;
    text-align: center;
    font-size: 1.2rem;
    font-weight: 800;
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

const StyledProjectContainer = styled.div`
    text-align: right;
    border-bottom: 1px #e9e9e9 solid;
    width: 90%;
    padding: 1rem;
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