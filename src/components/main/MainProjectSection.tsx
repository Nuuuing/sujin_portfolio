import styled from "styled-components"

export const MainProjectSection = () => {

    return (
        <StyledSectionContainer
            key={0}>
            <StyledSectionHeader
                key={0}>
                <h2>Project</h2>
            </StyledSectionHeader>
            <div>

            </div>
        </StyledSectionContainer >

    )
}

const StyledSectionContainer = styled.section`
    width: 100%;
`

const StyledSectionHeader = styled.div`
    margin: 2rem 5rem;
`