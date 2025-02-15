import { CareerList } from "src/components";
import styled from "styled-components";

const Career = () => {
    return (
        <PageContainer>
            <Content>
                <CareerList />
            </Content>
        </PageContainer>
    )
}

export default Career;

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const Content = styled.div`
    flex: 1;
`;