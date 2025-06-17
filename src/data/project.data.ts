import { projDetailT, projectT, ProjPtc, ProjSize } from "@/types";
import { skills } from "./common.data";

export const prepImg = `${process.env.BASE_PATH}/projImg/preparing.png`;

//blue
const blue_0 = `${process.env.BASE_PATH}/projImg/blue_0.png`;
const blue_1 = `${process.env.BASE_PATH}/projImg/blue_1.png`;
//zonbie
const zphImg = `${process.env.BASE_PATH}/projImg/zph.png`;
const zphImg1 = `${process.env.BASE_PATH}/projImg/zph_1.png`;
const zphImg2 = `${process.env.BASE_PATH}/projImg/zph_2.png`;
const zphImg3 = `${process.env.BASE_PATH}/projImg/zph_3.png`;
const zphImg4 = `${process.env.BASE_PATH}/projImg/zph_4.png`;
//sori
const sori_0 = `${process.env.BASE_PATH}/projImg/sori_0.png`; 
const sori_1 = `${process.env.BASE_PATH}/projImg/sori_1.png`;
const sori_2 = `${process.env.BASE_PATH}/projImg/sori_2.png`;
//nekopark
const nekoparkImg = `${process.env.BASE_PATH}/projImg/nekopark.png`;
//wildeight
const twf_0 = `${process.env.BASE_PATH}/projImg/twf_0.png`;
const twf_1 = `${process.env.BASE_PATH}/projImg/twf_1.png`;
const twf_2 = `${process.env.BASE_PATH}/projImg/twf_2.png`;
//pp
const paperPleaseImg = `${process.env.BASE_PATH}/projImg/pp.png`;

export const projectData: projectT[] = [
    {
        key: 5,
        projName: "MyLIO_나의작은바다",
        projTag: ["3D", "캐주얼", "퍼즐"],
        startDate: "2024.01",
        endDate: " 2025.03 ",
        projSkills: [
            skills[18], skills[21], skills[13], skills[19], skills[15], skills[20]
        ],
        notionUrl: "https://otheretc.notion.site/MyLIO-16c41e6afd5780f4ac3aeb14e5230ab6",
        gitUrl: ["NONE", "https://github.com/BlueSeekers/MyLittleOcean_Backend"],
        imgUrl: blue_0,
        projSize: ProjSize.side,
        projPtc: ProjPtc.TEAM
    },
    {
        key: 4,
        projName: "좀비,펑펑!화르륵",
        projDesc: "수박게임 스타일의 2D 퍼즐 게임, 기획팀과 협업한 모바일 캐주얼 퍼즐 UNITY 프로젝트",
        projTag: ["2D", "협약 프로젝트", "캐주얼", "퍼즐"],
        startDate: "2024.11.01",
        endDate: "2024.12.27",
        projSkills: [
            skills[18], skills[13], skills[16], skills[20], skills[19], skills[8], skills[3]
        ],
        notionUrl: "https://tourmaline-tugboat-5d2.notion.site/118b84bb5ebe8023b0cfd3a25485e101",
        gitUrl: ["https://github.com/Team-AlphaNo/ZombieBoom", "https://github.com/Team-AlphaNo/Zombie_Back"],
        imgUrl: zphImg,
        projSize: ProjSize.side,
        projPtc: ProjPtc.TEAM
    },
    {
        key: 3,
        projName: "SORI",
        projDesc: "3D 창작 2인 프로젝트",
        projTag: ["3D", "Team", "2인", "창작", "캐주얼", "퍼즐", "아케이드"],
        startDate: "2024.08.28",
        endDate: "2024.10.04",
        projSkills: [
            skills[18]
        ],
        gitUrl: ["https://github.com/Yogurtsharbet/SORI"],
        notionUrl: "https://tourmaline-tugboat-5d2.notion.site/SORI-1903aa91e2794f73b17aff5105dcccb4",
        youtubeUrl: "https://youtu.be/GxtldlEV7vo",
        imgUrl: sori_0,
        projSize: ProjSize.side,
        projPtc: ProjPtc.TEAM
    },
    {
        key: 2,
        projName: "NEKO PARK",
        projDesc: "PICO PARK 모작",
        projTag: ["2D", "Team", "4인", "퍼즐", "네트워크"],
        startDate: "2024.08.12",
        endDate: "2024.08.19",
        projSkills: [
            skills[18], skills[13], skills[19]
        ],
        gitUrl: ["https://github.com/KY00JSSH/NEKOPARK"],
        youtubeUrl: "https://www.youtube.com/watch?v=HEH-BjvP_3g&feature=youtu.be",
        imgUrl: nekoparkImg,
        projSize: ProjSize.toy,
        projPtc: ProjPtc.TEAM
    },
    {
        key: 1,
        projName: "TheWildFour",
        projDesc: "TheWildEight 모작",
        projTag: ["3D", "Team", "4인", "생존", "어드벤처",],
        startDate: "2024.07.08",
        endDate: "2024.07.31",
        projSkills: [
            skills[18]
        ],
        gitUrl: ["https://github.com/KY00JSSH/TheWildFour"],
        notionUrl: "https://tourmaline-tugboat-5d2.notion.site/The-Wild-Four-18e102a9da304b0d967cd2f5b5b84efa",
        youtubeUrl: "http://youtube.com/watch?v=buZiRSoVNWw&feature=youtu.be",
        imgUrl: twf_0,
        projSize: ProjSize?.side,
        projPtc: ProjPtc.TEAM
    },
    {
        key: 0,
        projName: "PaperPlease",
        projDesc: "PaperPlease 모작. 문화어 ver.",
        projTag: ["2D", "1인", "퍼즐", "여권 내라우!"],
        startDate: "2024.06.13",
        endDate: "2024.06.24",
        projSkills: [
            skills[18]
        ],
        gitUrl: ["https://github.com/Nuuuing/paperPlease"],
        youtubeUrl: "https://www.youtube.com/watch?v=s95nBAnZJdo",
        imgUrl: paperPleaseImg,
        projSize: ProjSize.side,
        projPtc: ProjPtc.SOLO
    }
]

