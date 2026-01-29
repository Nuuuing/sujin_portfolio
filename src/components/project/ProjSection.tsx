'use client';

import { ProjCard, Search } from "@/components";
import { projectT } from "@/features";
import { getProjects } from "@/utils";
import { motion } from "motion/react";
import Link from "next/link";
import { useState, useEffect } from 'react';

export const ProjSection = () => {
    const [projectData, setProjectData] = useState<projectT[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const ptcOptions = ['ALL', 'TEAM', 'SOLO'];
    const [participation, setParticipation] = useState('ALL');

    const techOptions = ['ALL', 'WEB', 'UNITY'];
    const [techField, setTechField] = useState('ALL');

    const selectLeftArea = [0.4, 5.3, 10]

    useEffect(() => {
        const fetchProjects = async () => {
            setIsLoading(true);
            const data = await getProjects();
            setProjectData(data);
            setIsLoading(false);
        };
        fetchProjects();
    }, []);

    const filteredData = projectData.filter(data => {
        const matchParticipation =
            participation === 'ALL' || ptcOptions[data.projPtc] === participation;

        const matchTech =
            techField === 'ALL'
                ? true
                : data?.projSkills?.some(d =>
                    techField === 'WEB'
                        ? d.type === 'WEB'
                        : d.type === 'UNITY'
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
                    <h3 className="pl-0 text-[#a3a3a3] hover:text-[#72AAFF] dark:hover:text-[#f0f0f0]">더보기 &gt;</h3>
                </Link>

                <Search
                    title={'참여 형태'}
                    motionKey={'participation'}
                    motionArea={selectLeftArea}
                    motionIndex={ptcOptions.indexOf(participation)}
                >
                    {ptcOptions.map((opt) => {
                        const isSelected = opt === participation;

                        return (
                            <div
                                key={opt}
                                className="min-w-[4.3rem] text-center cursor-pointer z-10 px-2"
                                onClick={() => setParticipation(opt)}
                            >
                                <span
                                    className={`text-sm p-1 transition-colors duration-200
                                    ${isSelected ? 'text-[#f3f3f3] dark:text-gray-300' : 'text-black dark:text-gray-400'}`}
                                >
                                    {opt}
                                </span>
                            </div>
                        );
                    })}
                </Search>

                <Search
                    title={'기술 분야'}
                    motionKey={'tech'}
                    motionArea={selectLeftArea}
                    motionIndex={techOptions.indexOf(techField)}
                >
                    {techOptions.map((opt) => {
                        const isSelected = opt === techField;
                        return (
                            <div
                                key={opt}
                                className="min-w-[4.3rem] text-center cursor-pointer z-10 px-2"
                                onClick={() => setTechField(opt)}
                            >
                                <span
                                    className={`text-sm p-1 transition-colors duration-200
                                    ${isSelected ? 'text-[#f3f3f3] dark:text-gray-300' : 'text-black dark:text-gray-400'}`}
                                >
                                    {opt}
                                </span>
                            </div>
                        )
                    })}
                </Search>

                <div style={{ marginTop: '4rem' }} />
                {isLoading ? (
                    <div className="text-gray-400">로딩 중...</div>
                ) : filteredData.length > 0 ? (
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