
import { CareerItem } from "@/components";
import { careerData } from "@/data";
import { careerT } from "@/types";
import React from "react";

export const CareerSection = () => {
    const CareerMainData = careerData.map((data: careerT, index: number) => (
        <React.Fragment key={`carr-wrap-${index}`}>
            <CareerItem key={`carr-${index}`} data={data} />
            {index < careerData.length - 1 && (
                <p className="w-[19rem] text-center mx-2 text-[#d3d3d3] font-bold text-xl">•</p>
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
                    {CareerMainData}
                </div>
            </div>
        </div>
    )
}

