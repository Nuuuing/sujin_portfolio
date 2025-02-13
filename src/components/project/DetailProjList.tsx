import { projectData, projectT } from "src/modules";
import { ProjectCard } from "./ProjectCard";
import styled from "styled-components";
import { MiddleHeader } from "src/layouts";

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
            <MiddleHeader
                title={'Project'} />
            {projectList()}
        </StyledProjectContainer>
    )
}

const StyledProjectContainer = styled.div`
    width: 100%;
    margin-bottom: 8rem;
`