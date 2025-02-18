import { isMobileAtom, projDetailT, ProjType, skillStackT } from "src/modules"
import styled, { css } from "styled-components";
import youtubeLogo from 'src/assets/img/icon/youtube_logo.png';
import notionLogo from 'src/assets/img/icon/notion_logo.png';
import githubLogo from 'src/assets/img/icon/github_logo.png';
import { YoutubePlayer } from "../common";
import { useRecoilValue } from "recoil";

interface ProjectDetailsContainerProps {
    data?: projDetailT;
}
export const ProjectDetailsContainer = (props: ProjectDetailsContainerProps) => {
    const { data } = props;

    const isMobile = useRecoilValue<boolean>(isMobileAtom);

    const gitLinks = () => {
        if (!data?.gitUrl) {
            return <></>
        } else {
            if (data?.gitUrl.length > 1) {
                if (data?.gitUrl[0] === "NONE") {
                    return (
                        <div>
                            <LinkAlink href={data.gitUrl[1]}>
                                <img src={githubLogo} alt="Backend GitHub" />
                                <h3> Backend GitHub </h3>
                                {!isMobile ? <p>{data?.gitUrl[1]}</p> : <></>}
                            </LinkAlink>
                        </div>
                    )
                } else {
                    return (
                        <>
                            <LinkAlink href={data.gitUrl[0]}
                            >
                                <img src={githubLogo} alt="Front GitHub" />
                                <h3> Front GitHub </h3>
                                {!isMobile ? <p>{data?.gitUrl[0]}</p> : <></>}
                            </LinkAlink>
                            <LinkAlink href={data.gitUrl[1]}>
                                <img src={githubLogo} alt="Backend GitHub" />
                                <h3> Backend GitHub </h3>
                                {!isMobile ? <p>{data?.gitUrl[1]}</p> : <></>}
                            </LinkAlink>
                        </>
                    )
                }
            } else {
                return (
                    <>
                        <LinkAlink href={data.gitUrl[0]}>
                            <img src={githubLogo} alt="GitHub" />
                            <h3> GitHub </h3>
                            {!isMobile ? <p>{data?.gitUrl[0]}</p> : <></>}
                        </LinkAlink>
                    </>
                )
            }
        }
    }

    return (
        <div>
            <HeaderContainer>
                <div>
                    <StyledProjTag projType={data?.projType ?? ProjType.default}>
                        {data?.projType === ProjType.game ? "GAME" :
                            data?.projType === ProjType.web ? "WEB" : ""}
                    </StyledProjTag>
                    {isMobile && <br />}
                    <Title isMobile={isMobile}>
                        <h1>{data?.projName}</h1>
                        <p>{data?.startDate} - {data?.endDate}</p>
                    </Title>
                    <h2>
                        {data?.subTitle}
                    </h2>
                    <LinksContainer
                        isMobile={isMobile}>
                        {gitLinks()}
                        {(data?.notionUrl && !isMobile) ? (
                            <LinkAlink
                                href={data.notionUrl}>
                                <img src={notionLogo} alt="notion" />
                                <h3>Notion</h3>
                                <p>{data?.notionUrl}</p>
                            </LinkAlink>
                        ) : (data?.notionUrl && isMobile) ? (
                            <LinkAlink
                                href={data.notionUrl}>
                                <img src={notionLogo} alt="notion" />
                                <h3>Notion</h3>
                            </LinkAlink>
                        ) : <></>}
                        {(data?.youtubeUrl && !isMobile) ? (
                            <LinkAlink
                                href={data.youtubeUrl}>
                                <img src={youtubeLogo} alt="notion" />
                                <h3>YouTube</h3>
                                <p>{data?.youtubeUrl}</p>
                            </LinkAlink>
                        ) : (data?.youtubeUrl && isMobile) ? (<LinkAlink
                            href={data.youtubeUrl}>
                            <img src={youtubeLogo} alt="notion" />
                            <h3>YouTube</h3>
                        </LinkAlink>
                        ) : <></>}
                    </LinksContainer>
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
                                <img src={value} alt={`image-${index}`} key={index} />
                            </div>
                        ))}
                </ViewContents>
                <TextContents>
                    {
                        data?.projContents ?
                            data?.projContents.map((value: string, index) => {
                                return (
                                    <StyledSentence key={index}>{value}</StyledSentence>
                                )
                            }) : <></>
                    }
                </TextContents>
                <StyledSkillContainer>
                    {data?.projSkills?.map((skill: skillStackT, index) => (
                        <StyledSkillTag
                            key={index}
                        >
                            {skill.name}
                        </StyledSkillTag>
                    ))}
                </StyledSkillContainer>
            </ContentsContainer>
        </div>
    )
}

