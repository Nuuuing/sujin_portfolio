import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DetailHeader, Footer, ProjectDetailsContainer } from "src/components";
import { projDetailData, projDetailT } from "src/modules";

const ProjectDetail = () => {
    const { id } = useParams();
    const [projData, setProjData] = useState<projDetailT|undefined>(undefined);

    useEffect(() => {
        if (id) {
            const numericId = parseInt(id, 10);
            setProjData(projDetailData.find((data:projDetailT) => data.key === numericId));
        }
    }, [id])

    return (
        <>
            <DetailHeader />
            <ProjectDetailsContainer
                data={projData}
            />
            <Footer />
        </>
    )
}

export default ProjectDetail;