import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CareerContentTG } from "src/components";
import { MiddleHeader } from "src/layouts";
import styled from "styled-components";

const CareerDetail = () => {
    const { id } = useParams();

    const [paramId, setParamId] = useState<string | undefined>();

    useEffect(() => {
        setParamId(id);
    }, [id])

    return (
        <>
            <MiddleHeader
                title={'Career'} />
            <StyledCareerContainer>
                <div style={{ width: "95%" }}>
                    {
                        paramId === '0' ?
                            (<CareerContentTG />)
                            : (<></>)
                    }
                </div>
            </StyledCareerContainer>
        </>
    )
}

export default CareerDetail;

const StyledCareerContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 4rem;
    @media (max-width: 768px) {
        margin-bottom: 2rem;
    }
`