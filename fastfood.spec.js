const { test, expect } = require('@playwright/test')

test('login and navigate to dashboard', async ({ page }) => {
  await page.goto('http://localhost:3000')
  await page.fill('input[placeholder="Email"]', 'admin@example.com')
  await page.fill('input[placeholder="Senha"]', 'admin123')
  await page.click('button:text("Entrar")')
  await page.waitForSelector('input[placeholder="Nome"]')
  expect(await page.isVisible('input[placeholder="Nome"]')).toBe(true)
})
