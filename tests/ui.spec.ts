import { test, expect } from '@playwright/test';

test.describe('LevelThree Website UI Tests', () => {

    test('should load homepage successfully', async ({ page }) => {
        await page.goto('/');

        // 페이지 타이틀 확인
        await expect(page).toHaveTitle(/LevelThree/i);

        // 스크린샷 캡처
        await page.screenshot({ path: 'tests/screenshots/homepage.png', fullPage: true });
    });

    test('should display navigation menu', async ({ page }) => {
        await page.goto('/');

        // 네비게이션 요소 확인
        const nav = page.locator('nav');
        await expect(nav).toBeVisible();

        // 네비게이션 링크들 확인
        const aboutLink = page.getByRole('link', { name: /about/i });
        const expertiseLink = page.getByRole('link', { name: /expertise/i });
        const contactLink = page.getByRole('link', { name: /contact/i });

        await expect(aboutLink).toBeVisible();
        await expect(expertiseLink).toBeVisible();
        await expect(contactLink).toBeVisible();
    });

    test('should navigate to About section', async ({ page }) => {
        await page.goto('/');

        // About 링크 클릭
        await page.getByRole('link', { name: /about/i }).click();

        // URL 변경 확인
        await expect(page).toHaveURL(/.*#about/);

        // 스크린샷 캡처
        await page.screenshot({ path: 'tests/screenshots/about-section.png', fullPage: true });
    });

    test('should navigate to Expertise section', async ({ page }) => {
        await page.goto('/');

        // Expertise 링크 클릭
        await page.getByRole('link', { name: /expertise/i }).click();

        // URL 변경 확인
        await expect(page).toHaveURL(/.*#expertise/);

        // 스크린샷 캡처
        await page.screenshot({ path: 'tests/screenshots/expertise-section.png', fullPage: true });
    });

    test('should navigate to Contact section', async ({ page }) => {
        await page.goto('/');

        // Contact 링크 클릭
        await page.getByRole('link', { name: /contact/i }).click();

        // URL 변경 확인
        await expect(page).toHaveURL(/.*#contact/);

        // 스크린샷 캡처
        await page.screenshot({ path: 'tests/screenshots/contact-section.png', fullPage: true });
    });

    test('should have responsive layout on mobile', async ({ page }) => {
        // 모바일 뷰포트 설정
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto('/');

        // 페이지 로드 확인
        await expect(page.locator('body')).toBeVisible();

        // 모바일 스크린샷 캡처
        await page.screenshot({ path: 'tests/screenshots/mobile-view.png', fullPage: true });
    });

    test('should check for animations and interactions', async ({ page }) => {
        await page.goto('/');

        // 페이지 로드 대기
        await page.waitForLoadState('networkidle');

        // 애니메이션 요소 확인 (framer-motion 사용)
        const animatedElements = page.locator('[data-motion]');
        const count = await animatedElements.count();

        console.log(`Found ${count} animated elements`);

        // 스크롤 테스트
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
        await page.waitForTimeout(1000);

        await page.screenshot({ path: 'tests/screenshots/scrolled-view.png', fullPage: true });
    });

    test('should verify visual consistency', async ({ page }) => {
        await page.goto('/');
        await page.waitForLoadState('networkidle');

        // 전체 페이지 스크린샷 (비교용)
        await page.screenshot({
            path: 'tests/screenshots/full-page-baseline.png',
            fullPage: true
        });

        // 각 섹션별 스크린샷
        const sections = ['#home', '#about', '#expertise', '#contact'];

        for (const section of sections) {
            const element = page.locator(section);
            if (await element.isVisible()) {
                await element.screenshot({
                    path: `tests/screenshots/section-${section.replace('#', '')}.png`
                });
            }
        }
    });
});
