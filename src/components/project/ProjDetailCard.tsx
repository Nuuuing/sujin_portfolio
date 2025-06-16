'use client'

import { projectT, skillStackT } from "@/types";
import { motion } from "motion/react";
import Link from "next/link";

interface ProjDetailCardProps {
    data: projectT;
}
export const ProjDetailCard = (props: ProjDetailCardProps) => {
    const { data } = props;

    return (
        <Link href={{ pathname: `/project/detail/${data.key}`}}>
            <div className="group m-2 p-4 flex flex-col md:flex-row hover:bg-[#3b3b3b] rounded-xl">
                <div className="w-full md:w-1/5 flex justify-center">
                    <div className="w-48 h-48 overflow-hidden rounded-xl mb-4 md:mb-0">
                        <motion.img
                            src={`${data.imgUrl}`}
                            alt={data.projName}
                            className="w-48 h-48 object-cover rounded-xl grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-300"
                        />
                    </div>
                </div>

                <div className="w-full md:w-4/5 md:ml-5">
                    <h2 className="text-2xl font-extrabold text-gray-800 dark:text-gray-100">{data.projName}</h2>
                    <p className="font-bold mt-3 text-xl text-gray-600 dark:text-gray-300">
                        {data.startDate} - {data?.endDate ? data.endDate : 'ing'}
                    </p>
                    <p className="text-base font-light mt-2 text-gray-600 dark:text-gray-300">{data.projDesc}</p>

                    {data?.projTag && (
                        <div className="text-sm flex flex-wrap gap-2 mt-2">
                            {data.projTag.map((value: string, idx: number) => (
                                <p key={idx} className="text-gray-400 px-1 py-1">#{value}</p>
                            ))}
                        </div>
                    )}

                    {data?.projSkills && (
                        <div className="mt-auto flex flex-wrap gap-2 pt-4">
                            {data.projSkills.map((value: skillStackT, idx) => (
                                <p
                                    key={idx}
                                    className="text-black text-xs font-medium px-1.5 py-1 rounded-lg bg-gray-200 dark:bg-white-100 dark:text-black"
                                >
                                    {value.name}
                                </p>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Link>
    )
}