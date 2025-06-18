import { careerSubDataTG } from "@/data";
import { careerSubT, skillStackT } from "@/types";

export const CareerTg = () => {

    return (
        <div className="px-4 sm:px-8">
            <div className="mb-[4rem]">
                <div className="mb-[1rem]">
                    <h2 className="text-3xl font-bold">(주)티지</h2>
                    <div className="mt-2 space-y-1 text-sm sm:text-base text-gray-300">
                        <p>공공 IT(데이터, ISP) 컨설팅</p>
                        <p>플랫폼팀 • 주임</p>
                    </div>
                </div>
                <div className="flex flex-wrap gap-2">
                    {[
                        "2022.04 - 2024.02(2Y)",
                        "WEB FULLSTACK",
                        "SI • SM",
                    ].map((label, i) => (
                        <p
                            key={i}
                            className="bg-gray-600 text-sm px-3 py-1 rounded-full font-bold"
                        >
                            {label}
                        </p>
                    ))}
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
        </div>
    )
}

interface CareerDetailItemProps {
    data: careerSubT;
}
const CareerDetailItem = (props: CareerDetailItemProps) => {
    const { data } = props;

    return (
        <div className="bg-gray-900 shadow-md rounded-2xl p-4 border border-gray-700">
            {/* 상단 제목 영역 */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-1">
                <div className="font-bold text-lg">
                    {data?.startTerm ? `${data.startTerm.getFullYear()}.${String(data.startTerm.getMonth() + 1).padStart(2, '0')}` : 'N/A'}
                    &nbsp;-&nbsp;
                    {data?.endTerm ? `${data.endTerm.getFullYear()}.${String(data.endTerm.getMonth() + 1).padStart(2, '0')}` : 'ING'}
                    <p className="font-medium text-lg mt-1">{data.projTitle}</p>
                </div>
                <div className="font-semibold text-blue-100 text-base">{data.type}</div>
            </div>

            {/* 설명 */}
            <div className="mb-3 text-sm leading-relaxed">
                <p>{data.description}</p>
            </div>

            {/* 기술 스택 */}
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