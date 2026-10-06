# Firestore 데이터 정리 및 (주)이코드 경력 입력 가이드

- 작성일: 2026-10-06
- 대상: `sujin_portfolio` (Next.js 15 + Firebase Firestore/Hosting, Firebase 프로젝트 `sujin-portfolio`)
- 목적: (주)이코드 경력 데이터를 Firestore에 넣기 전, 현재 상태와 넣어야 할 항목을 정리

---

## 1. 변경 이력 (2025-08-01 이후)

### 1-1. Git

2026-08-01 이후 커밋은 **없음**. main / origin/dev / origin/gh-pages 모두 해당 없음.
이 PC의 저장소는 2026-10-06에 새로 clone 됨 (작업트리 clean, stash 없음).
origin/dev는 `afb6bf7`(2026-04-27)에서 멈춰 있고 main이 2커밋 앞섬.

| 날짜 | 해시 | 내용 | 규모 |
|---|---|---|---|
| 2026-06-23 | 720a4a3 | 전체 디자인 변경 및 리팩터링 | 37 files |
| 2026-05-29 | 9a8dfd2 | 구조 개선 (Career/Project 상세 컴포넌트) | 12 files |
| 2026-04-27 | afb6bf7 | 세부 수정, `docs` 컬렉션(이력서/포트폴리오 링크) 추가 | 8 files |
| 2026-04-02 | d723c94 | 전체 디자인 개선 및 구조 변경, 스킬 아이콘, Blog 섹션 | 75 files |
| 2026-01-30 | 7c9704e | Main Splash 디자인 진행 중 | 6 files |
| 2026-01-29 | 2b4eff7 | Firebase 연동. 로컬 data 파일 삭제, Firestore fetch로 전환 | 43 files |
| 2025-12-03 | 490621e | Firebase hosting 설정 (gh-pages에서 이전) | 17 files |

### 1-2. Firestore (코드 외 변경, 문서 updateTime 기준)

| 일시 | 문서 | 내용 |
|---|---|---|
| 2026-08-11 | careers/202608 | **(주)이코드 문서 신규 생성. 내용 필드 전부 비어 있음** |
| 2026-08-11 | careers/202503 | (주)유팜몰 수정. endTerm 202607 마감, contents형 Focus 4개 + 지표 3개 |
| 2026-06-22~23 | projects/1,2,3,5 | 프로젝트 상세 내용 수정 |
| 2026-06-19 | careers/202203 | (주)TG 수정 |
| 2026-04-02 | docs/resume, docs/portfolio | PDF 링크 등록 (ver 0.0) |

---

## 2. Firestore 구조

### 2-1. 연결

- 초기화: `src/lib/firebase.ts` — `NEXT_PUBLIC_FIREBASE_*` 환경변수 6개 (API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID)
- 리전: asia-northeast3, 데이터베이스 `(default)`
- 보안 규칙(`firestore.rules`): **읽기 전체 공개, 쓰기 전부 차단**
  - 코드의 `addProject`, `addProjectDetail`는 호출해도 permission denied
  - 데이터 입력은 Firebase Console 또는 Admin SDK(서비스 계정)로만 가능
- 읽기 코드: `src/features/{career,project,skill,docs}/api/*.firestore.ts`
- 타입: `src/features/{career,project,skill,docs}/types/*.types.ts`

### 2-2. 컬렉션 요약

| 컬렉션 | 문서 ID | 정렬 | 용도 |
|---|---|---|---|
| `skills` | key 문자열 | key asc | 기술 스택 마스터. projects/careers에서 숫자 key로 참조 |
| `careers` | 입사연월 `YYYYMM` | key desc | 경력. 목록/상세 모두 이 문서 하나로 렌더링 |
| `projects` | key 문자열 | key desc | 개인/팀 프로젝트. 목록용 + 상세용 필드가 같은 문서에 있음 |
| `docs` | `resume`, `portfolio` 고정 | - | 이력서/포트폴리오 PDF(Google Drive) 링크 |

