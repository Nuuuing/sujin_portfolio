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
        .filter((data:projectT) => data.mainYn == true)
        .map((data: projectT) => {
            return (
                <ProjectCard
                    data={data}
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
                <div style={{ width: "90%" }}>
                    {projectList()}
                    <p
                        onClick={() => handleClickProjectMain()}
                        style={{ textAlign: "right", marginRight: '8%', cursor: 'pointer' }}>
                        More Project →
                    </p>
                </div>
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