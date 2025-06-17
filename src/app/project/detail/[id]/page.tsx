import { ContentsContainer, DetailLayout, ImageWithFallback } from "@/components";
import { prepImg, projectDetailData } from "@/data";
import { contentsT, projDetailT, skillStackT, stackType } from "@/types";
import dayjs from "dayjs";

const gitIcon = `${process.env.BASE_PATH}/icon/github_logo.png`;
const notionIcon = `${process.env.BASE_PATH}/icon/notion_logo.png`;

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
                                    className="inline-block bg-black text-white border-2 border-[#d4d4d4] rounded-4xl px-3 py-1 font-extrabold text-lg"
                                >
                                    {label}
                                </p>
                            ))}
                        </div>
                        <div className="flex justify-between items-end mx-1 mt-[1.5rem] mb-[1.5rem]">
                            <p className='text-4xl font-bold text-[#e9e9e9]'>
                                {data?.projName}
                            </p>
                            <p className="text-3xl">
                                {dayjs(data?.startDate).format('YYYY.MM')} - {data?.endDate ? dayjs(data?.endDate).format('YYYY.MM') : 'ING'}
                            </p>
                        </div>
                        {
                            (data?.gitUrl || data?.notionUrl) && (
                                <div className="flex gap-4 items-center">
                                    {data?.gitUrl && data.gitUrl.map((url: string, index: number) => (
                                        <a
                                            key={'git' + index}
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2"
                                        >
                                            <ImageWithFallback
                                                src={gitIcon}
                                                className="w-auto h-[2rem] invert"
                                                alt={'GITHUB ICON'}
                                                width={20}
                                                height={20}
                                            />
                                        </a>
                                    ))}
                                    {data?.notionUrl && (
                                        <a
                                            href={data.notionUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2"
                                        >
                                            <ImageWithFallback
                                                src={notionIcon}
                                                className="w-auto h-[2rem] invert"
                                                alt={'NOTION ICON'}
                                                width={20}
                                                height={20}
                                            />
                                        </a>
                                    )}
                                </div>
                            )
                        }

                        <div className="text-xl mt-[1.5rem]">
                            {data?.projDesc}
                        </div>

                        <div className="mb-[4rem]" />
                        {data?.projDescDetail &&
                            (<div className="flex justify-center mb-[4rem]">
                                <div>
                                    {data?.imgUrl && (
                                        <div className="grid grid-cols-2 gap-4 mb-[3rem]">
                                            {(data.imgUrl.length > 0 ? data.imgUrl : [null]).map((url: string | null, index: number) => (
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
                                    )}
                                    <div className="items-end mx-[5rem]">
                                        <p className="text-xl font-bold text-[#72AAFF] mr-[0.7rem]">
                                            OVERVIEW
                                        </p>
                                        <p>
                                            {data.projDescDetail}
                                        </p>
                                    </div>
                                </div>
                            </div>)}

                        <div className="flex flex-col items-center">
                            {data?.roles && (
                                <div className="w-full max-w-[1200px] mx-[3rem]">
                                    <p className="text-2xl font-bold text-[#FFFFFF] mb-4"> [ 담당 부분 ] </p>
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
            </DetailLayout>
        </>
    )
}