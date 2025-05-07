'use client';

import { motion } from "framer-motion"
import { BaseCard } from "./BaseCard"
import { projectT } from "@/modules/project"

interface ProjCardProps {
    data: projectT;
}
export const ProjCard = (props: ProjCardProps) => {
    const { data } = props;

    return (
        <BaseCard className="group">
            <div className="w-full h-48 overflow-hidden rounded-xl mb-4">
                <motion.img
                    src={data.imgUrl}
                    alt={data.projName}
                    className="w-full h-48 object-cover rounded-xl mb-4 grayscale group-hover:grayscale-0 group-hover:scale-115 transition-all duration-300"
                />
            </div>
            <h2 className="font-black extrabold text-xl font-semibold text-gray-800 dark:text-gray-100">{data.projName}</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300">{data.startDate} - {data?.endDate ? data.endDate : 'ing'}</p>
            <p className="font-light mt-2 text-gray-600 dark:text-gray-300">{data.projDesc}</p>

        </BaseCard>
    )
}