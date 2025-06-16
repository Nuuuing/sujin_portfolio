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
        projDesc: "기획 협업 진행 프로젝트",
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
        projDesc: "기획 협업 진행 프로젝트",
        projTag: ["2D", "협약 프로젝트", "캐주얼", "퍼즐"],
        startDate: "2024.11.01",
        endDate: "2024.12.27",
        projSkills: [
            skills[18], skills[13], skills[16], skills[20], skills[19], skills[8], skills[3]
        ],
        notionUrl: "https://tourmaline-tugboat-5d2.notion.site/118b84bb5ebe8023b0cfd3a25485e101",
        gitUrl: ["https://github.com/Team-AlphaNo/ZombieBoom", "https://github.com/Team-AlphaNo/Zombie_Back"],
        imgUrl: [zphImg, zphImg1, zphImg2],
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