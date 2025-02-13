import styled from "styled-components"
import fold from 'src/assets/img/icon/fold.svg';
import open from 'src/assets/img/icon/open.svg';
import githubLogo from 'src/assets/img/icon/github_logo.png';
import skills from 'src/assets/img/icon/skills.svg';

interface InfoContainerProps {
    expanded: boolean;
    toggleClick: () => void;
}
export const InfoContainer = (props: InfoContainerProps) => {
    const { expanded, toggleClick } = props;
    return (
        <StyledInfoContainer
            expanded={expanded}>
            <StyledInfoDetail
                expanded={expanded}>
                <StyledButtonArea>
                    <img
                        src={fold}
                        alt={"fold"}
                        onClick={toggleClick}
                    />
                </StyledButtonArea>
                <div style={{ textAlign: 'center' }}>
                    <img src="https://avatars.githubusercontent.com/u/76237796?v=4" alt="profile" style={{ width: "8rem", display: "block", margin: 'auto' }} />
                    <h2>KIM SUJIN</h2>
                    <h3 style={{ marginTop: 5 }}>김 수 진</h3>
                    <h3 style={{ marginTop: 5 }}>1997.04.18</h3>
                    <br />
                    <a href="https://github.com/Nuuuing" style={{ textDecoration: "none" }}>
                        <div className="flex-center">
                            <img src={githubLogo} alt="github" width="25" />
                            <p style={{ padding: "5px 0px 0px 5px", fontSize: '0.92rem' }}>
                                @Nuuuing</p>
                        </div>
                    </a>
                    <div className="flex-center">
                        <img
                            src={"https://cdn-icons-png.flaticon.com/512/542/542638.png"}
                            alt="email"
                            width={23}
                        />
                        <p style={{ padding: "5px 0px 0px 5px", fontSize: '0.92rem' }}>
                            su_042@daum.net</p>
                    </div>
                    <div style={{ marginTop: 20, color: '#535353', fontSize: '0.98rem', whiteSpace: 'pre-wrap' }}>
                        <p>안녕하세요! 김수진입니다.</p>
                        <p>저에 대해 더 알고 싶으시다면<br />포트폴리오를 확인하시거나,<br />편하게 연락 주세요.</p>
                        <p>감사합니다 :)</p>
                    </div>
                    <div style={{ marginTop: 20 }}>
                        <h3>Skills</h3>
                        <img src={skills} alt="react" style={{ marginTop: 10 }} />
                    </div>
                </div>
            </StyledInfoDetail>
            {
                !expanded &&
                (
                    <StyledCloseContainer>
                        <img
                            style={{ cursor: 'pointer', padding: 20 }}
                            src={open}
                            alt={"open"}
                            onClick={toggleClick}
                        />
                        <div style={{ flex: 'auto', position: 'relative' }}>
                            <div />
                            <StyledCloseArea>
                                <p>DEVELOPER KIM SU JIN</p>
                            </StyledCloseArea>
                        </div>
                    </StyledCloseContainer>
                )
            }
        </StyledInfoContainer>
    )
}

const StyledInfoContainer = styled.div<{ expanded: boolean }>`
    box-shadow: 10px 10px 20px #231f2014;
    width: ${({ expanded }) => (expanded ? "18rem" : "6rem")};
    background-color: #ffffff;
    border-radius: 40px;
    margin: 2.5rem 2.5rem 2.5rem 0;
    border: solid 1px #dddddd;
    padding: 1rem 2.2rem;
    overflow: hidden;
    position: relative;
    transition: width 0.1s ease-in-out;

    @media (max-width: 768px) {
        display: ${({ expanded }) => (expanded ? "flex" : "none")};
        width: 100vw;
        height: 100vh;
        margin: 0;
        padding: 2rem;
        border-radius: 0;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
`

const StyledButtonArea = styled.div`
    cursor: pointer;
`

const StyledInfoDetail = styled.div<{ expanded: boolean }>`
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    opacity: ${({ expanded }) => (expanded ? 1 : 0)};
    transform: ${({ expanded }) => (expanded ? "translateY(0)" : "translateY(-10px)")};
    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
    visibility: ${({ expanded }) => (expanded ? "visible" : "hidden")};
`

const StyledCloseContainer = styled.div`
    left:6px;
    position: absolute;
    width: 80px;
    height: 100%;
    top: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: left .25s;
`

const StyledCloseArea = styled.div`
    bottom: 15px;
    right: 0;
    transform: rotate(90deg);
    transform-origin: right center;
    column-gap: 15px;
    display: flex;
    position: absolute;
    align-items: right;
    box-sizing: border-box;
    text-align: right;
    width: 12rem;
`
