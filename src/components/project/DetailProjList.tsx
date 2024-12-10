import { projectData, projectT } from "src/modules";
import { ProjHeader } from "./ProjHeader";
import { ProjectCard } from "./ProjectCard";
import styled from "styled-components";

export const DetailProjList = () => {

    const projectList = () => {
        return projectData.map((data: projectT) => {
            return (
                <ProjectCard
                    data={data}
                />
            )
        });
    };

    return (
        <StyledProjectContainer>
            <ProjHeader />
            {projectList()}
        </StyledProjectContainer>
    )
}

const StyledProjectContainer = styled.div`
    width: 100%;
    margin-bottom: 8rem;
`