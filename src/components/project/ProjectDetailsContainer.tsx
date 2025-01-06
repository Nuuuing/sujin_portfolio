import { projDetailT, skillStackT } from "src/modules"
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
                <div>
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
                                href={data.notionUrl}>
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
                </div>
            </HeaderContainer>
            <ContentsContainer>
                <ViewContents>
                    {data?.youtubeUrl && (
                        <div>
                            <YoutubePlayer videoId={data.youtubeId} />
                        </div>
                    )}

                    {data?.imgUrl &&
                        data.imgUrl.map((value: string, index: number) => (
                            <div key={index}>
                                <img src={value} alt={`image-${index}`} />
                            </div>
                        ))}
                </ViewContents>
                <TextContents>
                    {
                        data?.projContents ?
                            data?.projContents.map((value: string) => {
                                return (
                                    <StyledSentence>{value}</StyledSentence>
                                )
                            }) : <></>
                    }
                </TextContents>
                <TextContents>
                    <div style={{ marginLeft: "1.5rem" }}>
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
                </TextContents>
            </ContentsContainer>
        </StyledContainer>
    )
}

const StyledContainer = styled.div`
    margin: 0px 3rem 2rem 3rem;
    border-top: 1px #e9e9e9 solid;
    padding: 1rem 1rem 0rem 1rem;
`

const ContentsContainer = styled.div`
    padding: 1rem 1rem 2rem 1rem;    
    margin: 0px 3rem 4rem 3rem;
`

const ViewContents = styled.div`
    display: flex;
    flex-wrap: wrap; /* 줄 바꿈 가능 */
    gap: 0.2rem; /* 아이템 간 간격 */
    justify-content: center; /* 가운데 정렬 */
    align-items: flex-start;
    padding: 0 3rem;

    > div {
        flex: 1 1 calc(50% - 1rem); /* 기본적으로 50% 너비 */
        max-width: calc(50% - 1rem); /* 최대 50% 너비 */
        min-width: 300px; /* 최소 너비 */
        flex-direction: column; /* 세로로 배치 */
        max-width: 40rem; /* 최대 크기 */
        img {
            width: 100%;
            max-width: 40rem; /* 이미지 최대 크기 설정 */
        }

        iframe {
            width: 100%;
            max-width: 40rem; /* YouTube 플레이어 최대 크기 설정 */
        }
    }

    @media (max-width: 768px) {
        > div {
            flex: 1 1 100%;
            max-width: 100%;
        }
    }
`

const TextContents = styled.div`
    margin-top: 2rem;
    margin-left: 2rem;
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

const StyledSentence = styled.p`
    margin-left: 2rem;
    font-size: 1.15rem;
`