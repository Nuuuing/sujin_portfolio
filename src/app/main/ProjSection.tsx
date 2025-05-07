'use client';

import { ProjCard, Search } from "@/components";
import { projectData } from "@/modules/project";
import { motion } from "framer-motion"
import { useState } from 'react';

export const ProjSection = () => {
    const ptcOptions = ['ALL', 'TEAM', 'SOLO'];
    const [participation, setParticipation] = useState('ALL');

    const techOptions = ['ALL', 'WEB', 'UNITY'];
    const [techField, setTechField] = useState('ALL');

    const selectLeftArea = [0.5, 6, 11.5]

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0 }}
                transition={{ duration: 0.6 }}
                className="mt-16"
                style={{ padding: '8rem 0px' }}
            >
                <h1 className="text-3xl font-bold mb-6">PROJECT</h1>

                <Search
                    title={'참여 형태'}
                    motionKey={'participation'}
                    motionArea={selectLeftArea}
                    motionIndex={ptcOptions.indexOf(participation)}
                >
                    {ptcOptions.map((opt) => (
                        <div
                            key={opt}
                            className="w-20 text-center cursor-pointer z-10"
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
                            className="w-20 text-center cursor-pointer z-10"
                            onClick={() => setTechField(opt)}
                        >
                            <span className="text-sm text-gray-300">{opt}</span>
                        </div>
                    ))}
                </Search>

                <div style={{ marginTop: '4rem' }} />
                {projectData?.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projectData.map((data, index) => (
                            <ProjCard key={index} data={data} />
                        ))}
                    </div>
                ) : (
                    <div className="text-gray-400">Loading...</div>
                )}

            </motion.div>
        </>
    );
};