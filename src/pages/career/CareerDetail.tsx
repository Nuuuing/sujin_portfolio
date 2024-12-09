import { useEffect } from "react";
import { useParams } from "react-router-dom";

const CareerDetail = () => {
    const { id } = useParams();

    useEffect(() => {
        console.log(id);
    }, [])


    return (
        <>
            
        </>
    )
}

export default CareerDetail;