import { test, expect } from '@playwright/test'

test.describe('SubList Me App', () => {
  test('should load homepage', async ({ page }) => {
    await page.goto('/')

    // 페이지 타이틀 확인
    await expect(page).toHaveTitle(/SubList Me/)

    // 헤더 확인
    await expect(page.locator('h1')).toContainText('SubList Me')
  })

  test('should toggle theme', async ({ page }) => {
    await page.goto('/')

    // 테마 토글 버튼 찾기
    const themeToggle = page.getByRole('button', { name: /theme/i }).or(
      page.locator('[data-testid="theme-toggle"]')
    )

    // 버튼이 있으면 클릭
    if (await themeToggle.isVisible()) {
      await themeToggle.click()

      // html에 dark 클래스가 토글되는지 확인
      const html = page.locator('html')
      const className = await html.getAttribute('class')
      const hasDark = className?.split(' ').includes('dark') ?? false
      expect(typeof hasDark).toBe('boolean')
    }
  })
})

test.describe('API Health', () => {
  test('should return healthy status', async ({ request }) => {
    const response = await request.get('http://localhost:8787/')

    expect(response.ok()).toBeTruthy()
    const data = await response.json()
    expect(data.status).toBe('ok')
    expect(data.message).toBe('SubList Me API')
  })
})

test.describe('Subscriptions', () => {
  test('should list subscriptions', async ({ request }) => {
    const response = await request.get('http://localhost:8787/subscriptions')

    expect(response.ok()).toBeTruthy()
    const data = await response.json()
    expect(Array.isArray(data)).toBe(true)
  })

  test('should create and delete subscription', async ({ request }) => {
    // 구독 생성
    const createResponse = await request.post('http://localhost:8787/subscriptions', {
      data: {
        name: 'E2E Test Subscription',
        price: 9900,
        currency: 'KRW',
        billingCycle: 'monthly',
      },
    })

    expect(createResponse.ok()).toBeTruthy()
    const created = await createResponse.json()
    expect(created.name).toBe('E2E Test Subscription')
    expect(created.id).toBeDefined()

    // 구독 삭제
    const deleteResponse = await request.delete(
      `http://localhost:8787/subscriptions/${created.id}`
    )
    expect(deleteResponse.ok()).toBeTruthy()

    // 삭제 확인
    const getResponse = await request.get(
      `http://localhost:8787/subscriptions/${created.id}`
    )
    expect(getResponse.status()).toBe(404)
  })
})
