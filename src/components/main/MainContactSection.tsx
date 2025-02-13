import styled from "styled-components"
import gitIcon from 'src/assets/img/icon/github_logo.png';
import telIcon from 'src/assets/img/icon/teleIcon.png';

export const MainContactSection = () => {

    return (
        <StyledSectionContainer
            key={3}
        >
            <StyledSectionHeader
                key={3}>
                <h2><span>Contact ME :)</span></h2>
            </StyledSectionHeader>
            <StyledSectionContents>
                <StyledContactContents>
                    <h1 className="flex-left">김수진 KIM SUJIN</h1>
                    <br /><br />
                    <div className="flex-left">
                        <img
                            src={telIcon}
                            alt="phone"
                        />
                        <p>010-4248-2704</p>
                    </div>
                    <div className="flex-left">
                        <img
                            src={"https://cdn-icons-png.flaticon.com/512/542/542638.png"}
                            alt="email"
                        />
                        <p>su_042@daum.net</p>
                    </div>
                    <div className="flex-left">
                        <img
                            src={gitIcon}
                            alt="github"
                        />
                        <a
                            style={{ textDecoration: "none" }}
                            href="https://github.com/Nuuuing">
                            <p>https://github.com/Nuuuing</p>
                        </a>
                    </div>
                </StyledContactContents>
            </StyledSectionContents>
        </StyledSectionContainer>
    )
}

const StyledSectionContainer = styled.section`
    width: 100%;
    padding-bottom: 1rem;
    padding: 4rem 0;
`

const StyledSectionHeader = styled.div`
    margin: 4rem auto;
    text-align: center;
    font-size: 1.2rem;
    font-weight: 800;

    h1 {
        margin: 0;
        font-size: 2.5rem;
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
        height: 30%;
        transform: translateY(-50%);
        z-index: -1;
        background-color: rgba(176, 220, 255, 0.904);
        border-radius: 4px;
    }

    @media (max-width: 768px) {
        font-size: 1rem;
        margin: 2rem auto;

        h1 span:before {
            height: 40%;
        }
    }
`

const StyledSectionContents = styled.div`
    display: flex;
    justify-content: center;
    padding-top: 1rem;
`

const StyledContactContents = styled.div`
    background-color: #ffffff;
    padding: 2rem 5rem;
    border: solid 1px #e9e9e9;
    border-radius: 5px;
    width: 40rem;
    p{
        font-size: 1rem;
        margin-bottom: 0.5rem;
    }
    img{
        margin-right: 0.5rem;
        height: 20px;
        width: 20px;
    }
`