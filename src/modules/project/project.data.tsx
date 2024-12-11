import { skills } from "../common";
import { projectT } from "./project.types";
import nekoparkImg from 'src/assets/img/projImg/nekopark.png';
import soriImg from 'src/assets/img/projImg/soriImg.png';
import wildEightImg from 'src/assets/img/projImg/TheWildFour.png';
import papaerPleaseImg from 'src/assets/img/projImg/pp.png';
import zphImg from 'src/assets/img/projImg/zph.png';

export const projectData: projectT[] = [
    {
        key: 4,
        projName: "좀비,펑펑!화르륵",
        projContents: "기획 협업 진행 프로젝트",
        projTag: ["2D", "협약 프로젝트", "캐주얼","퍼즐"],
        startDate: "2024.11.01",
        endDate: "2024.12",
        projSkills: [
            skills[18], skills[13], skills[16], skills[20], skills[19], skills[8], skills[3]
        ],
        notionUrl: "https://east-wrinkle-9ca.notion.site/TeamAlphaNo-118b84bb5ebe8023b0cfd3a25485e101",
        imgUrl: zphImg,
        mainYn: true
    },
    {
        key: 3,
        projName: "SORI",
        projContents: "3D 창작 2인 프로젝트",
        projTag: ["3D", "Team", "2인", "창작","캐주얼","퍼즐", "아케이드"],
        startDate: "2024.08.28",
        endDate: "2024.10.04",
        projSkills: [
            skills[18]
        ],
        gitUrl: "https://github.com/Yogurtsharbet/SORI",
        notionUrl: "https://east-wrinkle-9ca.notion.site/SORI-1903aa91e2794f73b17aff5105dcccb4",
        youtubeUrl:"https://youtu.be/GxtldlEV7vo",
        imgUrl: soriImg,
        mainYn:true
    },
    {
        key: 2,
        projName: "NEKO PARK",
        projContents: "PICO PARK 모작",
        projTag: ["2D","Team", "4인", "퍼즐","네트워크"],
        startDate: "2024.08.12",
        endDate: "2024.08.19",
        projSkills: [
            skills[18], skills[13], skills[19]
        ],
        gitUrl: "https://github.com/KY00JSSH/NEKOPARK",
        youtubeUrl: "https://www.youtube.com/watch?v=HEH-BjvP_3g&feature=youtu.be",
        imgUrl: nekoparkImg,
        mainYn: true
    },
    {
        key: 1,
        projName: "TheWildFour",
        projContents: "TheWildEight 모작",
        projTag: ["3D", "Team", "4인", "생존" , "어드벤처",],
        startDate: "2024.07.08",
        endDate: "2024.07.31",
        projSkills: [
            skills[18]
        ],
        gitUrl: "https://github.com/KY00JSSH/TheWildFour",
        notionUrl: "https://east-wrinkle-9ca.notion.site/The-Wild-Four-18e102a9da304b0d967cd2f5b5b84efa",
        youtubeUrl: "http://youtube.com/watch?v=buZiRSoVNWw&feature=youtu.be",
        imgUrl: wildEightImg,
        mainYn:true
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
        gitUrl: "https://github.com/Nuuuing/paperPlease",
        youtubeUrl: "https://www.youtube.com/watch?v=s95nBAnZJdo",
        imgUrl: papaerPleaseImg,
        mainYn:false
    }
]
