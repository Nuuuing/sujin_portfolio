'use client';

import { motion } from "framer-motion"
import { useState } from 'react';

export const ProjSection = () => {
    const ptcOptions = ['ALL', 'TEAM', 'SOLO'];
    const [participation, setParticipation] = useState('ALL');

    const techOptions = ['ALL', 'WEB', 'UNITY'];
    const [techField, setTechField] = useState('ALL');

    const selectLeftArea = [0.5, 6, 11.5]

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.6 }}
            transition={{ duration: 0.6 }}
            className="mt-16"
        >
            <h1 className="text-3xl font-bold mb-6">PROJECT</h1>

            {/* 참여 형태 */}
            <div className="flex items-center mb-4">
                <p className="w-24 p-2">참여 형태</p>
                <div className="relative flex justify-center bg-[#353535] rounded-full p-2 gap-2 min-w-[17rem]">
                    <motion.div
                        layoutId="ptcSelector"
                        className="absolute top-1 bottom-1 w-20 rounded-full bg-black z-0"
                        style={{
                            left: `${selectLeftArea[ptcOptions.indexOf(participation)]}rem`
                        }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                    {ptcOptions.map((opt) => (
                        <div
                            key={opt}
                            className="w-20 text-center cursor-pointer z-10"
                            onClick={() => setParticipation(opt)}
                        >
                            <span className="text-sm text-gray-300 p-1">{opt}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* 기술 분야 */}
            <div className="flex items-center">
                <p className="w-24 p-2">기술 분야</p>
                <div className="relative flex justify-center bg-[#353535] rounded-full p-2 gap-2 min-w-[17rem]">
                    <motion.div
                        layoutId="techSelector"
                        className="absolute top-1 bottom-1 w-20 rounded-full bg-black z-0"
                        style={{
                            left: `${selectLeftArea[techOptions.indexOf(techField)]}rem`
                        }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                    {techOptions.map((opt) => (
                        <div
                            key={opt}
                            className="w-20 text-center cursor-pointer z-10"
                            onClick={() => setTechField(opt)}
                        >
                            <span className="text-sm text-gray-300">{opt}</span>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};