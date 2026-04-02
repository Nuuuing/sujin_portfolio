// ==================== 경력 (Career) 타입 ====================

// 경력 표시 유형
export type CareerDisplayType = "project" | "contents";

// 경력 상세 콘텐츠 타입
export interface DetailContentT {
    img?: string;      // 이미지 URL
    contents: string;  // 내용
}

// 경력 프로젝트 타입
export interface CareerProjectT {
    key: number;
    projName: string;
    description?: string;   // 프로젝트 설명
    startDate: string;      // YYYY.MM
    endDate?: string;       // YYYY.MM
    duration?: string;      // 예: "5개월"
    role: string;           // 예: "FrontEnd 개발"
    tasks: string[];        // 주요 업무 목록
    achievements?: string[]; // 성과
    skills?: number[];      // 사용 기술 (스킬 키)
}

// 경력 타입
export interface CareerT {
    key: number;
    docId?: string;         // Firestore document ID
    company: string;
    team?: string;          // 팀명
    position: string;       // 직급
    contents?: string;      // 경력 내용 요약
    description?: string;   // 설명
    displayType: CareerDisplayType;
    startTerm: string;      // YYYYMM
    endTerm?: string;       // YYYYMM (재직중이면 비워둠)
    projects?: CareerProjectT[];     // displayType이 "project"일 때
    detailContents?: DetailContentT[];       // displayType이 "contents"일 때
}

// 경력 폼 데이터 타입
export interface CareerFormData {
    key: number;
    company: string;
    team: string;
    position: string;
    contents: string;
    description: string;
    displayType: CareerDisplayType;
    startTerm: string;
    endTerm: string;
    projects: CareerProjectT[];
    detailContents: DetailContentT[];
}

// 하위 호환용 (deprecated)
export type careerSubT = CareerProjectT;
export type careerT = CareerT;
