import { DetailLayout, ImageWithFallback } from "@/components";
import { prepImg, projectDetailData } from "@/data";
import { contentsT, projDetailT, skillStackT, stackType } from "@/types";
import dayjs from "dayjs";
import Image from 'next/image';

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

                        {data?.projDesc}

                        <div className="mb-[4rem]" />
                        {data?.projDescDetail &&
                            (<div className="flex justify-center mb-[4rem]">
                                <div>
                                    {
                                        data?.imgUrl &&
                                        (data?.imgUrl?.length > 0 ? data.imgUrl : [null]).map((url: string | null, index: number) => (
                                            <ImageWithFallback
                                                key={index}
                                                className="w-4xl h-auto rounded-3xl mb-[3rem]"
                                                src={url || `${prepImg}`}
                                                fallbackSrc={`${prepImg}`}
                                                alt={`${data?.projName || 'project'}_${index}`}
                                                width={1200} 
                                                height={800}
                                            />
                                        ))
                                    }
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

                        {data?.roles &&
                            (<div className="flex justify-center">
                                <div>
                                    <p
                                        className="text-xl font-bold text-[#ffffff] mr-[0.7rem]">
                                        담당 부분
                                    </p>
                                    {
                                        data.roles.map((data: contentsT, index) => {
                                            return (
                                                <ContentsContainer
                                                    key={'r-' + index}
                                                    data={data}
                                                />
                                            )
                                        })
                                    }
                                </div>
                            </div>)}
                        {data?.contents &&
                            data.contents.map((data: contentsT, index) => {
                                return (
                                    <div
                                        key={'cont-' + index}
                                        className="flex justify-center">
                                        <div>
                                            <ContentsContainer
                                                key={'c-' + index}
                                                data={data} />
                                        </div>
                                    </div>
                                )
                            })}
                    </>
                }
            </DetailLayout>
        </>
    )
}
interface ContentsProps {
    data: contentsT;
}

const ContentsContainer = (props: ContentsProps) => {
    const { data } = props;
    return (
        <div>
            {
                data?.imgUrl &&
                <Image
                    className="w-2xl h-auto rounded-3xl mb-[3rem]"
                    src={`${data.imgUrl}`}
                    alt={data.midTitle + 'Img'}                 
                    width={500}
                    height={500}
                />
            }
            <h2> {data.midTitle}</h2>
            <p>{data.contents}</p>
        </div>
    )
}