`projectDetails` 컬렉션에 쓰는 함수가 코드에 있지만 읽는 곳은 없음. 상세는 전부 `projects`에서 읽음.

### 2-3. 스키마

**skills**
```
key: number, name: string, type?: string, div?: string(코드에서 미사용)
```

**careers**
```
key: number
company: string
team?: string            // "기술연구소" → 화면에 "기술연구소팀"으로 표시
position: string         // 직급
description?: string     // 한 줄 배지 (예: "웹 기반 업무 시스템 개발 및 운영 고도화")
contents?: string        // 요약 문단. 메인 카드에 5줄까지 노출
displayType: "project" | "contents"
startTerm: string        // "YYYYMM"
endTerm?: string         // "YYYYMM", 재직 중이면 생략
projects?: [{            // displayType = "project" 일 때
  key, projName, description?, startDate("YYYY.MM"), endDate?, duration?("5개월"),
  role, tasks: string[], achievements?: string[], skills?: number[]
}]
detailContents?: [{      // displayType = "contents" 일 때
  title?: string,        // Focus 카드 제목. 그룹 첫 줄에만 지정
  img?: string,
  contents: string       // "문제: ..." / "설계/구현: ..." / "결과/역량: ..."
}]
metrics?: [{             // 상세 페이지 상단 지표 (선택)
  value: string,         // "99→70%"
  label: string,
  caption?: string,
  group?: string         // 지정 시 해당 Focus 카드 하위에 표시. Focus title과 글자 단위로 일치해야 함
}]
```

**projects**
```
key, projName, projTag?: string[], projDesc?, projSkills?: number[]
startDate, endDate?                      // 현재 DB는 "2025.12"와 "2025.11.04" 혼용
gitUrl?: [{url, title}], notionUrl?, siteUrl?, youtubeUrl?
projSize?: 0 side | 1 toy | 2 work
projPtc: 1 TEAM | 2 SOLO
imgUrl?: string | string[]               // 목록은 첫 장, 상세는 전체
mainviewyn?: boolean                     // 메인 노출 여부
role?: string, achievements?: string[]
projDescDetail: string                   // 상세 overview
roles?: contentsT[]                      // 담당 정보 아코디언
contents?: contentsT[]                   // 추가 정보
// contentsT = { contentType?: "troubleshoot"|"improvement"|"general", imgUrl?, midTitle?, contents? }
```

**docs**
```
date: "YYYYMMDD", url: string(Drive 링크), ver: string
```

### 2-4. 텍스트 작성 규칙 (`src/utils/parseContent.tsx`)

- 줄바꿈: `\n` (Firestore에 `\\n`으로 들어가도 처리됨)
- 강조: `**굵게**`
- 라벨 접두어: `문제:` `해결:` `설계/구현:` `결과:` `결과/역량:` → 화면에 과제/구현/성과 배지로 변환
- `imgUrl`: Google Drive 공유 링크 / 전체 URL / 파일명만(→ `/projImg/{이름}.png`). `-`는 이미지 없음

---

## 3. 현재 데이터 현황 (2026-10-06 기준)

### skills (38건, key 0~37)

```
0 React.js, 1 Redux saga, 2 TypeScript, 3 SpringBoot, 4 Java, 5 Recoil, 6 JSP, 7 Spring,
8 Linux, 9 ReactQuery, 10 WebSocket, 11 Oracle, 12 Tibero, 13 MariaDB, 14 MySQL, 15 Docker,
16 NginX, 17 Jenkins, 18 Unity, 19 AWS, 20 Apache, 21 ASP.NET, 22 MIRROR, 23 TCP SERVER,
24 NEXT.js, 25 Three.js, 26 Python, 27 WebGL, 28 Tailwind CSS, 29 Zustand, 30 Firebase Hosting,
31 Firestore, 32 C#, 33 MSSQL, 34 GitHub Actions, 35 Git, 36 jQuery, 37 Motion
```
모바일/앱 배포 관련 스킬 없음. 32~37은 `div` 필드 없음(코드 미사용이라 문제 없음).

### careers (3건)

