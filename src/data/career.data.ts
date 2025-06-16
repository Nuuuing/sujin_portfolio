import { careerSubT, careerT } from "@/types"
import { skills } from "./common.data"

export const careerSubDataTG: careerSubT[] = [
    {
        key: 5,
        projTitle: "다지점 동물 임상시험 플랫폼 기능개선 및 고도화",
        startTerm: new Date(2023, 10),
        endTerm: new Date(2024, 2),
        dateString: '5개월',
        skills: [
            skills[0],
            skills[5],
            skills[9],
            skills[2],
            skills[13],
            skills[15],
            skills[17]
        ],
        description: "기존 플랫폼 성능 개선 및 고객 요구사항 추가로 인한 기능 고도화",
        contents: ["ReactQuery 적용하여 성능 향상", "유저 피드백에 맞추어 기능 개선", "사용자 매뉴얼 작성 (관리자, 사용자)"],
        result: ["성능과 TDD에 대해 중요성을 깊이 인식하게 됨"],
        type: 'FrontEnd'
    },
    {
        key: 4,
        projTitle: "예금보험공사 차세대 IT구축사업 - 정보화통합관리체계 구축 및 개발",
        startTerm: new Date(2023, 9),
        endTerm: new Date(2023, 12),
        dateString: '4개월',
        skills: [
            skills[6],
            skills[4],
            skills[7],
            skills[8],
            skills[11]
        ],
        description: "예금보험공사 내 정보화통합관리체계 EAMS 신규 구축 진행",
        contents: ["전자정부프레임워크 JSP 사용한 정보화통합관리체계 개발", "행정안전부 범정부 EA 표준 등록항목 및 연관정보 등 연동", "요구사항 적용 및 통합테스트 시나리오, 단위테스트 시나리오 작성", "공공 SI 단계별 산출물 작성 (기능 명세서, 테이블 정의서, 매뉴얼 등)"],
        result: ["공공 SI 신규 납품 및 구축시의 상황 파악 및 환경설정 관리", "담당자와의 커뮤니케이션의 중요성과 현장 상황 파악"],
        type: 'FullStack'
    },
    {
        key: 3,
        projTitle: "동물 원격진료 플랫폼 MVP 개발",
        startTerm: new Date(2023, 6),
        endTerm: new Date(2023, 8),
        dateString: '3개월',
        skills: [
            skills[0],
            skills[5],
            skills[9],
            skills[2],
            skills[10],
            skills[13],
            skills[15],
            skills[17]
        ],
        description: "내부적 신규 사업 가능성 확인을 위한 원격진료 플랫폼 MVP 개발",
        contents: ["React.js 와 ReactQuery을 이용한 웹 Front 개발", "Google WebSocket을 이용하여 실시간 영상통화 및 채팅 개발", "플랫폼 전체 UI&UX 디자인 및 퍼블리싱"],
        result: ["ReactQuery, WebSocket 등의 새로운 기술 습득", "회사의 실제 사업성의 중요성을 파악"],
        type: 'FrontEnd'
    },
    {
        key: 2,
        projTitle: "정보화통합관리체계 운영개선 및 유지관리",
        startTerm: new Date(2023, 1),
        endTerm: new Date(2024, 2),
        dateString: '15개월',
        skills: [
            skills[4],
            skills[6],
            skills[7],
            skills[8],
            skills[11],
            skills[12],
            skills[16]
        ],
        description: "대검찰청, 저작권위원회, 건강보험심사평가원, 교육부, 일산병원 등 각 공공기관에 납품된 정보화통합관리체계의 운영개선 및 유지관리",
        contents: ["유지관리 및 고객 요구사항 수행", "보안취약점 점검사항 조치", "정기점검, 서버 이관 및 DB 이관 등의 업무 지원", "데이터 현행화"],
        result: ["공공기관 고객 과의 커뮤니케이션 능력 향상", "실제 개발 외의 주변 다양한 업무에 대해 파악 및 대응 능력 향상", "서버 관리에 대한 이해도 상승"],
        type: 'FullStack'
    },
    {
        key: 1,
        projTitle: "다지점 동물 임상시험 플랫폼 구축, 개발",
        startTerm: new Date(2022, 12),
        endTerm: new Date(2023, 3),
        dateString: '4개월',
        skills: [
            skills[0],
            skills[5],
            skills[2],
            skills[14],
            skills[15],
            skills[16]
        ],
        description: "다양한 기기를 지원하는 3상,4상 타겟 동물 임상시험을 위한 플랫폼 개발",
        contents: ["React.js 사용한 적응형(PC ,Mobile, Tablet 지원) FrontEnd 개발", "사용자 매뉴얼 작성", "전체 UI&UX 디자인"],
        result: ["고객과의 커뮤니케이션 능력 강화", "새로운 기술을 적용하며 다양한 기술에 관심 증가", "주도적인 개발을 통해 개발능력 향상"],
        type: 'FrontEnd'
    },
    {
        key: 0,
        projTitle: "인천스마트관광도시 서비스 및 플랫폼 기능개선, 유지보수 및 OpenAPI 개발",
        startTerm: new Date(2022, 3),
        endTerm: new Date(2022, 12),
        dateString: '9개월',
        skills: [
            skills[0],
            skills[1],
            skills[2],
            skills[3],
            skills[4],
            skills[5],
            skills[14],
            skills[15],
            skills[16]
        ],
        description: "인천관광공사 운영 대민 서비스 인천e지 앱 관리자 페이지와 상용서버의 기능개선 및 고도화",
        contents: ["관리자 페이지 및 서버 개발", "공공 SI 단계별 산출물 작성 (기능 명세서, 테이블 정의서, 프로그램 명세서 등)", "디버깅 진행 후 협력업체 전달"],
        result: ["공공 프로젝트 업무 진행 파악", "마더업체로써 협력업체와 협업 능력 강화"],
        type: 'FullStack'
    }
]

export const careerData: careerT[] = [
    {
        key: 0,
        company: "(주)TG",
        startTerm: new Date(2022, 3),
        endTerm: new Date(2024, 2),
        dateString: "만 2년",
        contents: "공공 기관 SI/SM",
        teamName: "플랫폼",
        position: "주임"
    },
    {
        key: 1,
        company: "(주)유팜몰",
        startTerm: new Date(2025, 3),
        dateString: "만 1년",
        contents: "웹 개발 및 유지보수",
        teamName: "개발",
        position: "주임"
    }
]