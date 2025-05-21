'use client';


import { DetailLayout } from "@/components";
import { stackType } from "@/modules/common";
import { contentsT, projDetailT, projectDetailData } from "@/modules/project";
import { useSearchParams } from "next/navigation";


export default function ProjectDetail() {

    const searchParams = useSearchParams();
    const keyParam = searchParams.get('id');
    const key = keyParam ? Number(keyParam) : null;

    const data = projectDetailData.find(
        (data: projDetailT) => data.key === key
    );

    return (
        <>
            <DetailLayout
                title={'PROJECT'}
            >
                {
                    <>
                        <p>
                            {
                                data?.projSkills?.map((d, i) => {
                                    if (d.type === stackType.WEB) {
                                        return (
                                            <span key={i}>WEB</span>
                                        );
                                    } else if (d.type === stackType.UNITY) {
                                        return (
                                            <span key={i}>UNITY</span>
                                        );
                                    } else {
                                        return null;
                                    }
                                })
                            }
                        </p>

                        {data?.projDescDetail &&
                            (<div className="flex justify-center">
                                <div>
                                    {
                                        data?.imgUrl &&
                                        data.imgUrl.map((url: string, index) => {
                                            return (
                                                <img className="w-lg h-auto" src={url} alt={data.projName + index} />
                                            )
                                        })
                                    }
                                    <div className="flex justify-center">
                                        <h1>OVERVIEW</h1>
                                        <p>
                                            {data.projDescDetail}
                                        </p>
                                    </div>
                                </div>
                            </div>)}
                        {data?.roles &&
                            (<div className="flex justify-center">
                                <div>
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
                                </div>
                            </div>)}
                        {data?.contents &&
                            data.contents.map((data: contentsT, index) => {
                                return (
                                    <div className="flex justify-center">
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
                <img src={data.imgUrl} alt={data.midTitle + 'Img'} />
            }
            <h2> {data.midTitle}</h2>
            <p>{data.contents}</p>
        </div>
    )
}