| key | 문서 ID | 회사 / 팀 / 직급 | 기간 | 타입 | 내용 |
|---|---|---|---|---|---|
| 2 | 202608 | (주)이코드 / 기술연구소 / 선임 | 2026.08 ~ 재직중 | project | **비어 있음** (contents, description, projects, detailContents, metrics 전부 없음) |
| 1 | 202503 | (주)유팜몰 / 개발 / 주임 | 2025.03 ~ 2026.07 | contents | Focus 4개 (팜페이 결제 PG API 연동 / WOS 화면 전면 재구축 / MSSQL 프로시저·대용량 거래 데이터 개선 / ERP DB 연동 안정화·외부 데이터 수집), 지표 3개 |
| 0 | 202203 | (주)TG / 플랫폼 / 주임 | 2022.03 ~ 2024.02 | project | 프로젝트 5개 (tasks/achievements 있음, skills는 전부 빈 배열) |

### projects (5건)

| key | 이름 | 기간 | size / ptc | main | 상세 |
|---|---|---|---|---|---|
| 5 | 포트폴리오 사이트 v2 | 2025.12 ~ 2026.03 | side / SOLO | O | roles 2 |
| 4 | PDF Converter | 2025.11.04 ~ 2025.11.21 | toy / SOLO | O | roles 2, contents 4(troubleshoot) |
| 3 | NEKO PARK | 2024.08.12 ~ 2024.08.19 | side / TEAM | O | roles 4 |
| 2 | 좀비,펑펑!화르륵 | 2024.11.01 ~ 2024.12.27 | side / TEAM | X | roles 4 |
| 1 | TheWildFour | 2024.07.08 ~ 2024.07.31 | side / TEAM | X | roles 4 |

회사 프로젝트(projSize=2 work) 없음. 참고로 Firebase 전환 전 로컬 데이터에 있던 PaperPlease(옛 key 0)는 DB에 없음.

### docs (2건)

| ID | date | ver | 비고 |
|---|---|---|---|
| portfolio | 20260402 | 0.0 | 유팜몰 퇴사·이코드 입사 반영 전 |
| resume | 20260402 | 0.0 | 동일 |

---

## 4. (주)이코드 경력 문서 작성 가이드 (`careers/202608`)

### 4-1. 현재 문제

`displayType: "project"`인데 projects가 0개 → 메인 카드에 회사명/직급만 뜨고 상세 링크가 생기지 않음.

### 4-2. 타입 선택: `contents` 추천

- PG 연동, iOS 배포, AOS 배포는 날짜가 딱 떨어지는 별개 프로젝트가 아니라 주제별 업무 단위 → Focus 카드(문제 → 설계/구현 → 결과/역량) 형식이 맞음
- 입사 2개월 차라 project형으로 쪼개면 내용이 빈약해 보임
- 유팜몰과 같은 형식이라 화면 일관성도 좋음
- 단, contents형은 스킬 칩을 그리지 않음 (스킬은 project형의 `projects[].skills`에서만 렌더링)

### 4-3. 채울 필드

| 필드 | 내용 | 비고 |
|---|---|---|
| `displayType` | `"contents"` | 현재 `"project"`에서 변경 |
| `description` | 한 줄 배지 | 예: "결제 연동 및 모바일 앱 배포" |
| `contents` | 요약 2~3문장 | 담당 시스템, PG, 앱 배포, 기타를 한 문단으로. 메인 카드에 5줄까지 노출 |
| `detailContents` | Focus당 3줄 | 첫 줄에만 `title`, 세 줄은 `문제:` / `설계/구현:` / `결과/역량:` 접두어 |
| `metrics` | 수치 있는 것만 | `group`은 Focus `title`과 완전히 동일한 문자열 |

### 4-4. Focus 후보

1. **PG 결제 연동** — PG사명(토스페이먼츠 / 나이스페이 / KG이니시스 / 포트원 등) 명시
   - 문제: 어떤 서비스에 왜 결제가 필요했는지, 기존 방식의 한계
   - 설계/구현: 결제수단(카드/계좌/간편결제), 승인·취소·부분취소·정산, 웹훅/콜백 검증, 테스트→운영 전환
   - 결과/역량: 결제 처리 가능해진 것. 유팜몰 팜페이 연동과 다른 점(두 번째 PG 경험)을 살리면 좋음
