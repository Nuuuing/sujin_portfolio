import { careerSubDataTG } from "@/data";
import { careerSubT, skillStackT } from "@/types";
import dayjs from "dayjs"

export const CareerTg = () => {

    return (
        <>
            <div className="mb-[4rem]">
                <div className="mb-[2rem]">
                    <h2 className="text-3xl font-bold">(주)티지</h2>
                    <p>플랫폼팀&nbsp; • &nbsp;주임</p>
                </div>
                <div>
                    <p className="bg-gray-700 text-sm px-3 py-1 rounded-full inline-block mr-[1rem] font-bold">2022.04 - 2024.02(2Y)</p>
                    <p className="bg-gray-700 text-sm px-3 py-1 rounded-full inline-block mr-[1rem] font-bold">WEB FULLSTACK</p>
                    <p className="bg-gray-700 text-sm px-3 py-1 rounded-full inline-block mr-[1rem] font-bold">SI&nbsp; • &nbsp;SM</p>
                </div>
            </div>
            {
                careerSubDataTG.map((data: careerSubT, index) => {
                    return (
                        <div key={'c-' + index}>
                            <CareerDetailItem
                                key={index}
                                data={data}
                            />
                            {index < careerSubDataTG.length - 1 && (
                                <div style={{ margin: '1rem 0 1rem 1rem' }}></div>
                            )}
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
        <div className="ml-[1rem]">
            <div className="mb-[0.5rem]">
                <div className="inline-block font-bold mr-[1rem]">
                    {data?.startTerm ? `${data.startTerm.getFullYear()}.${String(data.startTerm.getMonth()).padStart(2, '0')}` : 'N/A'}
                    -
                    {data?.endTerm ? `${data.endTerm.getFullYear()}.${String(data.endTerm.getMonth()).padStart(2, '0')}` : 'ING'}
                </div>
                <p className="inline-block font-bold mr-[1rem]">
                    •
                </p>
                <div className="inline-block font-bold">
                    {data.type}
                </div>
            </div>
            <div className="mb-[0.5rem]">
                {data.description}
            </div>
            <div>
                {data.skills?.map((data: skillStackT, index) => {
                    return (
                        <span
                            className="bg-gray-800 text-sm px-2 py-1 rounded-full inline-block mr-[0.5rem]"
                            key={'sk-' + index}>
                            {data.name}
                        </span>
                    )
                })}
            </div>
        </div>
    )
}