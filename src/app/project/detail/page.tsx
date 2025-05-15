'use client';


import { DetailLayout } from "@/components";
import { contentsT, projDetailT } from "@/modules/project";
import { useSearchParams } from "next/navigation";

interface ProjectDetailProps {
    data: projDetailT;
}
export default function ProjectDetail(props: ProjectDetailProps) {
    const { data } = props;


    const searchParams = useSearchParams();
    const key = searchParams.get('id');

    return (
        <>
            <DetailLayout
                title={'PROJECT'}
            >
                {
                    <>
                        <p>
                            {data.projTag}
                        </p>

                        {data?.projDescDetail &&
                            (<>
                                {
                                    data?.imgUrl &&
                                    data.imgUrl.map((url: string, index) => {
                                        return (
                                            <img src={url} alt={data.projName + index} />
                                        )
                                    })
                                }
                                <div>
                                    <h1>OVERVIEW</h1>
                                    <p>
                                        {data.projDescDetail}
                                    </p>
                                </div>
                            </>)}
                        {data?.roles &&
                            (<>
                                <h2>담당 부분</h2>
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
                            </>)}
                        {data?.contents &&
                            data.contents.map((data: contentsT, index) => {
                                return (
                                    <ContentsContainer
                                        key={'c-' + index}
                                        data={data} />
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
        <>
            {
                data?.imgUrl &&
                <img src={data.imgUrl} alt={data.midTitle+'Img'} />
            }
            <h2> {data.midTitle}</h2>
            <p>{data.contents}</p>
        </>
    )
}