2. **iOS 앱 배포**
   - 문제: 앱 형태(네이티브 / React Native / Flutter / WebView 하이브리드), 배포 경험이 없던 상태였다면 그 점
   - 설계/구현: 인증서·프로비저닝, App Store Connect, TestFlight, 심사 리젝 사유와 대응, 버전·빌드 관리
   - 결과/역량: 출시 여부, 심사 통과 소요, 배포 절차 문서화
3. **Android 앱 배포**
   - 설계/구현: AAB 서명키 관리, Play Console 트랙(내부테스트 → 비공개 → 프로덕션), 타겟 SDK 대응, 심사
   - iOS와 묶어 "iOS/AOS 앱 스토어 배포" 하나로 합쳐도 됨. 내용이 충분하면 분리
4. (선택) **앱 내 결제 흐름** — PG 결제를 앱 안에서 처리할 때 Apple 인앱결제 정책(실물 상품/서비스는 PG 허용, 디지털 콘텐츠는 IAP 강제)을 어떻게 판단·대응했는지
5. (선택) 푸시알림(FCM/APNs), 딥링크, 강제 업데이트, 크래시 모니터링, 배포 자동화(Fastlane / GitHub Actions) 중 하나

### 4-5. metrics 후보

심사 통과까지 일수, 배포 버전 수, 연동한 결제 API 수, 결제 성공률, 크래시율. 숫자가 없으면 비워 둠.
(유팜몰은 3개 전부 한 Focus(`MSSQL 프로시저·대용량 거래 데이터 개선`)에 group으로 묶여 있음)

### 4-6. JSON 뼈대

`《》` 부분만 채우면 Console / Admin SDK 어디든 사용 가능.

```json
{
  "key": 2,
  "company": "(주)이코드",
  "team": "기술연구소",
  "position": "선임",
  "startTerm": "202608",
  "displayType": "contents",
  "description": "《한 줄 배지》",
  "contents": "《요약 2~3문장》",
  "detailContents": [
    { "title": "PG 결제 연동", "contents": "문제: 《》" },
    { "contents": "설계/구현: 《》" },
    { "contents": "결과/역량: 《》" },
    { "title": "iOS/AOS 앱 스토어 배포", "contents": "문제: 《》" },
    { "contents": "설계/구현: 《》" },
    { "contents": "결과/역량: 《》" }
  ],
  "metrics": [
    { "value": "《N일》", "label": "《심사 통과 소요》", "caption": "《》", "group": "iOS/AOS 앱 스토어 배포" }
  ],
  "projects": []
}
```

---

## 5. 함께 손볼 것

### 5-1. skills 추가 (key 38부터)

실제 사용한 것만. 후보:
- 앱: React Native / Flutter / Swift / Kotlin / WebView
- 배포: Xcode, App Store Connect, TestFlight, Google Play Console, Fastlane
- 기타: FCM, 《PG사명》

