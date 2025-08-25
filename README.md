# 🏪 Storey - AI 기반 소상공인 마스코트 브랜딩 서비스

> 한성대학교 멋쟁이사자처럼 13기 중앙톤 프론트엔드    


---

## 📌 프로젝트 소개

Storey는 AI 인터뷰로 가게 스토리를 수집하고 전용 마스코트 캐릭터를 생성하는 혁신적인 브랜딩 플랫폼

## ✨ 핵심 기능
### 🤖 AI 인터뷰 & 캐릭터 생성

- 가게 특성에 맞는 맞춤형 인터뷰 질문 생성
- 스토리를 반영한 고품질 마스코트 이미지 생성
- 인터뷰 내용을 브랜드 핵심 메시지로 압축

### 🗺️ 위치 기반 수집 게임

- 카카오맵 연동: 실제 가게 위치 기반 지도 서비스
- QR 스캔 해금: 실제 방문해야만 캐릭터 수집 가능
- 수집 도감: 방문한 가게들의 캐릭터 컬렉션

### 💼 비즈니스 관리

- 구독 서비스: 토스페이먼츠 연동 자동 결제 (월 29,900원)
- 사업자 검증: 공공 API로 사업자등록번호 실시간 검증
이벤트 관리: 가게별 프로모션 정보 관리
---

## 🛠 기술 스택


| 구분        | 기술 |
|------------|------|
| 프레임워크  | <img src="https://img.shields.io/badge/React 18-61DAFB?style=flat-square&logo=react&logoColor=black" /> <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white" /> |
| 상태관리    | <img src="https://img.shields.io/badge/Zustand-FF6B6B?style=flat-square&logo=zustand&logoColor=white" /> |
| 스타일링    | <img src="https://img.shields.io/badge/SCSS-CC6699?style=flat-square&logo=sass&logoColor=white" /> |
| 폼 관리     | <img src="https://img.shields.io/badge/React Hook Form-EC5990?style=flat-square&logo=reacthookform&logoColor=white" /> |
| 라우팅      | <img src="https://img.shields.io/badge/React Router-CA4245?style=flat-square&logo=reactrouter&logoColor=white" /> |
| HTTP 클라이언트 | <img src="https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white" /> |
| QR 코드     | <img src="https://img.shields.io/badge/QR Scanner-000000?style=flat-square&logo=qr-code&logoColor=white" /> <img src="https://img.shields.io/badge/QR Code Canvas-4285F4?style=flat-square&logo=qrcode&logoColor=white" /> |
| 지도 API    | <img src="https://img.shields.io/badge/Kakao Map-FFCD00?style=flat-square&logo=kakao&logoColor=black" /> |
| 주소 검색   | <img src="https://img.shields.io/badge/Daum Postcode-FFCD00?style=flat-square&logo=kakao&logoColor=black" /> |
| 이미지 처리 | <img src="https://img.shields.io/badge/html2canvas-FF6B6B?style=flat-square&logoColor=white" /> |
| 빌드 & 배포 | <img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white" /> |

---

## 🏗 프로젝트 구조

```text
src/
├── components/         # 재사용 가능한 컴포넌트
│   ├── auth/           # 인증 관련 컴포넌트
│   ├── b2b/            # 사장님용 컴포넌트
│   ├── user/           # 고객용 컴포넌트
│   └── common/         # 공통 컴포넌트
├── pages/              # 페이지 컴포넌트
├── apis/               # API 호출 로직
├── hooks/              # 커스텀 훅
├── store/              # Zustand 상태 관리
├── routes/             # 라우팅 설정
├── styles/             # SCSS 스타일 파일
└── assets/             # 정적 리소스
```

## ✏️ 커밋 메시지 규칙

| 깃모지 | 커밋 유형  | 설명                                                      |
| ------ | ---------- | --------------------------------------------------------- |
| ✨     | `feat`     | 새로운 기능 추가 또는 기존 기능 개선                      |
| 🐛     | `fix`      | 버그 수정                                                 |
| ♻️     | `refactor` | 코드 리팩토링 (기능 변화 없이 구조 개선)                  |
| 📝     | `doc`      | 문서 작업 (README 등)                                     |
| ✅     | `test`     | 테스트 코드 추가 또는 수정                                |
| ⚡️    | `perform`  | 성능 개선                                                 |
| 🔥     | `clean`    | 불필요한 코드 제거, 정리                                  |
| 💄     | `design`   | UI/UX 스타일 작업 또는 개선                               |
| 🎨     | `style`    | 코드 스타일 변경 (세미콜론, 들여쓰기 등) – 기능 변화 없음 |
| 💡     | `comment`  | 주석 수정, 추가                                           |
| 🔀     | `merge`    | 브랜치 병합                                               |
| 🚀     | `deploy`   | 배포 작업                                                 |
