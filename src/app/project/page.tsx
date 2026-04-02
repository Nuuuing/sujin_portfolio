'use client';

import { DetailLayout, ProjDetailCard } from "@/components";
import { getProjects } from "@/utils";
import { projectT, skillStackT } from "@/features";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";

type FilterOption = {
  value: string;
  label: string;
};

const FilterButton = ({
  option,
  isSelected,
  onClick
}: {
  option: FilterOption;
  isSelected: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer
      ${isSelected
        ? 'bg-[#72AAFF] text-white shadow-lg shadow-[#72AAFF]/20'
        : 'bg-gray-100 dark:bg-[#2a2a2a] text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-[#333] hover:text-gray-800 dark:hover:text-gray-200'}`}
  >
    {option.label}
  </button>
);

export default function ProjectPage() {
  const pathname = usePathname();
  const [projectData, setProjectData] = useState<projectT[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const ptcOptions: FilterOption[] = [
    { value: 'ALL', label: '전체' },
    { value: 'TEAM', label: '팀 프로젝트' },
    { value: 'SOLO', label: '개인 프로젝트' }
  ];
  const [participation, setParticipation] = useState('ALL');

  const techOptions: FilterOption[] = [
    { value: 'ALL', label: '전체' },
    { value: 'WEB', label: 'Web' },
    { value: 'UNITY', label: 'Unity' }
  ];
  const [techField, setTechField] = useState('ALL');

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        const data = await getProjects();
        setProjectData(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
      setIsLoading(false);
    };
    fetchProjects();
  }, [pathname]);

  const filteredData = projectData.filter(data => {
    const ptcValues = ['ALL', 'TEAM', 'SOLO'];
    const matchParticipation =
      participation === 'ALL' || ptcValues[data.projPtc] === participation;

    const matchTech =
      techField === 'ALL'
        ? true
        : data?.projSkills?.some((d: skillStackT) =>
          techField === 'WEB'
            ? d.type === 'WEB'
            : d.type === 'UNITY'
        );

    return matchParticipation && matchTech;
  });

  return (
    <DetailLayout title="PROJECT">
      {/* 필터 영역 */}
      <div className="space-y-6 mb-10">
        {/* 참여 형태 필터 */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">참여 형태</h3>
          <div className="flex flex-wrap gap-2">
            {ptcOptions.map((opt) => (
              <FilterButton
                key={opt.value}
                option={opt}
                isSelected={participation === opt.value}
                onClick={() => setParticipation(opt.value)}
              />
            ))}
          </div>
        </div>

        {/* 기술 분야 필터 */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">기술 분야</h3>
          <div className="flex flex-wrap gap-2">
            {techOptions.map((opt) => (
              <FilterButton
                key={opt.value}
                option={opt}
                isSelected={techField === opt.value}
                onClick={() => setTechField(opt.value)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 결과 카운트 */}
      <div className="mb-6">
        <p className="text-sm text-gray-500">
          총 <span className="text-[#72AAFF] font-semibold">{filteredData.length}</span>개의 프로젝트
        </p>
      </div>

      {/* 프로젝트 그리드 */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-[#72AAFF] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filteredData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((data, index) => (
            <motion.div
              key={data.key || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
            >
              <ProjDetailCard data={data} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <svg className="w-16 h-16 mb-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-lg">조건에 맞는 프로젝트가 없습니다.</p>
        </div>
      )}
    </DetailLayout>
  );
}