contents형 경력은 스킬을 화면에 그리지 않으므로 이코드 경력만을 위해서라면 효과 없음. projects 컬렉션에 회사 프로젝트를 올릴 때 필요.
아이콘은 `src/components/common/icons/SkillIcons.tsx`에 매핑된 이름만 표시됨(현재 TypeScript, JavaScript, React, Next, Java, Spring, Tailwind, MySQL, Oracle, .NET, C#, Unity, Linux, Photoshop, Illustrator, TanStack, Zustand, Figma).

### 5-2. projects 컬렉션

앱을 공개 가능한 수준으로 쓸 수 있으면 `projSize: 2`(work)로 1건 추가. 현재 work 프로젝트가 하나도 없음. 회사 보안상 어려우면 생략.

### 5-3. docs 갱신

이력서/포트폴리오 PDF가 2026-04-02 버전. 유팜몰 퇴사·이코드 입사 반영한 새 PDF를 Drive에 올리고 `url`, `date`, `ver` 갱신.

### 5-4. 코드 수정 1건

메인 카드의 키워드 칩은 `src/components/career/CareerSection.tsx`의 `keywordRules`(74~86행)에 박힌 단어만 잡음:
`ReactQuery, React.js, React, WebRTC, MSSQL, ERP, OpenAPI, 공공, 관리자, 데이터, 매뉴얼`

이코드 카드에 관련 칩을 띄우려면 아래 규칙 추가 필요:
```ts
['PG', 'PG 결제 연동'],
['iOS', 'iOS 배포'],
['Android', 'Android 배포'],
['앱', '모바일 앱'],
```
`getHighlightTitle`의 자동 제목 분기도 PG/앱 관련 분기가 없지만, Focus에 `title`을 직접 지정하면 영향 없음.

---

## 6. 입력 방법

### 6-1. 사전 준비 (이 PC에 없는 것)

- `.env` (gitignore 대상이라 clone에 안 따라옴) — `NEXT_PUBLIC_FIREBASE_*` 6개
- `node_modules` — `npm install`
- Firebase CLI — 미설치 (`npm i -g firebase-tools`, rules 배포할 때만 필요)
- Admin SDK용 서비스 계정 키 JSON — Firebase Console → 프로젝트 설정 → 서비스 계정 → 새 비공개 키 생성. **절대 커밋 금지** (.gitignore에 추가)

### 6-2. 방법 A: Firebase Console 수동 입력

- 건수가 적을 때. `detailContents`처럼 배열 안에 map이 들어가는 구조는 Console에서 하나씩 추가해야 해서 번거로움
- 기존 문서 `careers/202608`을 열어 필드 추가/수정

### 6-3. 방법 B: Admin SDK 시드 스크립트 (추천)

1. `npm i -D firebase-admin tsx`
2. `scripts/seed/` 아래에 JSON 데이터 파일 + 실행 스크립트 작성
3. `GOOGLE_APPLICATION_CREDENTIALS=서비스계정.json npx tsx scripts/seed/run.ts`
4. 스크립트는 `set(…, { merge: true })`로 기존 문서에 병합. key/문서 ID 규칙 유지

### 6-4. 비추천

rules를 임시로 `allow write: if true`로 열고 클라이언트 `addProject`로 쓰는 방식. 열어둔 동안 누구나 쓸 수 있어 위험.

---

## 7. 체크리스트

- [ ] 이코드 Focus별 문제/설계·구현/결과·역량 문장 작성 (PG, iOS, AOS, 선택 항목)
- [ ] 이코드 `description`, `contents` 작성
- [ ] metrics 수치 확정 (없으면 생략)
- [ ] `displayType`을 `contents`로 변경
- [ ] 서비스 계정 키 발급 + `.gitignore` 등록
- [ ] `.env` 복구 (`NEXT_PUBLIC_FIREBASE_*`)
- [ ] 시드 스크립트 작성 및 실행 (또는 Console 입력)
- [ ] `CareerSection.tsx` 키워드 규칙 추가
- [ ] (선택) skills 추가, 회사 프로젝트 1건 추가
- [ ] 이력서/포트폴리오 PDF 갱신 → `docs` 문서 업데이트
- [ ] 로컬 `npm run dev`로 메인 카드 / 상세 페이지 확인 후 `npm run deploy`

---

## 부록: 옛 로컬 데이터 참조

Firebase 전환(2026-01-29, `2b4eff7`) 전 로컬 데이터는 git 히스토리에 남아 있음. 스키마가 현재와 다름(Date 객체, `dateString`, `teamName` 등).

```
git show 490621e:src/data/common.data.ts    # skills 31개
git show 490621e:src/data/career.data.ts    # careers 2개 + 하위 프로젝트 6개
git show 490621e:src/data/project.data.ts   # projects 6개 (PaperPlease 포함)
```

현재 DB 데이터를 다시 읽어올 때 (읽기 공개라 인증 불필요):
```
curl "https://firestore.googleapis.com/v1/projects/sujin-portfolio/databases/(default)/documents/careers?pageSize=100"
```
