import { skills } from "../common";
import { projDetailT, projectT, ProjSize, ProjType } from "./project.types";

// import prep from 'src/assets/img/projImg/preparing.png';

//blue
import blue from 'src/assets/img/projImg/blue_0.png';
import blue1 from 'src/assets/img/projImg/blue_1.png';
//zombie
import zphImg from 'src/assets/img/projImg/zph.png';
import zphImg1 from 'src/assets/img/projImg/zph_1.png';
import zphImg2 from 'src/assets/img/projImg/zph_2.png';
//sori
import sori_0 from 'src/assets/img/projImg/sori_0.png';
import sori_1 from 'src/assets/img/projImg/sori_1.png';
import sori_2 from 'src/assets/img/projImg/sori_2.png';
//nekopark
import nekoparkImg from 'src/assets/img/projImg/nekopark.png';
//wildeight
import twf_0 from 'src/assets/img/projImg/twf_0.png';
import twf_1 from 'src/assets/img/projImg/twf_1.png';
import twf_2 from 'src/assets/img/projImg/twf_2.png';
//pp
import paperPleaseImg from 'src/assets/img/projImg/pp.png';

export const projectData: projectT[] = [
    {
        key: 5,
        projName: "MyLIO_나의작은바다",
        projTag: ["3D", "캐주얼", "퍼즐", "미니게임"],
        startDate: "2024.01",
        endDate: " ing ",
        projSkills: [
            skills[18], skills[21], skills[13], skills[19], skills[15], skills[20]
        ],
        notionUrl: "https://otheretc.notion.site/MyLIO-16c41e6afd5780f4ac3aeb14e5230ab6",
        gitUrl: ["NONE", "https://github.com/BlueSeekers/MyLittleOcean_Backend"],
        imgUrl: blue,
        mainYn: true,
        projSize: ProjSize?.side
    },
    {
        key: 4,
        projName: "좀비,펑펑!화르륵",
        projContents: "기획 협업 진행 프로젝트",
        projTag: ["2D", "협약 프로젝트", "캐주얼", "퍼즐"],
        startDate: "2024.11.01",
        endDate: "2024.12.27",
        projSkills: [
            skills[18], skills[13], skills[16], skills[20], skills[19], skills[8], skills[3]
        ],
        notionUrl: "https://tourmaline-tugboat-5d2.notion.site/118b84bb5ebe8023b0cfd3a25485e101",
        gitUrl: ["https://github.com/Team-AlphaNo/ZombieBoom", "https://github.com/Team-AlphaNo/Zombie_Back"],
        imgUrl: zphImg,
        mainYn: true,
        projSize: ProjSize?.side
    },
    {
        key: 3,
        projName: "SORI",
        projContents: "3D 창작 2인 프로젝트",
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
        mainYn: true,
        projSize: ProjSize?.side
    },
    {
        key: 2,
        projName: "NEKO PARK",
        projContents: "PICO PARK 모작",
        projTag: ["2D", "Team", "4인", "퍼즐", "네트워크"],
        startDate: "2024.08.12",
        endDate: "2024.08.19",
        projSkills: [
            skills[18], skills[13], skills[19]
        ],
        gitUrl: ["https://github.com/KY00JSSH/NEKOPARK"],
        youtubeUrl: "https://www.youtube.com/watch?v=HEH-BjvP_3g&feature=youtu.be",
        imgUrl: nekoparkImg,
        mainYn: true,
        projSize: ProjSize?.toy
    },
    {
        key: 1,
        projName: "TheWildFour",
        projContents: "TheWildEight 모작",
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
        mainYn: false,
        projSize: ProjSize?.side
    },
    {
        key: 0,
        projName: "PaperPlease",
        projContents: "PaperPlease 모작. 문화어 ver.",
        projTag: ["2D", "1인", "퍼즐", "여권 내라우!"],
        startDate: "2024.06.13",
        endDate: "2024.06.24",
        projSkills: [
            skills[18]
        ],
        gitUrl: ["https://github.com/Nuuuing/paperPlease"],
        youtubeUrl: "https://www.youtube.com/watch?v=s95nBAnZJdo",
        imgUrl: paperPleaseImg,
        mainYn: false,
        projSize: ProjSize?.side
    }
]