export const projectDetailData: projDetailT[] = [
    {
        key: 5,
        projName: "MyLIO_나의작은바다",
        projTag: ["3D", "캐주얼", "퍼즐"],
        startDate: "2024.01",
        endDate: " 2025.03 ",
        projSkills: [
            skills[18], skills[21], skills[13], skills[19], skills[15], skills[20]
        ],
        notionUrl: "https://otheretc.notion.site/MyLIO-16c41e6afd5780f4ac3aeb14e5230ab6",
        gitUrl: ["NONE", "https://github.com/BlueSeekers/MyLittleOcean_Backend"],
        imgUrl: [blue_0, blue_1],
        projSize: ProjSize.side,
        projPtc: ProjPtc.TEAM,
        projDescDetail: "overview text",
        roles: [
            {
                imgUrl: prepImg,
                midTitle: "ATEST",
                contents: "ATEST"
            }
        ],
        contents: [
            {
                imgUrl: prepImg,
                midTitle: "ATEST",
                contents: "ATEST"
            }
        ]
    },
    {
        key: 4,
        projName: "좀비,펑펑!화르륵",
        projDesc: "수박게임 스타일의 2D 퍼즐 게임, 기획팀과 협업한 모바일 캐주얼 퍼즐 UNITY 프로젝트",
        projTag: ["2D", "협약 프로젝트", "캐주얼", "퍼즐"],
        startDate: "2024.11.01",
        endDate: "2024.12.27",
        projSkills: [
            skills[18], skills[13], skills[16], skills[20], skills[19], skills[8], skills[3]
        ],
        notionUrl: "https://tourmaline-tugboat-5d2.notion.site/118b84bb5ebe8023b0cfd3a25485e101",
        gitUrl: ["https://github.com/Team-AlphaNo/ZombieBoom", "https://github.com/Team-AlphaNo/Zombie_Back"],
        imgUrl: [zphImg, zphImg2],
        projSize: ProjSize.side,
        projPtc: ProjPtc.TEAM,
        projDescDetail: "overview text",
        roles: [
            {
                imgUrl: zphImg4,
                midTitle: "Block 충돌 및 상호작용 시스템 설계",
                contents: "프로젝트 내에서 Block들은 **공통된 Block Class**를 기반으로 각기 **고유한 속성**을 가지며, 블록 간 **충돌 시 정의된 반응이 동작하도록 설계**하였습니다. \n충돌 처리의 효율성과 관리 편의성을 위해 **Layer 기반 충돌 시스템을 적용**하여, 동일한 Layer에 속하는 Block 간에만 상호작용이 발생하도록 적용하였습니다. 충돌이 발생할 경우, Block은 상대 Block의 Tag 정보를 기반으로 상황에 맞는 반응 로직을 수행합니다. \n 예를 들어 불 속성 Block이 나무 Tag를 가진 Block과 충돌할 경우, 연소 이펙트를 재생한 뒤 파티클 재생 완료 시 해당 Block을 비활성화하고 Block Manager를 통해 메모리에서 반환 처리합니다. 물 속성 Block이 나무 또는 가폭 속성 Block과 충돌할 경우, 대상 Block의 속성을 제거하는 방식으로 상태를 변경합니다. 이때 속성 제거 여부는 BlockClass 내 속성값을 검사하여 판별합니다.\n또한, **동일한 속성의 Block끼리 충돌하는 경우, 두 Block은 통합되어 더 큰 Block으로 교체**되며, 기존 Block들은 반환 처리됩니다.\n이러한 방식으로 충돌 반응 로직을 구성하여 다양한 속성 간 조합을 유연하게 처리할 수 있으며, 추가적인 속성 및 반응을 손쉽게 확장할 수 있도록 시스템을 구성하였습니다."
            },
            {
                midTitle: "플랫폼 물리 상호작용",
                contents: "전기 원소 Block은 물 속성 Block과 충돌할 경우, Block들이 쌓여있는 **Platform에 물리적 반응을 적용**하여 **순간적으로 회전하며 튀어오르는 효과**를 구현하였습니다. 이를 위해 Unity의 **Physics2D 엔진의 AddTorque 메서드**로 회전 모멘텀을 부여하고, 충돌 지점을 기준으로 좌우 회전 방향을 결정하여 시각적인 피드백을 강화하였습니다.충돌에 영향을 받는 다른 Block들은 일시적으로 상호작용 무적 상태로 전환되어, 물리 연산 중 추가 충돌이나 상호작용이 발생하지 않도록 안정성을 확보하였습니다. 무적 상태 전환은 Block 매니저의 상태 제어 로직을 통해 관리하였습니다. 이를 통해 **Physics2D, AddTorque, 충돌 좌표 판별, 상태 제어 로직** 등 여러 시스템을 조합하여 물리 기반의 연출과 상호작용을 구현할 수 있었습니다."
            },
            {
                imgUrl: zphImg3,
                midTitle: "GPGS 기반 Google 로그인 시스템 구현",
                contents: "Google Play Store Plugin을 활용하여 **Google Play Games Services(GPGS) 기반의 OAuth 2.0 인증 시스템**을 구축하였습니다. 이를 통해 사용자는 별도의 회원가입 과정 없이 Google 계정을 이용하여 간편하게 로그인할 수 있도록 구현하였습니다. GPGS는 기본적으로 클라우드 세이브 기능을 제공하지만, 게임 데이터의 확장성과 안정적인 관리, 서버 기반 동기화를 위해 **별도의 백엔드 데이터베이스를 설계 및 연동**하였습니다. 사용자 로그인 시 아이디, UUID를 통해 사용자 계정을 매핑하고, **게임 내 진행 상태, 인벤토리, 재화 등의 데이터를 서버에서 관리**하도록 구성하였습니다."
            },
            {
                midTitle: "Addressable Assets 기반의 리소스 관리 시스템 구축",
                contents: "Unity의 **Addressable Assets System**을 도입함으로써 **초기 빌드 크기를 최소화**하고, 런타임 중 필요한 리소스만 On-Demand 방식으로 로드하여 **메모리 사용량 최적화 및 로딩 시간을 단축**하였습니다. 또한 리소스 배포 서버로 **Apache HTTP Server 기반의 CDN 형태의 스토리지 서버**를 구축하였습니다. Apache를 통해 **다양한 플랫폼**에서 안정적으로 Addressable Catalog 및 Asset Bundle을 다운로드 받을 수 있도록 구성하였습니다.\n"
            },
            {
                imgUrl: zphImg1,
                midTitle: "AWS 기반 클라우드 백엔드 인프라 구축",
                contents: "**AWS 클라우드 환경**에서 백엔드 인프라를 설계하고 구축하였습니다. **EC2 인스턴스**를 활용하여 서버 환경을 구성하고, **탄력적 IP(Elastic IP)를 할당**하여 외부에서 접근 가능한 고정 IP를 확보한 뒤, 별도로 구매한 도메인과 연결하여 서비스 도메인 구성을 하였습니다.\n애플리케이션 서버는 **Docker**를 활용하여 **컨테이너 기반**으로 구축하였으며, Spring Boot 기반의 **RESTful API 서버**를 개발하여 **사용자 인증, 데이터 처리, 비즈니스 로직**을 안정적으로 처리하도록 구현하였습니다. **Docker Compose**를 활용하여 **Apache, Nginx, Spring Boot API, MariaDB 등을 각각 독립적인 컨테이너로 분리**하고, 관리 효율성을 향상시켰습니다."
            }
        ]
    },
    {
        key: 3,
        projName: "SORI",
        projDesc: "3D 창작 2인 프로젝트",
        projTag: ["3D", "Team", "2인", "창작", "캐주얼", "퍼즐", "아케이드"],
        startDate: "2024.08.28",
        endDate: "2024.10.04",
        projSkills: [
            skills[18]
        ],
        gitUrl: ["https://github.com/Yogurtsharbet/SORI"],
        notionUrl: "https://tourmaline-tugboat-5d2.notion.site/SORI-1903aa91e2794f73b17aff5105dcccb4",
        youtubeUrl: "https://youtu.be/GxtldlEV7vo",
        imgUrl: [sori_0, sori_1, sori_2],
        projSize: ProjSize.side,
        projPtc: ProjPtc.TEAM,
        projDescDetail: "overview text",
        roles: [
            {
                imgUrl: prepImg,
                midTitle: "ATEST",
                contents: "ATEST"
            }
        ],
        contents: [
            {
                imgUrl: prepImg,
                midTitle: "ATEST",
                contents: "ATEST"
            }
        ]
    },
    {
        key: 2,
        projName: "NEKO PARK",
        projDesc: "PICO PARK 모작",
        projTag: ["2D", "Team", "4인", "퍼즐", "네트워크"],
        startDate: "2024.08.12",
        endDate: "2024.08.19",
        projSkills: [
            skills[18], skills[13], skills[19]
        ],
        gitUrl: ["https://github.com/KY00JSSH/NEKOPARK"],
        youtubeUrl: "https://www.youtube.com/watch?v=HEH-BjvP_3g&feature=youtu.be",
        imgUrl: [nekoparkImg],
        projSize: ProjSize.toy,
        projPtc: ProjPtc.TEAM,
        projDescDetail: "overview text",
        roles: [
            {
                imgUrl: prepImg,
                midTitle: "ATEST",
                contents: "ATEST"
            }
        ],
        contents: [
            {
                imgUrl: prepImg,
                midTitle: "ATEST",
                contents: "ATEST"
            }
        ]
    },
    {
        key: 1,
        projName: "TheWildFour",
        projDesc: "TheWildEight 모작",
        projTag: ["3D", "Team", "4인", "생존", "어드벤처",],
        startDate: "2024.07.08",
        endDate: "2024.07.31",
        projSkills: [
            skills[18]
        ],
        gitUrl: ["https://github.com/KY00JSSH/TheWildFour"],
        notionUrl: "https://tourmaline-tugboat-5d2.notion.site/The-Wild-Four-18e102a9da304b0d967cd2f5b5b84efa",
        youtubeUrl: "http://youtube.com/watch?v=buZiRSoVNWw&feature=youtu.be",
        imgUrl: [twf_0, twf_1, twf_2],
        projSize: ProjSize?.side,
        projPtc: ProjPtc.TEAM,
        projDescDetail: "overview text",
        roles: [
            {
                imgUrl: prepImg,
                midTitle: "ATEST",
                contents: "ATEST"
            }
        ],
        contents: [
            {
                imgUrl: prepImg,
                midTitle: "ATEST",
                contents: "ATEST"
            }
        ]
    },
    {
        key: 0,
        projName: "PaperPlease",
        projDesc: "PaperPlease 모작. 문화어 ver.",
        projTag: ["2D", "1인", "퍼즐", "여권 내라우!"],
        startDate: "2024.06.13",
        endDate: "2024.06.24",
        projSkills: [
            skills[18]
        ],
        gitUrl: ["https://github.com/Nuuuing/paperPlease"],
        youtubeUrl: "https://www.youtube.com/watch?v=s95nBAnZJdo",
        imgUrl: [paperPleaseImg],
        projSize: ProjSize.side,
        projPtc: ProjPtc.SOLO,
        projDescDetail: "overview text",
        roles: [
            {
                imgUrl: prepImg,
                midTitle: "ATEST",
                contents: "ATEST"
            }
        ],
        contents: [
            {
                imgUrl: prepImg,
                midTitle: "ATEST",
                contents: "ATEST"
            }
        ]
    }
]