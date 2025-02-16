import styled from "styled-components"
import githubLogo from 'src/assets/img/icon/github_logo.png';
import close from 'src/assets/img/icon/close_x.svg';
import skills from 'src/assets/img/icon/skills.svg';

interface MobileInfoContainerProps {
    handleClose: () => void;
}
export const MobileInfoContainer = (props: MobileInfoContainerProps) => {
    const { handleClose } = props;
    return (
        <div style={{width:'100%', height:'100%'}}>
            <StyledCloseArea
                onClick={() => handleClose()}>
                <img src={close} alt="close" style={{width:'100%'}}/>
            </StyledCloseArea>
            <StyledInfoDetail>
                <div style={{ textAlign: 'center' }}>
                    <img src="https://avatars.githubusercontent.com/u/76237796?v=4" alt="profile" style={{ width: "8rem", display: "block", margin: 'auto' }} />
                    <h2>KIM SUJIN</h2>
                    <h3 style={{ marginTop: 5 }}>김 수 진</h3>
                    <h3 style={{ marginTop: 5 }}>1997.04.18</h3>
                    <br />
                    <div className="flex-center">
                        <a href="https://github.com/Nuuuing" style={{ textDecoration: "none",  display: 'flex', alignItems: 'center' }}>
                                <img src={githubLogo} alt="github" width="25" />
                                <p style={{ padding: "5px 0px 0px 5px", fontSize: '0.92rem' }}>
                                    @Nuuuing</p>
                        </a>
                    </div>
                    <div className="flex-center">
                        <img
                            src={"https://cdn-icons-png.flaticon.com/512/542/542638.png"}
                            alt="email"
                            width={23}
                        />
                        <p style={{ padding: "5px 0px 0px 5px", fontSize: '0.92rem' }}>
                            su_042@daum.net</p>
                    </div>
                    <StyledIntro>
                        <p>안녕하세요! 김수진입니다.</p>
                        <p>저에 대해 더 알고 싶으시다면</p>
                        <p>포트폴리오를 확인하시거나, 편하게 연락주세요.</p>
                        <p>감사합니다 :)</p>
                    </StyledIntro>
                    <div style={{ marginTop: 20 }}>
                        <h3>Skills</h3>
                        <img src={skills} alt="react" style={{ marginTop: 10 }} />
                    </div>
                </div>
            </StyledInfoDetail>
        </div>
    )
}

const StyledInfoDetail = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;    
    font-size: 1rem;
    overflow-y: scroll;
    overflow-x: hidden;
`

const StyledCloseArea = styled.div`
    position: sticky;
    top: 0;
    width: 40px;
    height: 40px;
    margin-left: 15px;
    margin-top: 15px;
    cursor: pointer;
`

const StyledIntro = styled.div`
    margin-top: 20px;
    color: #535353;
    font-size: 0.98rem;
    white-space: pre-wrap;
    p{
        margin-top: 5px;
    }
`
