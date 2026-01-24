# AWS Amplify 배포 가이드

이 가이드는 LEVELTHREE 웹사이트를 AWS Amplify를 통해 배포하는 방법을 설명합니다.

## 🚀 빠른 배포 (5분 안에 완료)

### 1단계: AWS Amplify 콘솔 접속

1. [AWS Amplify Console](https://console.aws.amazon.com/amplify) 접속
2. AWS 계정으로 로그인 (계정이 없으면 [무료 계정 생성](https://aws.amazon.com/ko/free/))

### 2단계: 새 앱 생성

1. **"New app"** 버튼 클릭
2. **"Host web app"** 선택
3. **"GitHub"** 선택 (또는 GitLab, Bitbucket)

### 3단계: GitHub 저장소 연결

1. **"Connect branch"** 클릭
2. GitHub 인증 (처음이면 "Authorize AWS Amplify" 클릭)
3. 저장소 선택: **`injaehwang/levelthree_official`**
4. 브랜치 선택: **`main`**
5. **"Next"** 클릭

### 4단계: 빌드 설정 확인

Amplify가 자동으로 `amplify.yml` 파일을 감지합니다. 다음 설정이 자동으로 적용됩니다:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
```

**"Next"** 클릭

### 5단계: 배포

1. **"Save and deploy"** 클릭
2. 배포가 시작됩니다 (약 3-5분 소요)
3. 배포 완료 후 자동으로 URL이 생성됩니다!

## 📍 배포 완료 후

배포가 완료되면 다음과 같은 URL이 생성됩니다:

```
https://main.xxxxxxxxxxxx.amplifyapp.com
```

이 URL을 통해 웹사이트에 접속할 수 있습니다!

## 🔧 커스텀 도메인 설정 (선택사항)

### 도메인 추가하기

1. Amplify 콘솔에서 앱 선택
2. 왼쪽 메뉴에서 **"Domain management"** 클릭
3. **"Add domain"** 클릭
4. 도메인 이름 입력 (예: `levelthree.com`)
5. DNS 설정 안내를 따라 도메인 제공업체에서 설정

### SSL 인증서

- Amplify가 자동으로 무료 SSL 인증서를 제공합니다
- Let's Encrypt를 사용하여 자동 갱신됩니다

## 🔄 자동 배포 설정

기본적으로 다음 경우에 자동 배포됩니다:

- `main` 브랜치에 push할 때
- Pull Request가 생성될 때 (선택사항)

### 배포 브랜치 변경

1. 앱 설정 → **"General"** → **"App settings"**
2. **"Build settings"** 섹션에서 브랜치 선택

## 🐛 트러블슈팅

### 빌드 실패 시

1. **빌드 로그 확인**
   - Amplify 콘솔 → 앱 선택 → 빌드 히스토리
   - 실패한 빌드 클릭하여 로그 확인

2. **일반적인 문제들**
   - Node.js 버전 문제: `amplify.yml`에 Node 버전 지정
   - 의존성 문제: `package-lock.json` 확인
   - 빌드 스크립트 오류: 로컬에서 `npm run build` 테스트

### Node.js 버전 지정

`amplify.yml` 파일 상단에 추가:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - nvm use 18
        - npm ci
    # ... 나머지 설정
```

### 환경 변수 설정

1. 앱 설정 → **"Environment variables"**
2. 변수 추가 (예: API 키, 설정값 등)

## 📊 모니터링

### 앱 성능 모니콘

- Amplify 콘솔에서 실시간 트래픽 확인
- 에러 로그 모니터링
- 배포 히스토리 확인

## 💰 비용

AWS Amplify는 **무료 티어**를 제공합니다:

- 월 15GB 저장 공간
- 월 100GB 전송량
- 월 1,000 빌드 분

대부분의 소규모 웹사이트는 무료 티어로 충분합니다!

## 🔗 유용한 링크

- [AWS Amplify 문서](https://docs.aws.amazon.com/amplify/)
- [Amplify 가격](https://aws.amazon.com/ko/amplify/pricing/)
- [커스텀 도메인 가이드](https://docs.aws.amazon.com/amplify/latest/userguide/custom-domains.html)

## ✅ 체크리스트

배포 전 확인사항:

- [ ] GitHub에 코드가 푸시되어 있음
- [ ] `amplify.yml` 파일이 저장소에 있음
- [ ] `package.json`에 빌드 스크립트가 있음
- [ ] 로컬에서 `npm run build`가 성공함
- [ ] AWS 계정이 준비되어 있음

---

**문제가 발생하면 Amplify 콘솔의 빌드 로그를 확인하세요!**
