# GitHub 푸시 스크립트
# 프록시 설정 제거 및 Git 푸시

$env:HTTP_PROXY = $null
$env:HTTPS_PROXY = $null
$env:http_proxy = $null
$env:https_proxy = $null

Write-Host "프록시 설정 제거 완료" -ForegroundColor Green
Write-Host "GitHub에 푸시를 시도합니다..." -ForegroundColor Yellow
Write-Host "인증이 필요하면 GitHub 사용자명과 Personal Access Token을 입력하세요." -ForegroundColor Cyan
Write-Host ""

git -c http.proxy= -c https.proxy= push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ GitHub 푸시 성공!" -ForegroundColor Green
    Write-Host "이제 AWS Amplify에서 배포할 수 있습니다." -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "❌ 푸시 실패" -ForegroundColor Red
    Write-Host ""
    Write-Host "해결 방법:" -ForegroundColor Yellow
    Write-Host "1. GitHub Personal Access Token 생성:" -ForegroundColor White
    Write-Host "   https://github.com/settings/tokens" -ForegroundColor Cyan
    Write-Host "2. 토큰 생성 시 'repo' 권한 선택" -ForegroundColor White
    Write-Host "3. 푸시 시 비밀번호 대신 토큰 입력" -ForegroundColor White
}
