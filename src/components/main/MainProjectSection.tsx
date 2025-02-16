import { projectData, projectT } from "src/modules"
import styled from "styled-components"
import { useNavigate } from "react-router-dom";
import { ROUTE_PROJ } from "src/routes/const";
import { ProjectCard } from "../project";

export const MainProjectSection = () => {
    const navigate = useNavigate();

    const handleClickProjectMain = () => {
        navigate(ROUTE_PROJ);
    }

    const projectList = () => {
        return projectData
        .filter((data:projectT) => data.mainYn === true)
        .map((data: projectT, index) => {
            return (
                <ProjectCard
                    data={data}
                    key={index}
                    isMain={true}
                />
            )
        });
    };

    return (
        <StyledSectionContainer
            key={0}>
            <StyledSectionHeader
                key={0}
                onClick={() => handleClickProjectMain()}>
                <h1><span>Projects</span></h1>
            </StyledSectionHeader>
            <div style={{ width: "100%", display: "flex", justifyContent: "center", paddingTop:'5rem' }}>
                <ContentContainer>
                    {projectList()}
                    <p
                        onClick={() => handleClickProjectMain()}
                        style={{ textAlign: "right", cursor: 'pointer' }}>
                        More Project →
                    </p>
                </ContentContainer>
            </div>
        </StyledSectionContainer >
    )
}

const StyledSectionContainer = styled.section`
    width: 100%;
    padding: 4rem 0;
`

const StyledSectionHeader = styled.div`
    margin: 4rem 5rem;
    cursor: pointer;
    text-align: center;
    font-size: 1.2rem;
    font-weight: 800;
    h1 {
    margin: 0;
    font-size: 2.5rem;
    position: relative;
    }

    h1 span {
        position: relative;
        font-weight: 400;
        color: #333;
        z-index: 1; 
    }

    h1 span:before {
        content: '';
        display: block;
        position: absolute;
        top: calc(50% + 2px);
        left: -10px;
        width: calc(100% + 20px);
        height: 30%;
        transform: translateY(-50%);
        z-index: -1;
        background-color: rgba(176, 220, 255, 0.904);
        border-radius: 4px;
    }

    @media (max-width: 768px) {
        font-size: 0.8rem;
        margin: 2rem auto;

        h1 span:before {
            height: 40%;
        }
        h1 {
            font-size: 1.5rem;
        }
    }
`

const ContentContainer = styled.div`
    width: 90%;
    @media (max-width: 768px) {
        width: 95%;
    }
`