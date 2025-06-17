import { careerSubDataTG } from "@/data";
import { careerSubT, skillStackT } from "@/types";

export const CareerTg = () => {

    return (
        <>
            <div className="mb-[4rem]">
                <div className="mb-[1rem]">
                    <h2 className="text-3xl font-bold">(주)티지</h2>
                    <div className="ml-[0.5rem] mt-[0.5rem]">
                        <p>공공 IT(데이터, ISP) 컨설팅</p>
                        <p>플랫폼팀&nbsp; • &nbsp;주임</p>
                    </div>
                </div>
                <div>
                    <p className="bg-gray-600 text-sm px-3 py-1 rounded-full inline-block mr-[1rem] font-bold">2022.04 - 2024.02(2Y)</p>
                    <p className="bg-gray-600 text-sm px-3 py-1 rounded-full inline-block mr-[1rem] font-bold">WEB FULLSTACK</p>
                    <p className="bg-gray-600 text-sm px-3 py-1 rounded-full inline-block mr-[1rem] font-bold">SI&nbsp; • &nbsp;SM</p>
                </div>
            </div>
            <h2 className="text-3xl font-bold mb-[1rem] py-3">Project</h2>
            {
                careerSubDataTG.map((data: careerSubT, index) => {
                    return (
                        <div key={'c-' + index} className="mb-6">
                            <CareerDetailItem data={data} />
                        </div>
                    )
                })
            }
        </>
    )
}

interface CareerDetailItemProps {
    data: careerSubT;
}
const CareerDetailItem = (props: CareerDetailItemProps) => {
    const { data } = props;

    return (
        <div className="bg-gray-900 shadow-md rounded-2xl p-4 border border-gray-700">
            <div className="flex items-center justify-between mb-2">
                <div className="font-bold text-lg">
                    {data?.startTerm ? `${data.startTerm.getFullYear()}.${String(data.startTerm.getMonth()).padStart(2, '0')}` : 'N/A'}
                    &nbsp;-&nbsp;
                    {data?.endTerm ? `${data.endTerm.getFullYear()}.${String(data.endTerm.getMonth()).padStart(2, '0')}` : 'ING'}
                    <p className="font-medium text-lg">{data.projTitle}</p>
                </div>
                <div className="font-semibold text-blue-100 text-sm">{data.type}</div>
            </div>

            <div className="mb-3 text-sm leading-relaxed">
                <p>{data.description}</p>
            </div>

            <div className="flex flex-wrap gap-2">
                {data.skills?.map((data: skillStackT, index) => (
                    <span
                        className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium"
                        key={'sk-' + index}
                    >
                        {data.name}
                    </span>
                ))}
            </div>
        </div>
    )
}