import logo from 'src/assets/img/logo.png';

export const MainSplash = () => {

    return (
        <>
            <StyledContents>
                <div style={{ width: "50%" }} />
                <div style={{ width: "50%" }}>
                    <div style={{ display: "flex", justifyContent: "right", marginRight: "2.5rem" }}>
                        <img src="https://avatars.githubusercontent.com/u/76237796?v=4" alt="profile" style={{ width: "8rem", display: "block" }} />
                    </div>
                    <img src={logo} alt="logo" style={{ width: "100%", display: "block" }} />
                    <p style={{ textAlign: "right", marginRight: "3rem" }}>
                        DEVELOPER PORTFOLIO
                    </p>
                    <div style={{ display: "flex", justifyContent: "right", marginRight: "3rem"}}>
                        <a href="https://github.com/Nuuuing" style={{ textDecoration: "none" }}>
                            <div style={{ display: "flex", justifyContent: "right", width: "100%" }}>
                                <img src="https://w7.pngwing.com/pngs/646/324/png-transparent-github-computer-icons-github-logo-monochrome-head-thumbnail.png" alt="github" width="30" />
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