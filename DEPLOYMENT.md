# 배포 가이드

이 문서는 LEVELTHREE 웹사이트를 GitHub에 업로드하고 AWS에 배포하는 방법을 설명합니다.

## 1. GitHub에 업로드

### 1.1 GitHub 저장소 생성

1. [GitHub](https://github.com)에 로그인
2. 우측 상단의 "+" 버튼 클릭 → "New repository" 선택
3. 저장소 이름 입력 (예: `levelthree-website`)
4. Public 또는 Private 선택
5. "Create repository" 클릭

### 1.2 로컬 저장소와 연결

터미널에서 다음 명령어를 실행하세요:

```bash
# GitHub 저장소 URL을 원격 저장소로 추가
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# 또는 SSH를 사용하는 경우
git remote add origin git@github.com:YOUR_USERNAME/YOUR_REPO_NAME.git

# 브랜치 이름을 main으로 변경 (필요한 경우)
git branch -M main

# 코드 푸시
git push -u origin main
```

## 2. AWS 배포 옵션

두 가지 배포 방법을 제공합니다:

### 옵션 A: AWS Amplify (추천 - 가장 쉬움)

AWS Amplify는 자동 CI/CD를 제공하며 설정이 매우 간단합니다.

#### 단계:

1. **AWS Amplify 콘솔 접속**
   - [AWS Amplify Console](https://console.aws.amazon.com/amplify) 접속
   - "New app" → "Host web app" 클릭

2. **GitHub 연결**
   - "GitHub" 선택
   - GitHub 인증 및 저장소 선택
   - 브랜치 선택 (main 또는 master)

3. **빌드 설정**
   - Amplify가 자동으로 `amplify.yml` 파일을 감지합니다
   - 또는 다음 설정을 수동으로 입력:
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

4. **배포**
   - "Save and deploy" 클릭
   - 배포가 완료되면 자동으로 URL이 생성됩니다

#### 장점:
- ✅ 자동 CI/CD (GitHub push 시 자동 배포)
- ✅ 무료 SSL 인증서
- ✅ CDN 자동 설정
- ✅ 설정이 매우 간단

---

### 옵션 B: AWS S3 + CloudFront (더 세밀한 제어)

S3에 정적 웹사이트를 호스팅하고 CloudFront로 CDN을 구성합니다.

#### 사전 준비:

1. **AWS CLI 설치 및 설정**
   ```bash
   # AWS CLI 설치 확인
   aws --version
   
   # AWS 자격 증명 설정
   aws configure
   # Access Key ID, Secret Access Key, Region 입력
   ```

2. **S3 버킷 생성**
   ```bash
   # 버킷 생성 (버킷 이름은 전 세계적으로 고유해야 함)
   aws s3 mb s3://your-bucket-name --region ap-northeast-2
   
   # 정적 웹사이트 호스팅 활성화
   aws s3 website s3://your-bucket-name \
     --index-document index.html \
     --error-document index.html
   ```

3. **버킷 정책 설정** (공개 읽기 허용)
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicReadGetObject",
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::your-bucket-name/*"
       }
     ]
   }
   ```

4. **CloudFront 배포 생성** (선택사항, 권장)
   - [CloudFront Console](https://console.aws.amazon.com/cloudfront) 접속
   - "Create distribution" 클릭
   - Origin domain: S3 버킷 선택
   - Default root object: `index.html`
   - "Create distribution" 클릭

#### GitHub Actions를 사용한 자동 배포:

1. **GitHub Secrets 설정**
   - GitHub 저장소 → Settings → Secrets and variables → Actions
   - 다음 Secrets 추가:
     - `AWS_ACCESS_KEY_ID`: AWS 액세스 키
     - `AWS_SECRET_ACCESS_KEY`: AWS 시크릿 키
     - `S3_BUCKET_NAME`: S3 버킷 이름
     - `CLOUDFRONT_DISTRIBUTION_ID`: CloudFront 배포 ID (선택사항)

2. **자동 배포**
   - `main` 브랜치에 push하면 자동으로 배포됩니다
   - `.github/workflows/deploy-aws.yml` 파일이 자동 배포를 처리합니다

#### 수동 배포:

```bash
# 프로젝트 빌드
npm run build

# S3에 업로드
aws s3 sync dist/ s3://your-bucket-name --delete

# CloudFront 캐시 무효화 (CloudFront 사용 시)
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
```

---

## 3. 커스텀 도메인 설정

### Amplify 사용 시:
1. Amplify 콘솔 → App settings → Domain management
2. "Add domain" 클릭
3. 도메인 입력 및 DNS 설정 안내 따르기

### S3 + CloudFront 사용 시:
1. CloudFront 배포 → General → Edit
2. Alternate domain names (CNAMEs)에 도메인 추가
3. SSL 인증서 요청 (ACM 사용)
4. Route 53 또는 도메인 제공업체에서 DNS 설정

---

## 4. 환경 변수 설정

환경 변수가 필요한 경우:

### Amplify:
- App settings → Environment variables에서 설정

### GitHub Actions:
- GitHub Secrets에 추가하고 workflow 파일에서 사용

---

## 5. 트러블슈팅

### 빌드 실패
- `npm ci` 대신 `npm install` 사용 시도
- Node.js 버전 확인 (package.json의 engines 필드 확인)

### 404 에러 (SPA 라우팅)
- S3: Error document를 `index.html`로 설정
- CloudFront: Custom error response 설정 (403 → 200, index.html 반환)

### CORS 오류
- API 호출 시 CORS 설정 확인
- CloudFront에서 CORS 헤더 추가

---

## 참고 자료

- [AWS Amplify 문서](https://docs.aws.amazon.com/amplify/)
- [AWS S3 정적 웹사이트 호스팅](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)
- [CloudFront 문서](https://docs.aws.amazon.com/cloudfront/)
