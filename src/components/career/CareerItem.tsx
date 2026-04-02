
import { CareerT } from "@/features";
import Link from "next/link";

// YYYYMM 형식을 YYYY.MM으로 변환
const formatTerm = (term: string | undefined): string => {
    if (!term) return '';
    if (term.length === 6) {
        return `${term.slice(0, 4)}.${term.slice(4, 6)}`;
    }
    return term;
};

interface CareerItemProps {
    data: CareerT;
}
export const CareerItem = (props: CareerItemProps) => {
    const { data } = props;
    return (
        <Link
            href={{ pathname: `/career/detail/${data.key}` }}
            className="w-[20rem] dark:text-white px-4 py-2 text-center block space-y-2 my-4 cursor-pointer">
            <div className="bg-[#e9e9e9] dark:bg-gray-700 text-base px-3 py-1 rounded-full inline-block">
                {formatTerm(data.startTerm)}
                &nbsp;-&nbsp;
                {data.endTerm ? formatTerm(data.endTerm) : '현재'}
            </div>

            <div className="text-2xl font-semibold">
                {data.company}
            </div>

            <div className="text-base text-gray-700 dark:text-gray-300">
                {data.team && `${data.team}팀`} &nbsp; • &nbsp;{data.position}
            </div>

            {data.projects && data.projects.length > 0 && (
                <div className="bg-[#e9e9e9] dark:bg-gray-700 text-sm px-2 py-1 rounded-full inline-block">
                    프로젝트 {data.projects.length}개
                </div>
            )}
        </Link>)
}
