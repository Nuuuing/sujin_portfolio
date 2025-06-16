
import { careerT } from "@/types";
import dayjs from "dayjs";
import Link from "next/link";

interface CareerItemProps {
    data: careerT;
}
export const CareerItem = (props: CareerItemProps) => {
    const { data } = props;
    return (
        <Link
            href={{ pathname: `/career/detail/${data.key}` }}
            className="bg-[#1a1a1a] w-[20rem] text-white rounded-xl px-4 py-2 text-center block space-y-2 shadow-md my-4 cursor-pointer">
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
        </Link>)
}