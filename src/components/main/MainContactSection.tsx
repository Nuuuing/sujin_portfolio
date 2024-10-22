import styled from "styled-components"

export const MainContactSection = () => {

    return (
        <StyledSectionContainer
            key={3}
        >
            <StyledSectionHeader
                key={3}>
                <h2>Contact ME :)</h2>
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
    margin: 2rem 5rem;
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