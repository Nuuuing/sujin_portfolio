import { projDetailT, projectT, ProjPtc, ProjSize } from "@/types";
import { skills } from "./common.data";

export const prepImg = `${process.env.BASE_PATH}/projImg/preparing.png`;

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
        key: 4,
        projName: "좀비,펑펑!화르륵",
        projDesc: "수박게임 스타일의 2D 퍼즐 게임, 기획팀과 협업한 모바일 캐주얼 퍼즐",
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
        projDesc: "PICO PARK 모작. 멀티플레이 퍼즐 게임",
        projTag: ["2D", "Team", "4인", "퍼즐", "네트워크"],
        startDate: "2024.08.12",
        endDate: "2024.08.19",
        projSkills: [
            skills[18], skills[13], skills[19], skills[22], skills[23]
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
        projDesc: "TheWildEight 모작. 생존 서바이벌 어드벤처 게임",
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
        projDesc: "PaperPlease 모작. 문화어 ver. 퍼즐 개인 프로젝트",
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
        projDescDetail: "본 프로젝트는 2D 캐주얼 퍼즐 게임 개발을 목표로 한 팀 프로젝트로, 초기에는 협약 기업과의 공동 개발 형태로 시작되었으나 기업의 사정으로 협약이 무산된 이후에도 팀원 주도로 끝까지 개발을 이어갔습니다.\n게임은 **‘수박게임’**을 모티브로 하여, 서로 다른 속성을 가진 블록 오브젝트들이 중력에 따라 쌓이고 충돌하며 상호작용하는 물리 기반 퍼즐 메커니즘을 중심으로 구성되었습니다. 각 속성 간의 상호작용 규칙을 통해 전략적인 플레이가 가능하며, 단순한 조작 속에서도 다양한 결과를 유도하는 재미를 목표로 개발되었습니다.",
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
        projDescDetail: "SORI는 2인이 협업하여 개발한 퍼즐/액션 아케이드 게임입니다. \n게임의 핵심 시스템은 단어를 조합해 문장을 구성하고, 이를 통해 다양한 상호작용을 유도하는 문장 기반 퍼즐 메커니즘에 있습니다. 플레이어는 단어를 전략적으로 배치하여 환경을 변화시키고, 퍼즐을 해결해 나가야 합니다.\n이 독창적인 시스템은 2D 퍼즐 게임 **“BABA IS YOU”**에서 모티브를 얻어 개발되었으며, 단순한 조작 속에서도 창의적인 사고와 논리적 조합을 요구하는 퍼즐 설계가 특징입니다.SORI는 단어의 의미와 배치를 통해 게임 세계를 변화시키는 새로운 방식의 상호작용을 제시하며, 색다른 퍼즐 경험을 제공합니다.",
        roles: [
            {
                midTitle: "GameMap 구성",
                contents: "Main Stage는 여러 개의 소규모 지형으로 구성되어 있으며, 미리 제작된 Texture Material을 효과적으로 활용해야 했기 때문에 Mesh 기반 지형 제작 방식을 채택하였습니다. 이를 위해 **ProBuilder**를 활용하여 **UV Mapping**을 손쉽게 조정할 수 있는 기반을 마련하고, 효율적인 레벨 디자인을 구현하였습니다.\n또한, 지형의 디테일을 높이고 나무 오브젝트의 랜덤 배치, 자연스러운 표면 묘사 등을 위해 **PolyBrush**를 함께 사용하였습니다. PolyBrush를 통해 각 지형의 질감을 다채롭게 표현하고, 반복적인 수작업 없이 자연스러운 배경 구성과 다양성 확보가 가능하도록 구현하였습니다."
            },
            {
                midTitle: "UI/UX 디자인 및 구현",
                contents: "게임 전체의 UI/UX를 직접 설계하고 구현하였습니다. 단순한 정보 전달을 넘어, 사용자 경험(UX)을 고려한 **직관적인 시각적 구성과 상호작용 흐름 설계**에 중점을 두었습니다.\n\n**1.문장 틀 활성 상태 표시 (Sentence Slot Status UI)**\n현재 활성화된 문장 틀의 개수를 보여주는 버튼을 설계하고, 마우스 오버 시 문장 틀 목록이 자연스럽게 펼쳐지는 **슬라이딩 인터랙션**을 구현하였습니다. 해당 인터랙션은 Unity의 **OnPointerEnter() 이벤트**를 활용하였으며, **DoTween**을 통해 간단하고 효율적인 애니메이션 효과를 적용하였습니다.\n\n**2. 플레이어 상태 표시 (Player Status UI)**\n플레이어의 **체력(HP)** 및 **게임 내 재화(StarCoin)**를 실시간으로 확인할 수 있도록 HUD를 구성하였습니다. 변화가 생길 때마다 **즉각적인 시각적 반응과 애니메이션**을 통해 게임의 몰입도와 정보 전달력을 높였습니다.\n\n**3. 퀘스트 라벨 (Quest Label UI)**\n현재 진행 중인 퀘스트 정보를 화면 상단에 고정 배치하여 사용자가 명확한 목표를 지속적으로 인지할 수 있도록 하였습니다. 퀘스트의 진행 상황에 따라 **텍스트 및 색상 변화**가 적용되며, UX 관점에서 일관성 있는 피드백을 제공하도록 설계하였습니다."
            },
            {
                midTitle: "문장 틀 목록 - Object Pooling",
                contents: "Player가 보유 중인 **문장 틀 목록**은 **Object Pooling** 방식으로 관리하였습니다. 미리 생성된 오브젝트를 재사용함으로써 **메모리 사용을 최소화**하고, **실행 중 성능을 향상**시킬 수 있도록 구현하였습니다.\n\n목록은 **화면에 보이는 범위(Position)** 내의 오브젝트만 활성화되며, **Mouse Wheel 또는 Scroll Drag**를 통해 스크롤이 가능합니다. 스크롤 애니메이션은 **DoTween**을 활용하여 부드럽고 자연스럽게 처리하였습니다.\n\n또한, 상단의 버튼을 통해 **문장 틀 목록 정렬 기능**을 제공하였으며, .NET의 **Sort() Method** 를 활용해 정렬 성능을 최적화하였습니다.\n.NET의 Sort 메서드는 다음과 같은 알고리즘을 자동 선택합니다.\n • 요소가 16개 미만일 경우: **삽입 정렬 (Insertion Sort)**\n • 요소 수 N일 때, N * logN^2 이상이면: **힙 정렬 (Heap Sort)**\n • 그 외 대부분의 경우: **퀵 정렬 (Quick Sort)**\n\n이러한 방식으로 성능과 사용성을 동시에 고려한 **문장 목록 UI 시스템**을 구현하였습니다."
            },
            {
                midTitle: "New Input System 적용",
                contents: "UI 내 조작과 플레이어 이동 모두에 **Unity의 New Input System**을 적용하여 상호작용이 가능하도록 구현하였습니다.\n\n기존의 **Input Manager**는 키 설정이 고정되어 있고, 플랫폼 간 입력 대응에 제약이 있었던 반면, **New Input System**은 다양한 입력 장치(키보드, 게임패드, 터치 등)를 유연하게 지원하며, **이벤트 기반 입력 처리**가 가능하다는 장점이 있습니다.\n\n이를 통해 **여러 입력 장치를 동시에 처리**하고, **플랫폼별 키 바인딩을 동적으로 변경**할 수 있도록 구성하여, 크로스플랫폼 환경에서도 안정적이고 확장성 있는 입력 시스템을 구현할 수 있었습니다."
            },
            {
                midTitle: "옵션 설정 및 ScriptableObject 활용",
                contents: "해상도는 **Enum**으로 정의한 값을 기반으로, 각각을 `(int, int)` 형태의 해상도 값으로 **캐스팅(Casting)** 하여 처리하였습니다.\n\n**VSync** 설정은 `QualitySettings.vSyncCount`를 통해 제어하였으며, 이는 화면의 **티어링 현상(찢김 현상)**을 방지하기 위해 **프레임을 모니터 주사율에 맞춰 동기화**하는 기능입니다.\n\nUI 크기 설정은 `CanvasScaler` 컴포넌트의 **scaleFactor** 속성을 활용하여, 해상도나 화면 비율에 따라 적절한 UI 비율이 유지되도록 구현하였습니다.\n\n이러한 각종 옵션 값들은 모두 **ScriptableObject**에 캐싱하여 관리하였습니다. ScriptableObject는 **씬(Scene) 간 독립적인 데이터 객체**로, 메모리에 직접 저장되어 **씬 전환 시에도 데이터가 유지**되는 장점이 있어 설정 값을 안정적으로 유지하는 데 유용하게 활용하였습니다."
            },
            {
                midTitle: "단어 인벤토리 시스템",
                contents: "인벤토리는 **UI**와 **실제 데이터**를 분리하여 구성하였으며, **Observer Pattern**을 활용하여 설계하였습니다.\n\n각 인벤토리 슬롯 오브젝트(UI)는 Manager 클래스가 관리하는 **단어 데이터 리스트를 구독**하고 있으며, 데이터가 변경되면 **이벤트(Event)를 통해 UI가 자동으로 업데이트**되도록 구현하였습니다.\n\n이처럼 Observer Pattern을 사용하면 **데이터 처리 로직과 UI 간 결합도를 낮출 수 있어**, 두 영역을 명확하게 분리할 수 있으며, **유지보수와 확장성 측면에서도 유리**합니다."
            },
            {
                midTitle: "상점 상호작용 시스템",
                contents: "상점은 **OnTriggerStay()** 메서드를 활용하여, Player가 상점의 **Collider 범위 내에 머무는 동안 상호작용 UI**가 표시되도록 구현하였습니다.\n\nPlayer가 움직이더라도, **OnTriggerStay를 통해 상호작용 아이콘의 위치를 Player의 현재 위치에 맞춰 실시간으로 업데이트**하였습니다. 반대로, Player가 Collider 범위를 벗어나면 **OnTriggerExit()**을 통해 UI가 사라지도록 처리하여, 상호작용 가능 여부를 명확히 구분하였습니다.\n\n이를 통해 Player가 **상점 근처에 있을 때만 상호작용이 가능하도록 제어**하였으며, 상호작용 흐름이 자연스럽게 연결되는 **동적 UI 표시 시스템**을 구축하였습니다."
            },
            {
                midTitle: "공통 Dialog 시스템",
                contents: "게임 내에서 사용하는 **Dialog UI**는 여러 Scene에서 공통으로 사용되며, 어디서든 접근이 가능해야 하기 때문에 **Singleton Pattern**을 적용하여 개발하였습니다.\n\n하나의 인스턴스만 유지함으로써 **매번 객체를 새로 생성하는 데 따른 리소스 낭비와 메모리 중복 사용을 방지**하였고, 효율적인 자원 관리를 실현하였습니다.\n\nDialog는 **Enum 값**에 따라 **Normal, Error, Success** 등의 상태를 구분하고, 이에 맞춰 **UI 색상이 동적으로 변경**되도록 구성하였습니다.\n\n또한, **Method Overloading**을 통해 사용자의 확인을 받는 **확인형(Confirm) Dialog**와, **일정 시간이 지나면 자동으로 사라지는 정보형 Dialog**를 상황에 맞게 호출할 수 있도록 설계하여 **다양한 UX 시나리오에 대응 가능하도록 구현**하였습니다."
            },
            {
                midTitle: "비동기 Scene 전환",
                contents: "각 게임 Scene 전환 시 **비동기(Asynchronous) Loading**을 사용하여 로딩 과정을 구현하였습니다.\n\n필요한 리소스를 한 번에 모두 불러올 경우, **CPU 및 메모리 자원이 급격히 사용되면서 게임이 일시적으로 멈추거나 Frame Drop**이 발생할 수 있습니다.\n\n이를 방지하기 위해 **비동기 방식으로 Scene을 백그라운드에서 로드**하고, 로딩이 완료되기 전까지는 Player가 **다른 화면을 보거나 제한된 상호작용을 할 수 있도록 구성**하였습니다.\n\n이러한 방식은 **로딩 중에도 끊김 없이 부드러운 플레이 환경**을 유지할 수 있게 하며, UX 측면에서도 더욱 자연스러운 Scene 전환을 제공할 수 있도록 도와줍니다."
            }
        ]
    },
    {
        key: 2,
        projName: "NEKO PARK",
        projDesc: "PICO PARK 1 모작. 네트워크 멀티플레이 퍼즐 게임",
        projTag: ["2D", "Team", "4인", "퍼즐", "네트워크"],
        startDate: "2024.08.12",
        endDate: "2024.08.19",
        projSkills: [
            skills[18], skills[13], skills[19], skills[22], skills[23]
        ],
        gitUrl: ["https://github.com/KY00JSSH/NEKOPARK"],
        youtubeUrl: "https://www.youtube.com/watch?v=HEH-BjvP_3g&feature=youtu.be",
        imgUrl: [nekoparkImg],
        projSize: ProjSize.toy,
        projPtc: ProjPtc.TEAM,
        projDescDetail: "NekoPark는 협력 기반 퍼즐 게임 **PicoPark를 모티브**로 한 멀티플레이어 퍼즐 게임입니다. 최대 8명의 플레이어가 함께 협력하여 다양한 퍼즐을 해결하고, 문을 열어 다음 레벨로 진행하는 방식으로 게임이 전개됩니다. **4명이 팀**을 이루어 개발하였으며, **로컬 및 온라인 멀티플레이를 모두 지원**합니다.온라인 멀티플레이는 **TCP 서버**를 이용해 방 목록을 관리하고, **Mirror 네트워크 라이브러리**를 활용해 플레이어 간의 실시간 통신을 구현하였습니다.",
        roles: [
            {
                midTitle: "로컬 사용자 클리어 데이터 관리",
                contents: "**Local Play 모드**에서는 사용자가 클리어한 Stage와 그에 인접한 Stage의 버튼만 **활성화(Interactable)**되도록 설정하였습니다.\n\n사용자의 클리어 데이터는 **JSON 파일**로 저장되며, 게임 시작 시 해당 데이터를 **역직렬화하여 Class 객체로 캐싱**합니다. 이를 통해 런타임 동안 빠르게 접근할 수 있도록 구성하였습니다.\n\n또한, Player가 Stage를 클리어하는 시점에 해당 상태를 **실시간으로 업데이트**하고, 변경된 데이터를 다시 **JSON 파일로 직렬화하여 저장**함으로써 로컬 저장 방식에서도 **진행도 관리가 안정적으로 유지**되도록 구현하였습니다."
            },
            {
                midTitle: "로그인 시스템 구현",
                contents: "**Online Mode**에서는 회원 정보를 기반으로 동작하기 때문에, 진입 시 **Player Info 객체가 null**인 경우 자동으로 **로그인 화면**을 표시하도록 구현하였습니다.\n\n사용자가 로그인 정보를 입력하고 로그인 시도를 하면, **DB에서 해당 ID의 사용자 정보를 조회**합니다. 아이디가 존재할 경우, **비밀번호가 일치하는지 검증**하고, 결과에 따라 **로그인 응답 상태를 Enum으로 분류**하여 처리합니다.\n\nID 또는 비밀번호 미입력, 존재하지 않는 사용자, 비밀번호 불일치 등의 경우에는 각각에 맞는 **에러 메시지 Dialog**를 출력하도록 구성하였습니다.\n\n정상적으로 로그인되면, 조회된 사용자 정보를 **Player Info 클래스 객체로 캐싱**하며, 해당 정보는 **어떤 Scene에서도 접근 가능해야 하므로 Singleton Pattern**을 적용하여 관리하였습니다."
            },
            {
                midTitle: "회원가입 시스템 구현",
                contents: "회원가입 시 사용자가 입력한 **ID는 DB에서 조회**하여 중복 여부를 검사합니다. 사용자 정보는 **User ID를 Primary Key로 사용하는 테이블**에 저장되며, **중복된 ID는 허용되지 않도록 설계**하였습니다.\n\n이미 존재하는 ID로 가입을 시도할 경우, **Enum으로 관리되는 에러 코드**를 기반으로 적절한 **에러 메시지 Dialog**를 출력하도록 구성하였습니다.\n\n새로운 ID이며, 비밀번호도 조건에 맞을 경우 해당 정보를 **DB에 저장**하고, 이후 **자동 로그인 처리**를 통해 **Player Info 클래스 객체로 임시 캐싱**하여 게임 내에서 사용자 정보를 활용할 수 있도록 구현하였습니다.\n\n비밀번호는 보안을 위해 **SHA-256 알고리즘을 사용하여 32바이트 해시 값으로 암호화**한 뒤 저장합니다. SHA-256은 **미국 국립표준기술연구소(NIST)**에서 공식 표준으로 채택된 알고리즘으로, 오랜 기간 안정성이 검증된 방식입니다."
            },
            {
                midTitle: "TCP 기반 게임방 서버 시스템",
                contents: "여러 Client가 동시에 방 목록을 요청하더라도 **안정적인 데이터 전송을 보장**하기 위해, 게임방 관련 서버는 **TCP 기반으로 구성**하였습니다.\n\nHost가 방을 생성하면, **설정한 방 정보와 접속 IP, Port 등의 정보를 TCP Server로 전달**하고, 서버는 이를 **방 목록 리스트에 캐싱**하여 관리합니다.\n\nClient가 **방 목록 UI를 열면**, TCP Server에 현재 생성된 방 리스트를 요청하고, 서버는 최신 방 정보를 **List 형태로 응답(Response)**합니다.\n\nClient가 특정 방에 입장하기 위해 **선택한 색상과 방 정보를 포함한 입장 요청(Request)**을 보내면, 서버는 해당 색상의 유효성과 입장 가능 여부를 판단하여, \n- 입장이 가능한 경우: **Host의 방 접속 정보(IP, Port 등)를 응답**하고\n- 불가능한 경우: **Enum으로 관리된 에러 코드**를 반환합니다.\n\n실제 게임 플레이에 사용되는 네트워크는 **Mirror Library**로 구현되어 있으며, Client는 서버로부터 받은 IP 정보를 **RoomManager의 NetworkAddress**에 설정함으로써 Host의 방에 입장하게 됩니다.\n\n이러한 구조는 **클라이언트 간 충돌 방지**, **실시간 방 생성 및 조회**, **유효성 검증 및 오류 대응 처리**를 안정적으로 처리할 수 있도록 설계되었습니다."
            }
        ]
    },
    {
        key: 1,
        projName: "TheWildFour",
        projDesc: "TheWildEight 모작. 생존 서바이벌 어드벤처 게임",
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
        projDescDetail: "The Wild Four는 **생존 어드벤처 게임 The Wild Eight을 모티브로 제작**된 **탐험 생존** 게임입니다.\n플레이어는 각기 다른 특성을 지닌 4명의 캐릭터 중 한 명을 선택하여, **위험한 환경 속에서 자원을 수집하고, 아이템을 제작**하며, 다양한 생존 전략을 통해 살아남아야 합니다.\n이 프로젝트는 4인이 협업하여 개발하였으며, 생존의 긴장감을 강조한 게임플레이가 특징입니다.",
        roles: [
            {
                midTitle: "Map 오브젝트 데이터 관리",
                contents: "게임 내 Map에 배치되는 **Object들은 항상 고정된 위치(Position)**에 생성되어야 하며, 이를 위해 각 오브젝트는 **JSON 형식의 데이터**로 정의됩니다.\n\n해당 JSON에는 **좌표값, 키(key), 타입(type), 체력(health), 상태(status)** 등의 속성이 포함되어 있으며, 이를 기반으로 오브젝트의 정보를 구성합니다. JSON 형식을 사용함으로써 **데이터 수정 및 추가가 간편**하며, **팀원 간 협업 시 데이터 공유와 관리가 용이**하여 개발 효율성을 높일 수 있습니다.\n\n게임이 시작될 때, 각 타입에 맞는 **Prefab을 자동으로 생성**하며, \n- **새 게임인 경우**: 사전에 설정된 기본 데이터를 기반으로 오브젝트를 생성하고\n- **저장된 데이터가 있는 경우**: 해당 데이터를 불러와 동일한 위치 및 상태로 재생성합니다.\n\n생성된 모든 오브젝트는 **Manager 클래스에서 List로 일괄 관리**되며, 이를 통해 전체 맵 오브젝트에 대한 효율적인 접근 및 상태 제어가 가능하도록 구성하였습니다."
            },
            {
                midTitle: "채집 시스템 및 오브젝트 파괴 처리",
                contents: "생성된 **Map Object**는 **Player의 공격을 받을 경우 피해(데미지)**를 입도록 구현하였습니다. 공격 상태의 Player 손에 부착된 **Collider가 Object의 Collider와 충돌**하면, 해당 오브젝트의 **체력이 감소**합니다.\n\n이때 Player의 **채집 특성(채집량 수치)**에 따라 **획득 아이템이 인벤토리에 추가**되며, 인벤토리가 가득 찼을 경우에는 아이템이 **필드에 Drop**되도록 처리하였습니다.\n\n오브젝트의 체력이 **0이 되면 상태가 즉시 변경**되며, \n- **나무(Tree)**: Coroutine을 통해 **쓰러지는 애니메이션 후 일정 시간 뒤 사라지며**, **Random 메서드**를 통해 계산된 아이템 뭉텅이를 필드에 Drop합니다.\n- **바위(Rock)**: 파괴된 **Model로 교체**되고, 마찬가지로 **Random 메서드**를 통해 아이템을 Drop합니다.\n\n이 과정에서 Coroutine을 활용함으로써 **Frame 속도에 영향을 주지 않고**, 일정 시간 후의 행동을 **비동기처럼 자연스럽게 처리**할 수 있도록 하여 게임 플레이 중 다른 동작과 병행될 수 있도록 최적화하였습니다."
            },
            {
                midTitle: "아이템 데이터 구조 및 관리",
                contents: "게임 내 아이템은 **ScriptableObject**를 기반으로 설계하였으며, **ItemData**를 기본 구조로 하여 각 아이템의 유형에 따라 **세분화된 구조로 상속 구현**하였습니다.\n\nScriptableObject를 활용함으로써 동일한 아이템에 대해 **불필요한 인스턴스를 반복 생성하지 않아도 되며**, 여러 아이템을 효율적으로 관리할 수 있습니다. 또한 데이터의 일관성을 유지함으로써 **게임 성능을 최적화하고, 개발 중 발생할 수 있는 실수를 줄이는 데 기여**하였습니다.\n\n**Item Class** 또한 **ItemData를 상속받는 구조**로 설계하되, ScriptableObject가 **정적 데이터 관리 용도**라면, Item Class는 Unity의 **LifeCycle에 포함되어 실제 게임 로직이 동작하는 동적 객체**입니다.\n\n이를 통해 각 아이템의 상태 및 기능을 실시간으로 관리할 수 있으며, 게임 내에서의 **사용자 상호작용 처리 및 상태 변화**를 담당하는 핵심 로직으로 활용되었습니다."
            },
            {
                midTitle: "아이템 상태 변경 시스템",
                contents: "아이템의 상태 변경은 크게 **자연 변화**와 **상호작용** 두 가지 경우로 나뉩니다.\n\n첫 번째는 **자체적으로 상태가 변화하는 경우**입니다. 예를 들어, **음식 아이템**은 생성되거나 **필드에서 습득된 순간부터 시간이 경과함에 따라 부패**가 진행됩니다. 각 음식 아이템은 **신선도 포인트(Freshness Point)**를 가지고 있으며, 해당 값에 따라 아이템의 상태가 **‘신선함’, ‘상함’, ‘썩음’** 등으로 변경됩니다. 이러한 상태는 모두 **Enum으로 관리**됩니다.\n\n두 번째는 **상호작용에 의한 상태 변화**입니다. 일부 음식 및 아이템은 **모닥불, 용광로(FireObject)** 등과 상호작용할 수 있으며, 일정 시간 동안 해당 오브젝트와 접촉하면 아이템의 상태가 변경됩니다. \n예를 들어, 음식이 일정 시간 이상 FireObject에 노출되면 **‘익음’ 상태로 전환**되며, 시간이 부족한 경우 상태 변화가 발생하지 않습니다.\n\n이러한 상태 변화는 모두 **Coroutine**을 사용해 구현하였으며, **매 프레임마다 신선도 포인트 또는 굽기 포인트를 업데이트**하고, 일정 기준에 도달할 경우 상태를 변경하도록 설계하였습니다."
            },
            {
                midTitle: "아이템 상호작용 및 선택 시스템",
                contents: "**Player 기준으로 OverlapSphere()**를 사용하여, 특정 **Layer에 속한 주변 아이템을 감지**하도록 구현하였습니다. 이 방식은 일정 반경 내에 있는 **여러 오브젝트를 동시에 탐지**할 수 있어, 주변 아이템들과의 상호작용을 효율적으로 처리할 수 있습니다.\n\n감지된 Collider 중에서 **MousePointer와 가장 가까운 아이템을 찾기 위해**, 각각의 아이템 위치를 **Camera의 WorldToScreenPoint()**를 통해 화면 좌표로 변환한 뒤, 마우스 위치와의 거리를 비교하여 **가장 가까운 아이템을 판별**합니다.\n\n선택된 아이템에는 **Custom Outline Shader**를 적용하여 시각적으로 강조되며, 해당 아이템에 대해서는 **Mouse 클릭** 또는 **Spacebar 입력**을 통해 **Inventory에 추가할 수 있도록** 설계하였습니다.\n\n아이템을 인벤토리에 추가할 수 있는 조건이 만족될 경우, 해당 아이템은 **저장을 위한 특정 위치로 이동**한 뒤 **비활성화 처리**됩니다. 단, **음식 아이템**의 경우 **부패 포인트(Freshness Point)**가 지속적으로 진행되어야 하므로, 오브젝트 자체를 비활성화하는 대신 **`enabled = false`로 상태만 비활성화**하여 내부 로직은 계속 유지되도록 처리하였습니다."
            },
            {
                midTitle: "인벤토리 시스템 설계",
                contents: "인벤토리는 **UI와 실제 데이터 구조를 분리**하여 설계하였으며, **Observer Pattern**을 적용해 각 **UI Manager 클래스가 데이터 리스트를 구독**하도록 구현하였습니다.\n\nPlayer가 인벤토리 공간을 확장할 경우, **데이터 리스트에는 Null 값을 추가**하고, UI는 **미리 보유한 Prefab 개수에 따라 해당 칸을 활성화**하여 동적으로 반영합니다. 인벤토리 내부의 **빈 공간과 아이템이 존재하는 공간은 서로 이동이 가능**해야 하므로, 리스트 내에 **Null을 통해 빈 공간을 표현**하도록 처리하였습니다.\n\n아이템 추가 시에는 먼저 **기존 인벤토리 내 동일 아이템이 존재하는지 확인**하고, **스택 추가가 가능한 경우 해당 슬롯에 추가**합니다. 불가능할 경우, **빈 슬롯이 있는지 추가로 검사**하고, 있다면 새 슬롯에 추가합니다. 이 모든 조건이 충족되지 않으면 **해당 아이템은 필드에 그대로 Drop**되도록 구성하였습니다.\n\n또한, **작업장(Workplace)**과 **거처(Home)**에서도 동일한 인벤토리 구조를 사용하므로, **공통 부모 클래스를 기반으로 각 장소별 인벤토리 클래스에서 상속**받아 확장 가능하도록 설계하였습니다."
            },
            {
                midTitle: "거처 인벤토리 및 장비창 시스템",
                contents: "앞서 설명한 바와 같이, **거처(Home)**와 **작업장(Workplace)**의 인벤토리는 **Player 인벤토리와 동일한 구조**로 설계되었으며, **공통 부모 클래스(Common Inven Class)**를 상속받아 구현하였습니다.\n\n이를 통해 **일관된 인벤토리 시스템을 유지**하면서도, 각 인벤토리마다 **고유한 작업 처리 로직을 유연하게 확장**할 수 있도록 구성하였습니다.\n\n거처와 작업장은 **Player의 스탯(Stats)**에 따라 업그레이드되며, 업그레이드될 때마다 **인벤토리 슬롯이 한 칸씩 확장**되어 더 많은 자원을 효율적으로 저장할 수 있습니다.\n\n**장비창(Equipment Slot)**은 장착 가능한 **장비 타입의 아이템만 허용**되도록 설계되었으며, 사용자는 **드래그 앤 드롭(Drag & Drop)** 또는 **F 키 입력**을 통해 장비 아이템을 **장착하거나 기존 장비와 교체**할 수 있도록 UX를 구성하였습니다."
            },
            {
                midTitle: "아이템 Drag & Drop 상호작용",
                contents: "**Inventory Box**에 위치한 아이템 아이콘은 **Drag & Drop** 방식으로 상호작용할 수 있도록 구현하였습니다. Unity의 **EventSystem**을 활용하여 드래그 이벤트를 처리하고, 아이템이 이동되면 **RectTransform**을 통해 해당 위치를 검사하여 **인벤토리 내 어느 슬롯에 드롭되었는지 확인**합니다.\n\n이를 통해 **인벤토리 내 아이템의 위치를 자유롭게 변경**할 수 있으며, 드래그된 아이템이 **인벤토리 창 외부로 이동된 경우**, 다음과 같은 처리가 가능합니다:\n- **필드에 버리기**\n- **장비창에 장착**\n- **거처 혹은 작업장 인벤토리로 이동**\n\n또한 아이템이 드래그되는 동안, **마우스 포인터의 위치를 기준으로 Camera에서 Ray를 발사**하여, 아이템이 **FireObject(모닥불, 용광로 등)** 위에 위치하는지를 감지합니다. 이때 해당 오브젝트와 **실시간 상호작용이 가능하도록** 구성하였습니다."
            }
        ]
    },
    {
        key: 0,
        projName: "PaperPlease",
        projDesc: "PaperPlease 모작. 문화어 ver. 퍼즐 2D 개인 프로젝트",
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
        projDescDetail: "《Paper Please》를 모작 한 2D 퍼즐형 개인 프로젝트로,입국 심사관이 되어 문화어(북한어)로 된 **문서와 정보를 판별하며 허가 여부**를 결정하는 게임입니다.**2D **기반으로 제작되었으며, 플레이어는 **제한된 시간** 안에 NPC의 문서 정보, 외형, 말투 등을 종합적으로 판단하여 입국 허가/불가를 결정합니다.",
        roles: [
            {
                midTitle: "NPC 입장 및 게임 흐름 제어",
                contents: "게임 시작 시 **NPC가 부스로 이동하는 애니메이션**을 구현하여 자연스러운 입장 연출을 구성하였습니다.\n\nNPC는 지정된 **도착 지점까지 이동 후 버튼이 활성화**되며, 이 버튼을 누르면 실제 게임 시간이 진행되도록 구성되어 있습니다.\n\n시간은 **코루틴(Coroutine)**으로 제어되며, 특정 시간이 흐르면 **스프라이트 애니메이션이 실행**되고, 시간이 종료된 이후에는 해당 스테이지 종료 가능 상태로 전환됩니다."
            },
            {
                midTitle: "NPC 데이터 구조 및 랜덤 조합",
                contents: "게임에 등장하는 인물, 지역 등은 모두 **JSON 데이터**로 정의되어 있으며, 여성/남성에 해당하는 sprite가 정해져 있습니다. \n\n게임 중 NPC가 등장할 때마다 해당 **JSON 리스트에서 랜덤으로 데이터를 조합**하여 등장시키며, 정답 역시 **랜덤으로 조합**하여 캐싱하고있습니다.\n\n검사 결과가 정답과 다를 경우 벌금 티켓이 발부합니다."
            },
            {
                midTitle: "드래그 앤 드롭 인터랙션 구현",
                contents: "여권, 신분증 등의 게임 내 주요 오브젝트들은 **마우스를 이용한 드래그 앤 드롭 인터랙션**으로 조작됩니다.\n\n오브젝트를 특정 영역(좌우 기준)에 드롭할 경우,**왼쪽 구역에서는 원래 위치로 복귀**하고, **오른쪽 구역에서는 지정된 스프라이트로 변경**되게 구현하였습니다."
            },
            {
                midTitle: "스탬프 판정 시스템",
                contents: "플레이어는 입국 심사 시, **여권 오브젝트에 허가/불가 도장을 직접 찍는 인터랙션**을 수행하게 됩니다.\n\n스탬프 오브젝트와 여권 오브젝트가 충돌했을 때, **스탬프 프리팹이 Instantiate되어 여권의 하위 오브젝트로 부착**되며 도장 자국이 시각적으로 표시됩니다.\n\n최종 판정은 **여권에 마지막으로 찍힌 스탬프의 종류(허가/불가)**를 기반으로 결과가 결정됩니다."
            }
        ]
    }
]