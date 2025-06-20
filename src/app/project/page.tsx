'use client';

import { DetailLayout, ProjDetailCard, Search } from "@/components";
import { projectData } from "@/data";
import { stackType } from "@/types";
import { useState } from "react";

export default function ProjectPage() {
  const ptcOptions = ['ALL', 'TEAM', 'SOLO'];
  const [participation, setParticipation] = useState('ALL');

  const techOptions = ['ALL', 'WEB', 'UNITY'];
  const [techField, setTechField] = useState('ALL');

  const selectLeftArea = [0.4, 5.3, 10]

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
    <DetailLayout
      title={'PROJECT'}>
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
      {filteredData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((data, index) => (
            <ProjDetailCard key={index} data={data} />
          ))}
        </div>
      ) : (
        <div className="text-gray-400">조건에 맞는 프로젝트가 없습니다.</div>
      )}
    </DetailLayout>
  );
}
