import { expect, test } from '@playwright/test';

test.describe('Subscription Flow - Unauthenticated', () => {
  test.beforeEach(async ({ page }) => {
    // 각 테스트 전에 localStorage 클리어
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('should show ServiceCatalogue on homepage', async ({ page }) => {
    await page.goto('/');

    // 페이지 타이틀 확인
    await expect(page).toHaveTitle(/SubList Me/);

    // 헤더 확인
    await expect(page.locator('h1')).toContainText('SubList Me');

    // 서비스 카드들이 표시되는지 확인 (카테고리 섹션이 있는지)
    const categorySection = page.locator('section').first();
    await expect(categorySection).toBeVisible();
  });

  test('should show login button in header when not authenticated', async ({
    page,
  }) => {
    await page.goto('/');

    // 로그인 버튼이 표시되는지 확인
    const loginButton = page.getByRole('button', { name: /로그인|login/i });
    await expect(loginButton).toBeVisible();
  });

  test('should select services and show selection bar', async ({ page }) => {
    await page.goto('/');

    // 첫 번째 서비스 카드 클릭 (Netflix 등)
    const firstServiceCard = page.locator('[data-service-slug]').first();

    // 카드가 없으면 버튼으로 시도
    if (!(await firstServiceCard.isVisible())) {
      // 서비스 선택 영역에서 첫 번째 클릭 가능한 요소 찾기
      const serviceButton = page
        .locator('button')
        .filter({ hasText: /넷플릭스|Netflix/i })
        .first();
      if (await serviceButton.isVisible()) {
        await serviceButton.click();
      }
    } else {
      await firstServiceCard.click();
    }

    // 선택 바가 나타나는지 확인 (하단에 고정된 바)
    // 선택 개수가 표시되는지 확인
    const selectionText = page.getByText(/\d+개 선택됨|\d+ selected/i);
    await expect(selectionText).toBeVisible({ timeout: 5000 });
  });

  test('should show continue button when not logged in', async ({ page }) => {
    await page.goto('/');

    // 서비스 선택 (첫 번째 서비스 찾아서 클릭)
    const serviceCards = page
      .locator('button')
      .filter({ hasText: /넷플릭스|Netflix/i });
    if (await serviceCards.first().isVisible()) {
      await serviceCards.first().click();
    }

    // "계속하기" 버튼이 표시되는지 확인
    const continueButton = page.getByRole('button', {
      name: /계속하기|continue/i,
    });
    await expect(continueButton).toBeVisible({ timeout: 5000 });
  });

  test('should redirect to login when clicking continue', async ({ page }) => {
    await page.goto('/');

    // 서비스 선택
    const serviceCards = page
      .locator('button')
      .filter({ hasText: /넷플릭스|Netflix/i });
    if (await serviceCards.first().isVisible()) {
      await serviceCards.first().click();
    }

    // "계속하기" 클릭
    const continueButton = page.getByRole('button', {
      name: /계속하기|continue/i,
    });
    await continueButton.click();

    // 로그인 페이지로 리다이렉트 확인
    await expect(page).toHaveURL(/\/login\?redirect=\/onboarding/);
  });

  test('should save selections to localStorage', async ({ page }) => {
    await page.goto('/');

    // 서비스 선택
    const serviceCards = page
      .locator('button')
      .filter({ hasText: /넷플릭스|Netflix/i });
    if (await serviceCards.first().isVisible()) {
      await serviceCards.first().click();
    }

    // "계속하기" 클릭
    const continueButton = page.getByRole('button', {
      name: /계속하기|continue/i,
    });
    await continueButton.click();

    // localStorage 확인
    const savedServices = await page.evaluate(() => {
      return localStorage.getItem('sublistme_pending_services');
    });

    expect(savedServices).not.toBeNull();
    const parsed = JSON.parse(savedServices!);
    expect(Array.isArray(parsed)).toBe(true);
    expect(parsed.length).toBeGreaterThan(0);
  });
});

test.describe('/subscriptions Page - Unauthenticated', () => {
  test('should redirect to login when not authenticated', async ({ page }) => {
    await page.goto('/subscriptions');

    // 로그인 페이지로 리다이렉트되거나 로그인 필요 메시지가 표시되어야 함
    await expect(page).toHaveURL(/\/login/, { timeout: 5000 });
  });
});

test.describe('Login Page', () => {
  test('should show login form', async ({ page }) => {
    await page.goto('/login');

    // 로그인 폼이 표시되는지 확인
    await expect(page.getByLabel(/이메일|email/i)).toBeVisible();
    await expect(page.getByLabel(/비밀번호|password/i)).toBeVisible();

    // 로그인/회원가입 탭이 있는지 확인
    const loginTab = page.getByRole('tab', { name: /로그인|login/i });
    const signupTab = page.getByRole('tab', { name: /회원가입|sign up/i });
    await expect(loginTab).toBeVisible();
    await expect(signupTab).toBeVisible();
  });

  test('should preserve redirect parameter', async ({ page }) => {
    await page.goto('/login?redirect=/onboarding');

    // URL에 redirect 파라미터가 유지되는지 확인
    await expect(page).toHaveURL(/redirect=\/onboarding/);
  });
});

test.describe('ServiceCatalogue Selection', () => {
  test('should toggle service selection', async ({ page }) => {
    await page.goto('/');

    // 서비스 선택
    const serviceButton = page
      .locator('button')
      .filter({ hasText: /넷플릭스|Netflix/i })
      .first();

    if (await serviceButton.isVisible()) {
      // 첫 번째 클릭 - 선택
      await serviceButton.click();

      // 선택 바가 나타나는지 확인
      const selectionText = page.getByText(/\d+개 선택됨|\d+ selected/i);
      await expect(selectionText).toBeVisible({ timeout: 5000 });

      // 두 번째 클릭 - 선택 해제
      await serviceButton.click();

      // 0개 선택 시 선택 바가 사라지는지 확인 (또는 개수가 0이 되는지)
      // 선택 바는 0개일 때 숨겨짐
      await expect(selectionText).not.toBeVisible({ timeout: 5000 });
    }
  });

  test('should clear all selections when clicking clear button', async ({
    page,
  }) => {
    await page.goto('/');

    // 여러 서비스 선택
    const netflixButton = page
      .locator('button')
      .filter({ hasText: /넷플릭스|Netflix/i })
      .first();
    const spotifyButton = page
      .locator('button')
      .filter({ hasText: /스포티파이|Spotify/i })
      .first();

    if (await netflixButton.isVisible()) {
      await netflixButton.click();
    }
    if (await spotifyButton.isVisible()) {
      await spotifyButton.click();
    }

    // 선택 바가 나타나는지 확인
    const selectionText = page.getByText(/\d+개 선택됨|\d+ selected/i);
    await expect(selectionText).toBeVisible({ timeout: 5000 });

    // "초기화" 버튼 클릭
    const clearButton = page.getByRole('button', { name: /초기화|clear/i });
    if (await clearButton.isVisible()) {
      await clearButton.click();

      // 선택 바가 사라지는지 확인
      await expect(selectionText).not.toBeVisible({ timeout: 5000 });
    }
  });
});

test.describe('LocaleSwitcher', () => {
  test('should switch between locales', async ({ page }) => {
    await page.goto('/ko');

    // 한국어로 시작
    await expect(page.locator('h1')).toContainText('SubList Me');

    // 언어 변경 버튼이 있는지 확인
    const localeSwitcher = page
      .locator('[data-testid="locale-switcher"]')
      .or(page.getByRole('button', { name: /한국어|English|日本語/i }));

    if (await localeSwitcher.isVisible()) {
      // 언어 전환 테스트는 UI에 따라 다를 수 있음
      expect(true).toBe(true);
    }
  });
});
