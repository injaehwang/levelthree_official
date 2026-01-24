# LEVELTHREE - Company Website

LEVELTHREE 회사 소개 웹사이트입니다. React와 TypeScript로 구축된 단일 페이지 애플리케이션으로, 패럴랙스 스크롤 효과와 현대적인 UI/UX를 제공합니다.

## 기술 스택

- **React 18** - UI 라이브러리
- **TypeScript** - 타입 안정성
- **Vite** - 빌드 도구
- **Framer Motion** - 애니메이션
- **React Intersection Observer** - 스크롤 애니메이션

## 주요 기능

- 🎨 현대적이고 화려한 디자인
- 📱 반응형 레이아웃
- ✨ 패럴랙스 스크롤 효과
- 🎭 부드러운 애니메이션
- 🌈 AI 시대에 맞는 그라디언트 디자인
- 🚀 최적화된 성능

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview
```

## 프로젝트 구조

```
src/
├── components/       # React 컴포넌트
│   ├── Hero.tsx      # 히어로 섹션
│   ├── About.tsx     # 회사 소개
│   ├── Services.tsx  # 서비스 소개
│   ├── Expertise.tsx # 기술 전문성
│   ├── Contact.tsx   # 연락처 및 폼
│   └── Navigation.tsx # 네비게이션
├── App.tsx           # 메인 앱 컴포넌트
├── main.tsx          # 진입점
└── index.css         # 글로벌 스타일
```

## 섹션 설명

1. **Hero** - 메인 히어로 섹션, 애니메이션 배경과 코드 스니펫
2. **About** - 회사 소개 및 통계
3. **Services** - AI 맵 서비스, APM, 솔루션 소개
4. **Expertise** - React, Vue, Turbo 등 기술 전문성
5. **Contact** - 연락처 정보 및 문의 폼

## 커스터마이징

색상과 스타일은 `src/index.css`의 CSS 변수에서 수정할 수 있습니다:

```css
:root {
  --primary: #6366f1;
  --secondary: #8b5cf6;
  --accent: #ec4899;
  /* ... */
}
```

## 배포

이 프로젝트는 AWS를 통해 배포할 수 있습니다. 자세한 배포 가이드는 [DEPLOYMENT.md](./DEPLOYMENT.md)를 참조하세요.

### 빠른 배포 (AWS Amplify)

1. GitHub에 저장소를 푸시
2. [AWS Amplify Console](https://console.aws.amazon.com/amplify)에서 새 앱 생성
3. GitHub 저장소 연결
4. 자동 배포 완료!

### 수동 배포 (S3 + CloudFront)

```bash
npm run build
aws s3 sync dist/ s3://your-bucket-name --delete
```

## 라이선스

© 2026 LEVELTHREE. All rights reserved.
