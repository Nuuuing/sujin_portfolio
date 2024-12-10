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
                <h1><span>Contact ME :)</span></h1>
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
                            href="https://github.com/sujin-nuu">
                            <p>https://github.com/sujin-nuu</p>
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

const StyledSectionContents = styled.div`
    display: flex;
    justify-content: center;
    padding-top: 1rem;
`

const StyledContactContents = styled.div`
    padding: 2rem 5rem;
    border: solid 1px #e9e9e9;
    border-radius: 10px;
    width: 40rem;
    p{
        font-size: 1.1rem;
        margin-bottom: 0.5rem;
    }
    img{
        margin-right: 0.5rem;
        height: 20px;
        width: 20px;
    }
`