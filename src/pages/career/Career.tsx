import { CareerList, Footer } from "src/components";
import styled from "styled-components";

const Career = () => {
    return (
        <PageContainer>
            <Content>
                <CareerList />
            </Content>
            <Footer />
        </PageContainer>
    )
}

export default Career;

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh; /* 화면 전체 높이 */
`;

const Content = styled.div`
  flex: 1;
`;