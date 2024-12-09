import styled from "styled-components"

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
                    <h2 className="flex-right">김수진</h2>
                    <br />
                    <div className="flex-right">
                        <img
                            src={"https://cdn-icons-png.flaticon.com/512/3095/3095610.png"}
                            alt="phone"
                            style={{ width: 20, marginRight: 10 }}
                        />
                        <p>010-4248-2704</p>
                    </div>
                    <div className="flex-right">
                        <img
                            src={"https://cdn-icons-png.flaticon.com/512/542/542638.png"}
                            alt="email"
                            style={{ width: 17, marginRight: 10 }}
                        />
                        <p>su_042@daum.net</p>
                    </div>
                    <div className="flex-right">
                        <img
                            src={"https://cdn-icons-png.flaticon.com/512/2111/2111425.png"}
                            alt="github"
                            style={{ width: 17, marginRight: 10 }}
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
`

const StyledSectionHeader = styled.div`
    margin: 4rem auto;
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

const StyledSectionContents = styled.div`
    display: flex;
    justify-content: center;
`

const StyledContactContents = styled.div`
    padding: 2rem;
    border: solid 1px #e9e9e9;
    border-radius: 10px;
    /* display: flex;
    justify-content: space-between; */
    width: 30rem;

`