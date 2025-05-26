import { careerData, careerT } from "@/modules/career";
import dayjs from "dayjs";

export const CareerSection = () => {
    const CareerMainData = careerData.map((data: careerT, index: number) => {
        return (
            <CareerItem
                key={'carr-'+index}
                data={data}
            />
        )
    })

    return (
        <div >
            <div
                className="w-[11rem]">
                <h1 className="text-3xl font-bold">CAREER</h1>
            </div>
            <div className="py-[3rem]">
                {CareerMainData}
            </div>
        </div>
    )
}

interface CareerItemProps {
    data: careerT;
}
const CareerItem = (props: CareerItemProps) => {
    const { data } = props;
    return (
        <div className="bg-[#1a1a1a] text-white rounded-xl px-4 py-3 text-center block space-y-2 shadow-md my-6">
            <div className="bg-gray-700 text-sm px-3 py-1 rounded-full inline-block">
                {dayjs(data?.startTerm).format('YYYY.MM')} - {data?.endTerm ? dayjs(data.endTerm).format('YYYY.MM') : 'ING'}
            </div>

            <div className="text-xl font-semibold">
                {data.company}
            </div>

            <div className="text-sm text-gray-300">
                {data?.teamName}팀 &nbsp; • &nbsp;{data?.position}
            </div>

            <div className="bg-gray-600 text-xs px-2 py-1 rounded-full inline-block">
                {data?.contents}
            </div>
        </div>)
}