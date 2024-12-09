import logo from 'src/assets/img/logo.png';
import githubLogo from 'src/assets/img/icon/github_logo.png';
import styled from 'styled-components';

export const MainSplash = () => {

    return (
        <>
            <StyledContents>
                <div style={{ width: "50%" }} />
                <div style={{ width: "50%" }}>
                    <div style={{ display: "flex", justifyContent: "right", marginRight: "2.5rem" }}>
                        <img src="https://avatars.githubusercontent.com/u/76237796?v=4" alt="profile" style={{ width: "8rem", display: "block" }} />
                    </div>
                    <div style={{width: '100%', display: 'flex', justifyContent: 'right'}}>
                    <img src={logo} alt="logo" style={{ width: "80%", display: "block"}} />
                    </div>
                    <p style={{ textAlign: "right", marginRight: "3rem" }}>
                        DEVELOPER PORTFOLIO
                    </p>
                    <div style={{ display: "flex", justifyContent: "right", marginRight: "3rem"}}>
                        <a href="https://github.com/Nuuuing" style={{ textDecoration: "none" }}>
                            <div style={{ display: "flex", justifyContent: "right", width: "100%" }}>
                                <img src={githubLogo} alt="github" width="25" style={{marginRight: 10}}/>
                                <p style={{ margin: "auto" }}>@Nuuuing</p>
                            </div>
                        </a>
                    </div>
                </div>
            </StyledContents>
        </>
    )
}

const StyledContents = styled.div`
    display: flex;
    justify-content: space-around;
    margin: 3rem;
`