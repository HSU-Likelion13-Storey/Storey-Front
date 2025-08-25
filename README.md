# **Storey – AI 기반 소상공인 마스코트 브랜딩 서비스**

한성대학교 멋쟁이사자처럼 13기 중앙톤 프론트엔드

<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/a5d48a01-3eaa-4388-bd0f-1c75af0ba4c3" />


---

## 📌 프로젝트 소개

**Storey**는 소상공인의 이야기를 AI 인터뷰로 수집하고, 이를 기반으로 맞춤형 마스코트 캐릭터를 생성하는 **AI 브랜딩 플랫폼**입니다.

손님은 매장을 방문해 캐릭터를 해금·수집하고, 캐릭터와 함께 찍은 인증샷을 SNS에 공유합니다.

소상공인은 그 과정에서 **스토리와 캐릭터라는 브랜드 자산** 으로 손님을 끌어모읍니다.

---

## ✨ 핵심 기능

### 🤖 AI 인터뷰 & 캐릭터 생성

- GPT-4o 기반 인터뷰: 가게의 철학, 메뉴, 이야기를 맞춤형 질문으로 수집
- 인터뷰 데이터 → 브랜드 핵심 메시지 자동 요약
- DALL·E 3 기반 캐릭터 생성: 성격·대사·이미지까지 갖춘 마스코트 완성

---

### 🗺️ 위치 기반 수집 & 탐험

- 카카오맵 연동: 실제 가게 위치 기반 캐릭터 탐험 지도 제공
- QR 스캔 해금: 매장 방문 시에만 캐릭터 해금 가능
- 캐릭터 도감: 방문 기록과 캐릭터가 모이는 개인 컬렉션
- SNS 공유 기능: 수집한 캐릭터로 스티커·템플릿 제작, 자발적 바이럴 유도

---

### 💼 비즈니스 관리 & 구독

- 구독 서비스: 첫 달 무료, 이후 월 29,000원 자동 결제 (토스페이먼츠 연동)
- 캐릭터 저작권 관리: 저작권은 스토어리 소유, 구독 유지 시 비독점 사용 허용
- 이벤트 관리: 가게별 깜짝 할인·프로모션 등록 가능 → 실질적 방문 유도
- 사업자 검증: 공공 API로 사업자등록번호 실시간 확인
---

## 🛠 기술 스택


| 구분        | 기술 |
|------------|------|
| 프레임워크  | <img src="https://img.shields.io/badge/React 18-61DAFB?style=flat-square&logo=react&logoColor=black" /> <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white" /> |
| 상태관리    | <img src="https://img.shields.io/badge/Zustand-FF6B6B?style=flat-square&logo=zustand&logoColor=white" /> |
| 스타일링    | <img src="https://img.shields.io/badge/SCSS-CC6699?style=flat-square&logo=sass&logoColor=white" /> |


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
