import { ContentsContainer, DetailLayout, GitTooltip, ImageWithFallback, NotionTooltip } from "@/components";
import { prepImg, projectDetailData } from "@/data";
import { contentsT, projDetailT, skillStackT, stackType } from "@/types";
import { parseContent } from "@/utils";
import dayjs from "dayjs";


type Params = Promise<{ id: string }>

export async function generateStaticParams() {
    return projectDetailData.map(project => ({
        id: project.key.toString(),
    }));
}

export default async function ProjectDetail(props: { params: Params }) {
    const { id } = await props.params;

    const data = projectDetailData.find(
        (data: projDetailT) => data.key === (Number(id))
    );

    const getProjSkillLabels = (projSkills?: skillStackT[]) => {
        if (!projSkills) return [];

        const types = new Set(projSkills.map((d) => d.type));

        const labels: string[] = [];
        if (types.has(stackType.WEB)) labels.push('WEB');
        if (types.has(stackType.UNITY)) labels.push('UNITY');

        return labels;
    };

    return (
        <>
            <DetailLayout
                title={'PROJECT'}
            >
                {
                    <>
                        <div className="flex gap-2">
                            {getProjSkillLabels(data?.projSkills).map((label, idx) => (
                                <p
                                    key={idx}
                                    className="inline-block bg-black text-white border-2 dark:border-[#d4d4d4] rounded-4xl px-3 py-1 font-extrabold text-lg"
                                >
                                    {label}
                                </p>
                            ))}
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2 mx-1 mt-[1.5rem] mb-[1.5rem]">
                            <p className="text-4xl font-bold dark:text-[#e9e9e9] text-gray-700">
                                {data?.projName}
                            </p>
                            <p className="text-3xl dark:text-gray-300 text-gray-700">
                                {dayjs(data?.startDate).format('YYYY.MM')} - {data?.endDate ? dayjs(data?.endDate).format('YYYY.MM') : 'ING'}
                            </p>
                        </div>
                        {
                            (data?.gitUrl || data?.notionUrl) && (
                                <div className="flex gap-4 items-center">
                                    {data?.gitUrl && (
                                        <GitTooltip url={data.gitUrl} />
                                    )}
                                    {data?.notionUrl && (
                                        <NotionTooltip url={data.notionUrl} />
                                    )}
                                </div>
                            )
                        }

                        <div className="text-xl mt-[1.5rem] mb-[2rem]">
                            {data?.projDesc}
                        </div>
                        {data?.projDescDetail && (
                            <div className="flex justify-center mb-[4rem]">
                                <div className="w-full px-2 sm:px-0">
                                    {data?.imgUrl && (
                                        data.imgUrl.length === 1 ? (
                                            <div className="mb-[3rem] flex justify-center">
                                                <div className="w-full max-w-[100%] sm:max-w-[900px]">
                                                    <ImageWithFallback
                                                        className="w-full h-auto rounded-3xl"
                                                        src={data.imgUrl[0] || `${prepImg}`}
                                                        fallbackSrc={`${prepImg}`}
                                                        alt={`${data?.projName || 'project'}_0`}
                                                        width={1000}
                                                        height={500}
                                                    />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-[3rem]">
                                                {data.imgUrl.map((url: string, index: number) => (
                                                    <ImageWithFallback
                                                        key={index}
                                                        className="w-full h-auto rounded-3xl"
                                                        src={url || `${prepImg}`}
                                                        fallbackSrc={`${prepImg}`}
                                                        alt={`${data?.projName || 'project'}_${index}`}
                                                        width={600}
                                                        height={400}
                                                    />
                                                ))}
                                            </div>
                                        )
                                    )}
                                    <div className="px-0 sm:px-2">
                                        <p className="text-xl font-bold text-[#72AAFF] mb-2">OVERVIEW</p>
                                        {data.projDescDetail.split('\n').map((paragraph, idx) => (
                                            <p key={idx} className="leading-relaxed">
                                                {parseContent(paragraph)}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="flex flex-col items-center">
                            {data?.roles && (
                                <div className="w-full max-w-[1200px] mx-[3rem]">
                                    <p className="text-2xl font-bold text-[#FFFFFF] mb-4 sm:mb-2"> [ 담당 부분 ] </p>
                                    {data.roles.map((role: contentsT, index: number) => (
                                        <ContentsContainer key={`role-${index}`} data={role} />
                                    ))}
                                </div>
                            )}

                            {data?.contents && (
                                <div className="w-full max-w-[1200px] mt-[3rem] mx-[5rem]">
                                    {data.contents.map((content: contentsT, index: number) => (
                                        <div key={`content-${index}`} className="mb-4">
                                            <ContentsContainer key={`c-${index}`} data={content} />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                }
            </DetailLayout >
        </>
    )
}