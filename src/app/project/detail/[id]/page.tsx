import { projDetailT } from "@/features";
import { getProjectDetails } from "@/utils";
import { ProjectDetailClient } from "./ProjectDetailClient";

type Params = Promise<{ id: string }>

// SSG용 정적 파라미터 생성
export async function generateStaticParams() {
    try {
        const projectDetailData = await getProjectDetails();
        return projectDetailData.map(project => ({
            id: project.key.toString(),
        }));
    } catch (error) {
        console.error('Error generating static params:', error);
        return [{ id: '1' }];
    }
}

export default async function ProjectDetail(props: { params: Params }) {
    const { id } = await props.params;

    let initialData: projDetailT | null = null;
    try {
        const projectDetailData = await getProjectDetails();
        initialData = projectDetailData.find(
            (data: projDetailT) => data.key === Number(id)
        ) || null;
    } catch (error) {
        console.error('Error fetching initial project data:', error);
    }

    return <ProjectDetailClient id={id} initialData={initialData} />;
}
