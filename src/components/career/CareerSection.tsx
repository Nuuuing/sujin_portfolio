'use client';

import { CareerItem } from "@/components";
import { careerT } from "@/features";
import { getCareers } from "@/utils";
import React, { useEffect, useState } from "react";

export const CareerSection = () => {
    const [careerData, setCareerData] = useState<careerT[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCareers = async () => {
            setIsLoading(true);
            const data = await getCareers();
            setCareerData(data);
            setIsLoading(false);
        };
        fetchCareers();
    }, []);

    const CareerMainData = careerData
        .slice()
        .reverse()
        .map((data: careerT, index: number) => (
            <React.Fragment key={`carr-wrap-${index}`}>
                <CareerItem key={`carr-${index}`} data={data} />
                {index < careerData.length - 1 && (
                    <p className="w-[19rem] text-center mx-2 text-gray-700 dark:text-[#d3d3d3] font-bold text-xl">•</p>
                )}
            </React.Fragment>
        ));

    return (
        <div >
            <div
                className="w-[11rem]">
                <h1 className="text-3xl font-bold">CAREER</h1>
            </div>
            <div className="mt-[4rem] flex justify-center">
                <div>
                    {isLoading ? (
                        <div className="text-gray-400">로딩 중...</div>
                    ) : (
                        CareerMainData
                    )}
                </div>
            </div>
        </div>
    )
}

