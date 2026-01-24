# GitHub 푸시 가이드

현재 프록시 설정 문제로 자동 푸시가 어렵습니다. 다음 방법 중 하나를 사용하여 수동으로 푸시해주세요.

## 방법 1: PowerShell에서 직접 푸시 (권장)

1. PowerShell을 관리자 권한으로 실행
2. 다음 명령어 실행:

```powershell
cd h:\workspace\levelthree

# 프록시 환경 변수 제거
$env:HTTP_PROXY = $null
$env:HTTPS_PROXY = $null
$env:http_proxy = $null
$env:https_proxy = $null

# Git 푸시 (인증 창이 뜨면 GitHub 사용자명과 Personal Access Token 입력)
git -c http.proxy= -c https.proxy= push -u origin main
```

3. 인증 정보 입력:
   - Username: `injaehwang`
   - Password: GitHub Personal Access Token (비밀번호 아님!)

## 방법 2: GitHub Personal Access Token 생성

1. https://github.com/settings/tokens 접속
2. "Generate new token (classic)" 클릭
3. Token name: `levelthree-push` (임의)
4. Expiration: 원하는 기간 선택
5. Scopes: `repo` 체크
6. "Generate token" 클릭
7. 생성된 토큰을 복사 (한 번만 보여줌!)

## 방법 3: URL에 토큰 포함 (보안 주의)

```powershell
cd h:\workspace\levelthree

# 토큰을 URL에 포함 (YOUR_TOKEN을 실제 토큰으로 교체)
git remote set-url origin https://YOUR_TOKEN@github.com/injaehwang/levelthree_official.git

$env:HTTP_PROXY = $null
$env:HTTPS_PROXY = $null
git -c http.proxy= -c https.proxy= push -u origin main
```

⚠️ 주의: 이 방법은 토큰이 Git 설정에 저장되므로 보안상 권장하지 않습니다.

## 방법 4: GitHub Desktop 사용

1. GitHub Desktop 설치: https://desktop.github.com/
2. GitHub Desktop에서 저장소 열기: `h:\workspace\levelthree`
3. "Publish repository" 클릭
4. 자동으로 푸시됨

## 방법 5: 시스템 프록시 설정 제거 (영구 해결)

관리자 권한 PowerShell에서:

```powershell
# 시스템 환경 변수에서 프록시 제거
[System.Environment]::SetEnvironmentVariable("HTTP_PROXY", $null, "Machine")
[System.Environment]::SetEnvironmentVariable("HTTPS_PROXY", $null, "Machine")
[System.Environment]::SetEnvironmentVariable("http_proxy", $null, "Machine")
[System.Environment]::SetEnvironmentVariable("https_proxy", $null, "Machine")

# 재부팅 후 다시 시도
```

## 푸시 성공 후

푸시가 성공하면 다음 단계로 AWS 배포를 진행할 수 있습니다:

1. [AWS Amplify Console](https://console.aws.amazon.com/amplify) 접속
2. "New app" → "Host web app" 클릭
3. GitHub 저장소 연결: `injaehwang/levelthree_official`
4. 자동 배포 완료!
