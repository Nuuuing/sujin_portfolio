'use client';

import { ProjCard, Search } from "@/components";
import { projectData } from "@/data";
import { stackType } from "@/types";
import { motion } from "motion/react";
import Link from "next/link";
import { useState } from 'react';

export const ProjSection = () => {
    const ptcOptions = ['ALL', 'TEAM', 'SOLO'];
    const [participation, setParticipation] = useState('ALL');

    const techOptions = ['ALL', 'WEB', 'UNITY'];
    const [techField, setTechField] = useState('ALL');

    const selectLeftArea = [0.5, 6, 11.5]

    const filteredData = projectData.filter(data => {
        const matchParticipation =
            participation === 'ALL' || ptcOptions[data.projPtc] === participation;

        const matchTech =
            techField === 'ALL'
                ? true
                : data?.projSkills?.some(d =>
                    techField === 'WEB'
                        ? d.type === stackType.WEB
                        : d.type === stackType.UNITY
                );

        return matchParticipation && matchTech;
    });
    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0 }}
                transition={{ duration: 0.6 }}
                className="mt-16"
                style={{ margin: '6rem 0px', paddingTop: '1rem', borderTop: '1px solid #e9e9e9' }}
            >
                <Link href="/project"
                    className="mb-6 cursor-pointer w-[11rem]"
                >
                    <h1 className="text-3xl font-bold">PROJECT</h1>
                    <h3 className="pl-0 text-[#a3a3a3] hover:text-[#f0f0f0]">더보기 &gt;</h3>
                </Link>

                <Search
                    title={'참여 형태'}
                    motionKey={'participation'}
                    motionArea={selectLeftArea}
                    motionIndex={ptcOptions.indexOf(participation)}
                >
                    {ptcOptions.map((opt) => (
                        <div
                            key={opt}
                            className="min-w-[4.5rem] text-center cursor-pointer z-10 px-2"
                            onClick={() => setParticipation(opt)}
                        >
                            <span className="text-sm text-gray-300 p-1">{opt}</span>
                        </div>
                    ))}
                </Search>

                <Search
                    title={'기술 분야'}
                    motionKey={'tech'}
                    motionArea={selectLeftArea}
                    motionIndex={techOptions.indexOf(techField)}
                >
                    {techOptions.map((opt) => (
                        <div
                            key={opt}
                            className="min-w-[4.5rem] text-center cursor-pointer z-10 px-2"
                            onClick={() => setTechField(opt)}
                        >
                            <span className="text-sm text-gray-300">{opt}</span>
                        </div>
                    ))}
                </Search>

                <div style={{ marginTop: '4rem' }} />
                {filteredData.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredData.map((data, index) => (
                            <ProjCard key={index} data={data} />
                        ))}
                    </div>
                ) : (
                    <div className="text-gray-400">조건에 맞는 프로젝트가 없습니다.</div>
                )}

            </motion.div>
        </>
    );
};