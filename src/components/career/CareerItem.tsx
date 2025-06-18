
import { careerT } from "@/types";
import Link from "next/link";

interface CareerItemProps {
    data: careerT;
}
export const CareerItem = (props: CareerItemProps) => {
    const { data } = props;
    return (
        <Link
            href={{ pathname: `/career/detail/${data.key}` }}
            className="w-[20rem] dark:text-white px-4 py-2 text-center block space-y-2 shadow-md my-4 cursor-pointer">
            <div className="bg-gray-700 text-sm px-3 py-1 rounded-full inline-block">
                {data?.startTerm ? `${data.startTerm.getFullYear()}.${String(data.startTerm.getMonth()).padStart(2, '0')}` : ''}
                &nbsp;-&nbsp;
                {data?.endTerm ? `${data.endTerm.getFullYear()}.${String(data.endTerm.getMonth()).padStart(2, '0')}` : 'ING'}
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