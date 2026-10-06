import { CareerT } from "@/features";
import { formatTerm } from "@/utils/career";
import Link from "next/link";

interface CareerItemProps {
    data: CareerT;
}

export const CareerItem = (props: CareerItemProps) => {
    const { data } = props;
    return (
        <Link
            href={{ pathname: `/career/detail/${data.key}` }}
            className="rule row-invert block cursor-pointer py-3.5 text-ink"
        >
            <div className="flex items-baseline justify-between gap-4">
                <div>
                    <p className="text-[1.10rem] font-bold tracking-[-0.018em]">{data.company}</p>
                    <p className="mt-0.5 text-[0.80rem] text-ink-mute">
                        {data.team && `${data.team} · `}{data.position}
                    </p>
                </div>
                <div className="tnum shrink-0 text-right">
                    <p className="text-[0.82rem] font-semibold">
                        {formatTerm(data.startTerm)} — {data.endTerm ? formatTerm(data.endTerm) : <em className="not-italic font-bold text-ac">현재</em>}
                    </p>
                    {data.projects && data.projects.length > 0 && (
                        <p className="text-[0.72rem] text-ink-mute">프로젝트 {data.projects.length}건</p>
                    )}
                </div>
            </div>
        </Link>
    )
}
