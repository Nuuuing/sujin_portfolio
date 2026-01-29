'use client';

import { careerSubT, careerT, skillStackT } from "@/features";
import { getCareerSubs, getSkills } from "@/utils";
import { useEffect, useState } from "react";

interface CareerDetailProps {
    career: careerT;
}

export const CareerDetail = ({ career }: CareerDetailProps) => {
    const [projects, setProjects] = useState<careerSubT[]>([]);
    const [skills, setSkills] = useState<skillStackT[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            // skills 가져오기 (utils에서 캐싱 처리됨)
            const skillsData = await getSkills();
            setSkills(skillsData);

            // projects 가져오기
            if (career.docId) {
                const projectsData = await getCareerSubs(career.docId);
                setProjects(projectsData);
            }

            setIsLoading(false);
        };
        fetchData();
    }, [career.docId]);

    return (
        <div className="px-4 sm:px-8">
            <div className="mb-[4rem]">
                <div className="mb-[1rem]">
                    <h2 className="text-3xl font-bold">{career.company}</h2>
                    <div className="mt-2 space-y-1 text-sm sm:text-base text-gray-500 dark:text-gray-300">
                        <p>{career.contents}</p>
                        <p>{career.teamName}팀 • {career.position}</p>
                    </div>
                </div>
                <div className="flex flex-wrap gap-2">
                    <p className="bg-gray-600 text-sm px-3 py-1 rounded-full font-bold text-white">
                        {career.startTerm ? `${career.startTerm.getFullYear()}.${String(career.startTerm.getMonth() + 1).padStart(2, '0')}` : ''}
                        &nbsp;-&nbsp;
                        {career.endTerm ? `${career.endTerm.getFullYear()}.${String(career.endTerm.getMonth() + 1).padStart(2, '0')}` : 'ING'}
                        {career.dateString && ` (${career.dateString})`}
                    </p>
                </div>
            </div>

            {career.displayType === 'contents' ? (
                // Contents 형
                <div>
                    {career.detailContents && career.detailContents.length > 0 ? (
                        <div className="bg-[#fafafa] dark:bg-[#161616] shadow-md rounded-2xl p-4">
                            <ul className="list-disc list-inside space-y-2">
                                {career.detailContents.map((content, idx) => (
                                    <li key={idx} className="text-sm leading-relaxed">{content}</li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div className="text-gray-400">상세 내용이 없습니다.</div>
                    )}
                </div>
            ) : (
                // Project 형
                <>
                    <h2 className="text-3xl font-bold mb-[1rem] py-3">Project</h2>
                    {isLoading ? (
                        <div className="text-gray-400">로딩 중...</div>
                    ) : (
                        projects.map((data: careerSubT, index) => (
                            <div key={'c-' + index} className="mb-6">
                                <CareerDetailItem data={data} allSkills={skills} />
                            </div>
                        ))
                    )}
                </>
            )}
        </div>
    );
};

interface CareerDetailItemProps {
    data: careerSubT;
    allSkills: skillStackT[];
}

const CareerDetailItem = ({ data, allSkills }: CareerDetailItemProps) => {
    // skills는 항상 number 배열 (key)
    const skillsList = data.skills && Array.isArray(data.skills)
        ? data.skills
            .map((skillKey: any) => {
                const key = typeof skillKey === 'number' ? skillKey : Number(skillKey);
                return allSkills.find(s => s.key === key);
            })
            .filter((skill): skill is skillStackT => skill !== undefined)
        : [];

    return (
        <div className="bg-[#fafafa] dark:bg-[#161616] shadow-md rounded-2xl p-4 border border-gray-400">
            {/* 상단 제목 영역 */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-1">
                <div className="font-bold text-lg">
                    {data?.startTerm ? `${data.startTerm.getFullYear()}.${String(data.startTerm.getMonth() + 1).padStart(2, '0')}` : ''}
                    &nbsp;-&nbsp;
                    {data?.endTerm ? `${data.endTerm.getFullYear()}.${String(data.endTerm.getMonth() + 1).padStart(2, '0')}` : 'ING'}
                    {data.dateString && ` (${data.dateString})`}
                    <p className="font-medium text-lg mt-1">{data.projTitle}</p>
                </div>
                <div className="font-semibold text-gray-600 dark:text-gray-200 text-base pr-[0.5rem]">{data.type}</div>
            </div>

            {/* 설명 */}
            {data.description && (
                <div className="mb-3 text-sm leading-relaxed">
                    <p>{data.description}</p>
                </div>
            )}

            {/* 담당 내용 */}
            {data.task && Array.isArray(data.task) && data.task.length > 0 && (
                <div className="mb-3">
                    <p className="text-sm font-semibold mb-1">담당 내용:</p>
                    <ul className="list-disc list-inside text-sm space-y-1">
                        {data.task.map((item, idx) => (
                            <li key={idx}>{item}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* 개발 내용 */}
            {data.contents && Array.isArray(data.contents) && data.contents.length > 0 && (
                <div className="mb-3">
                    <p className="text-sm font-semibold mb-1">개발 내용:</p>
                    <ul className="list-disc list-inside text-sm space-y-1">
                        {data.contents.map((content, idx) => (
                            <li key={idx}>{content}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* 결과 - 배열인 경우 */}
            {data.result && Array.isArray(data.result) && data.result.length > 0 && (
                <div className="mb-3">
                    <p className="text-sm font-semibold mb-1">결과:</p>
                    <ul className="list-disc list-inside text-sm space-y-1">
                        {data.result.map((res, idx) => (
                            <li key={idx}>{res}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* 결과 - 문자열인 경우 */}
            {data.result && typeof data.result === 'string' && (
                <div className="mb-3">
                    <p className="text-sm font-semibold mb-1">결과:</p>
                    <p className="text-sm">{data.result}</p>
                </div>
            )}

            {/* 기술 스택 */}
            {skillsList.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {skillsList.map((skill, index) => (
                        <span
                            className="bg-[#dadada] dark:bg-[#414141] text-[#636363] dark:text-[#e9e9e9] text-xs px-2 py-1 rounded-full font-medium"
                            key={'sk-' + index}
                        >
                            {skill.name}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
};
