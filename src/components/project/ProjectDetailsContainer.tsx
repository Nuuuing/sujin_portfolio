import { projDetailT } from "src/modules"
import styled from "styled-components";
import youtubeLogo from 'src/assets/img/icon/youtube_logo.png';
import notionLogo from 'src/assets/img/icon/notion_logo.png';
import githubLogo from 'src/assets/img/icon/github_logo.png';
import { YoutubePlayer } from "../common";

interface ProjectDetailsContainerProps {
    data?: projDetailT;
}
export const ProjectDetailsContainer = (props: ProjectDetailsContainerProps) => {
    const { data } = props;

    return (
        <StyledContainer>
            <HeaderContainer>
                <Title>
                    <h1>{data?.projName}</h1>
                    <p>{data?.projType},</p>
                    <p>{data?.startDate} - {data?.endDate}</p>
                </Title>
                <h2>
                    {data?.subTitle}
                </h2>
                <div>
                    {data?.gitUrl ? (
                        <LinkAlink
                            href={data.gitUrl}>
                            <img src={githubLogo} alt="github" />
                            <h3> GitHub </h3>
                            <p>{data?.gitUrl}</p>
                        </LinkAlink>
                    ) : <></>}
                    {data?.notionUrl ? (
                        <LinkAlink
                            href={data.gitUrl}>
                            <img src={notionLogo} alt="notion" />
                            <h3>Notion</h3>
                            <p>{data?.notionUrl}</p>
                        </LinkAlink>
                    ) : <></>}
                    {data?.youtubeUrl ? (
                        <LinkAlink
                            href={data.youtubeUrl}>
                            <img src={youtubeLogo} alt="notion" />
                            <h3>YouTube</h3>
                            <p>{data?.youtubeUrl}</p>
                        </LinkAlink>
                    ) : <></>}
                </div>
            </HeaderContainer>
            <ContentsContainer>
                {
                    data?.youtubeUrl ?
                        (
                            <div style={{width: "50%"}}>
                                <YoutubePlayer videoId={data?.youtubeId} />
                            </div>
                        )
                        : <></>
                }
            </ContentsContainer>
        </StyledContainer>
    )
}

const StyledContainer = styled.div`
    margin: 0px 3rem 4rem 3rem;
    border-top: 1px #e9e9e9 solid;
    padding: 1rem 1rem 2rem 1rem;
`

const ContentsContainer = styled.div`
    padding: 1rem 1rem 2rem 1rem;    
    margin: 0px 3rem 4rem 3rem;
`

const HeaderContainer = styled.div`
    padding: 2rem 6rem;
`

const Title = styled.div`
    display: flex;
    justify-content: left;
    align-items: baseline;
    gap: 10px;
    h1{
        font-size: 3rem;
    }
    p{
        color: #394d8f;
        font-size: 1.2rem;
    }
`

const LinkAlink = styled.a`
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    gap: 10px;
    margin-top: 0.8rem;
    p{
        padding-top: 6px;
        font-size: 12px;
        color: #9c9c9c;
    }
    h3{
        padding-top: 6px;
    }
    img{
        vertical-align: middle; 
        height: 30px;
        width: auto;
    }
`