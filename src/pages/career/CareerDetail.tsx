import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CareerContentTG, Footer } from "src/components";
import styled from "styled-components";

const CareerDetail = () => {
    const { id } = useParams();

    const [paramId, setParamId] = useState<string | undefined>();

    useEffect(() => {
        setParamId(id);
    }, [])

    return (
        <>
            <StyledCareerContainer>
                <div style={{ width: "80%" }}>
                    {
                        paramId === '0' ?
                            (<CareerContentTG />)
                            : (<></>)
                    }
                </div>
            </StyledCareerContainer>
            <Footer />
        </>
    )
}

export default CareerDetail;

const StyledCareerContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 4rem;
`