const ContentsContainer = styled.div`
    padding: 1rem 1rem 2rem 1rem;    
    margin: 0px 3rem 4rem 3rem;
    @media (max-width: 768px) {
        padding: 1rem;
        margin: 0 0.5rem 1rem 0.5rem;
    }
`

const StyledProjTag = styled.div.withConfig({
    shouldForwardProp: (prop) => !["projType"].includes(prop)
}) <{ projType: ProjType }>`
    display: inline-block;
    background-color:  ${({ projType }) => (projType === ProjType.game ? "#B7DFFF" : "#CDC1FF")};
    font-size: clamp(0.75rem, 3vw, 1.1rem); 
    font-weight: 600;
    padding: 5px 11px;
    border-radius: 15px;
    margin-bottom: 10px;
`

const ViewContents = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.2rem;
    justify-content: center;
    align-items: flex-start;
    padding: 0 3rem;

    > div {
        flex: 1 1 calc(50% - 1rem);
        max-width: calc(50% - 1rem);
        min-width: 300px;
        flex-direction: column;
        object-fit: cover;
        max-width: 40rem; 
        img {
            width: 100%;
            max-width: 40rem; 
            aspect-ratio: 16/9;
            object-fit: cover;
        }

        iframe {
            width: 100%;
            max-width: 40rem; 
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
`

const HeaderContainer = styled.div`
    padding: 2rem 6rem;
    h2{
        font-size: clamp(1.2rem, 3vw, 1.4rem); 
    }
    @media (max-width: 768px) {
        padding : 2rem;
    }
`

const Title = styled.div.withConfig({
    shouldForwardProp: (prop) => !["isMobile"].includes(prop)
}) <{ isMobile: boolean }>`
    ${props => !props.isMobile && css`
        display: flex;
        justify-content: left;
        `}
    ${props => props.isMobile && css`
        p{
            padding: 4px;
        }
    `}
    align-items: baseline;
    gap: 10px;
    h1{
        font-size: clamp(1.3rem, 5vw, 2.6rem); 
    }
    p{
        color: #394d8f;
        font-size: clamp(1rem, 5vw, 1.2rem); 
    }
`

const LinksContainer = styled.div.withConfig({
    shouldForwardProp: (prop) => !["isMobile"].includes(prop)
}) <{ isMobile: boolean }>`
    display: ${({ isMobile }) => isMobile ? 'flex' : 'block'}; 
    flex-direction: ${({ isMobile }) => isMobile ? 'row' : 'column'}; 
    gap: 10px;
`;

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
        font-size: clamp(0.8rem, 5vw, 1rem); 
    }
    img{
        vertical-align: middle;
        width: 30px;
    }
    @media (max-width: 768px) {
        img{
            width: 20px;
        }
        h3{
            font-size: 0.8rem;
        }
    }
`

const StyledSentence = styled.p`
    margin-left: 1rem;
    padding-bottom: 0.3rem;
    font-size: clamp(0.9rem, 1.5vw, 1.05rem);
`

const StyledSkillContainer = styled.div`
    margin-top: 1rem;
    font-size: 0.9rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
`

const StyledSkillTag = styled.span`
    padding: 5px;
    border: 1px #e9e9e9 solid;
    border-radius: 10px;
    margin: 5px;
    font-size: clamp(0.75rem, 1.5vw, 0.9rem);
`