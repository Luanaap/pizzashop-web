import { test, expect } from '@playwright/test';

test('display day orders amount metric', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle'});

  await expect(page.getByText('20', { exact: true })).toBeVisible()
  await expect(page.getByText('-5% em relação a ontem')).toBeVisible()
}) 

test('display month orders amount metric', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle'});

  await expect(page.getByText('200', { exact: true })).toBeVisible()
  await expect(page.getByText('+20% em relação ao mês passado')).toBeVisible()
})

test('display month canceled orders amount metric', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle'});

  await expect(page.getByText('50', { exact: true })).toBeVisible()
  await expect(page.getByText('-10% em relação ao mês passado')).toBeVisible()
})

test('display month revenue metric', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle'});

  await expect(page.getByText('R$ 200,00')).toBeVisible()
  await expect(page.getByText('+10% em relação ao mês passado')).toBeVisible()
}) 