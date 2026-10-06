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
    className={`pill cursor-pointer ${isSelected ? 'pill-dark' : 'pill-line'}`}
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
      <div className="card mb-5 grid gap-5 sm:grid-cols-2">
        {/* 참여 형태 필터 */}
        <div>
          <h3 className="card-label mb-2.5">참여 형태</h3>
          <div className="flex flex-wrap gap-1.5">
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
        <div>
          <h3 className="card-label mb-2.5">기술 분야</h3>
          <div className="flex flex-wrap gap-1.5">
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
      <p className="tnum mb-1 text-[0.80rem] text-ink-mute">
        총 <span className="font-semibold text-ac">{filteredData.length}</span>건
      </p>

      {/* 프로젝트 그리드 */}
      {isLoading ? (
        <div className="card py-12 text-center text-[0.95rem] text-ink-mute">불러오는 중...</div>
      ) : filteredData.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredData.map((data, index) => (
            <motion.div
              key={data.key || index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04, duration: 0.35 }}
            >
              <ProjDetailCard data={data} index={index} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="card py-12 text-center text-[0.95rem] text-ink-mute">조건에 맞는 프로젝트가 없습니다.</div>
      )}
    </DetailLayout>
  );
}