export const projDetailData: projDetailT[] = [
    {
        key: 5,
        projName: "MyLIO_나의작은바다",
        projContents: ["개발 9인 (시스템 4인, 게임 5인)", "　",
            "바다 속을 컨셉으로 여러 미니게임을 이용할 수 있는 파티 게임입니다", "　",
            "[담당 기능]",
            "- 서버 및 시스템 총괄",
            "- 전체 아키텍처 및 DB 설계, 구성",
            "- GitAction CI/CD 파이프라인 설정",
            "- ASP.NET Core + RestAPI 개발",
            "- API : 전체 구조 및 프로젝트 세팅, Logging 설정",
            "- API : JWT Authorization 설정",
            "- Docker, DockerCompose, AWS 구성"],
        projTag: ["3D", "캐주얼", "퍼즐", "미니게임"],
        startDate: "2024.01",
        endDate: " ing ",
        projSkills: [
            skills[18], skills[21], skills[13], skills[19], skills[15], skills[20]
        ],
        notionUrl: "https://otheretc.notion.site/MyLIO-16c41e6afd5780f4ac3aeb14e5230ab6",
        gitUrl: ["NONE", "https://github.com/BlueSeekers/MyLittleOcean_Backend"],
        imgUrl: [blue , blue1],
        projType: ProjType.game,
        subTitle: "모바일 미니게임",
        projSize: ProjSize.side
    },
    {
        key: 4,
        projName: "좀비,펑펑!화르륵",
        projContents: ["개발 4인, 기획 3인", "　",
            "2D 캐주얼/퍼즐 게임으로 ‘수박게임’을 모티브로 각 속성을 가지는 블럭 오브젝트의 충돌 상호작용하는 게임입니다.", "　",
            "[담당 기능]",
            "- 전체 아키텍처 및 DB 설계, 구성",
            "- 게임 내 오브젝트 상호작용 개발",
            "- SpringBoot + RestAPI",
            "- API : LOGIN (게스트 로그인, GPGS 로그인 연동, 유저 데이터, 로그아웃)",
            "- API : 상점 (상점 목록, 구매 처리, Google 인앱결제 영수증 처리, 아이템 관련)",
            "- API : 랭킹 (일, 월, 전체 랭킹 목록 및 My 랭킹, 점수 저장)",
            "- Apache + AddressableAssets 세팅",
            "- Nginx, React.js : 관리자 페이지 개발",
            "- Docker, DockerCompose, AWS 구성"],
        projTag: ["2D", "협약 프로젝트", "캐주얼", "퍼즐"],
        startDate: "2024.11.01",
        endDate: "2024.12.27",
        projSkills: [
            skills[18], skills[13], skills[16], skills[20], skills[19], skills[8], skills[3]
        ],
        notionUrl: "https://tourmaline-tugboat-5d2.notion.site/118b84bb5ebe8023b0cfd3a25485e101",
        gitUrl: ["https://github.com/Team-AlphaNo/ZombieBoom", "https://github.com/Team-AlphaNo/Zombie_Back"],
        imgUrl: [zphImg, zphImg1, zphImg2],
        projType: ProjType.game,
        subTitle: "기획 협업 진행 프로젝트",
        projSize: ProjSize.side
    },
    {
        key: 3,
        projName: "SORI",
        projContents: ["Team SORI (김수진, 전홍현)", "　", "SORI는 2인 창작 퍼즐/액션 아케이드 게임입니다.",
            "핵심 시스템인 단어를 조합하여 문장을 구성해 다양한 상호작용을 통해 게임을 클리어합니다.", "　",
            "[담당 기능]",
            "- ProBuilder를 통해 지형 구성 및 PolyBrush로 세부묘사 및 오브젝트 배치", "- 문장 보관함 및 단어 인벤토리 풀링", "- UI 디자인 및 UI/UX", "- EventSystem",
            "- 상점 상호작용 (특정 범위 상호작용 및 구매처리)", "- 공통 Dialog, 비동기 로딩 Scene 전환"],
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
        projType: ProjType.game,
        youtubeId: "GxtldlEV7vo",
        projSize: ProjSize.side
    },
    {
        key: 2,
        projName: "NEKO PARK",
        projContents: ["4인 Team (전홍현, 박지훈, 김수진, 김수주)", "　", "퍼즐,협동 게임인 PICO PARK를 모작한 프로젝트 입니다.",
            "최대 8명의 플레이어가 협력하여 각 레벨을 해결하는 방식으로 퍼즐을 풀며 진행합니다.", "　",
            "[담당 기능]", "- 유저 정보 DB에 저장 및 로그인처리", "- Local Data. Json 관리", "- TCP - CLIENT 방목록 통신"],
        projTag: ["2D", "Team", "4인", "퍼즐", "네트워크"],
        startDate: "2024.08.12",
        endDate: "2024.08.19",
        projSkills: [
            skills[18], skills[13], skills[19]
        ],
        gitUrl: ["https://github.com/KY00JSSH/NEKOPARK"],
        youtubeUrl: "https://www.youtube.com/watch?v=HEH-BjvP_3g&feature=youtu.be",
        imgUrl: [nekoparkImg],
        projType: ProjType.game,
        youtubeId: "HEH-BjvP_3g",
        projSize: ProjSize.toy
    },
    {
        key: 1,
        projName: "TheWildFour",
        projContents: ["4인 Team (전홍현, 박지훈, 김수진, 김수주)", "　", "생존/어드벤처 게임인 The Wild Eight을 모작한 프로젝트 입니다.",
            "다양한 특성의 캐릭터를 선택하여 자원을 수집, 제작하는 등 다양한 방식으로 생존합니다.", "　",
            "[담당 기능]",
            "- Json Data. Object Prefab 좌표 생성", "- Map Object 상호작용 (체력에 따른 변형 및 아이템 드랍)", "- Item 구조 설계 및 상태 변경, 감지 및 줍기",
            "- Inventory 구조 설계 및 구현, Drag Drop"],
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
        projType: ProjType.game,
        youtubeId: "buZiRSoVNWw",
        projSize: ProjSize.side
    },
    {
        key: 0,
        projName: "PaperPlease",
        projContents: ["1인 프로젝트", "　", "퍼즐 게임인 Papers, Please를 모작한 프로젝트 입니다.",
            "여권과 신분증을 검토하여 진위 여부를 판단하고, 불법 입국자나 범죄자를 걸러내며 진행합니다.", "　", "[구현 기능]",
            "- Coroutine 시간 흐름", "- Sprite Drag&Drop", "- Json 정보 랜덤 정보 세팅", "- 결과 검증 및 처리"],
        projTag: ["2D", "1인", "퍼즐", "여권 내라우!"],
        startDate: "2024.06.13",
        endDate: "2024.06.24",
        projSkills: [
            skills[18]
        ],
        gitUrl: ["https://github.com/Nuuuing/paperPlease"],
        youtubeUrl: "https://www.youtube.com/watch?v=s95nBAnZJdo",
        imgUrl: [paperPleaseImg],
        projType: ProjType.game,
        youtubeId: "s95nBAnZJdo",
        projSize: ProjSize.side
    }
]