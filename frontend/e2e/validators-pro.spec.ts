import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { fulfillProValidatorRoster } from './helpers/proValidatorsFixture'
import { stubNetwork } from './helpers/stubNetwork'

test.beforeEach(async ({ page }) => {
    await stubNetwork(page)
    await fulfillProValidatorRoster(page)
    await page.addInitScript(() => {
        // Suppress the unrelated release announcement in this deterministic proof.
        localStorage.setItem('memba_whats_new_seen', '7.5.0')
    })
})

for (const width of [1280, 1440, 1920, 390, 320]) {
    test(`readable black overview fits at ${width}px`, async ({ page }, testInfo) => {
        await page.setViewportSize({ width, height: 1000 })
        await page.emulateMedia({ colorScheme: 'dark' })
        await page.goto('/pearl/validators')
        await expect(page.locator('.k-pro-ui')).toBeVisible()
        await expect(page.getByTestId('validators-page')).toBeVisible()
        await expect(page.locator('.val-header h1')).toHaveCSS('font-size', width < 769 ? '26px' : '30px')
        await page.evaluate(() => {
            const label = document.createElement('span')
            label.textContent = 'Test fixture'
            label.style.cssText = 'font-size:12px;color:var(--pro-secondary)'
            document.querySelector('.val-header')!.appendChild(label)
        })
        if (width === 1440) {
            const axe = await new AxeBuilder({ page }).include('#main-content').analyze()
            expect(axe.violations).toEqual([])
        }
        for (const selector of ['.k-pro-ui', '.k-main', '.k-sidebar', '.k-topbar']) {
            // Main inherits a transparent background; its painted canvas is the shell.
            if (selector === '.k-main') continue
            if (await page.locator(selector).isVisible()) await expect(page.locator(selector)).toHaveCSS('background-color', 'rgb(0, 0, 0)')
        }
        const clipping = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1)
        expect(clipping).toBe(false)
        if (width >= 769) {
            const fits = await page.locator('.val-table-wrap').evaluate(el => el.scrollWidth <= el.clientWidth + 1)
            expect(fits).toBe(true)
            await expect(page.getByRole('columnheader')).toHaveCount(7)
            await expect(page.locator('.val-stat-value').nth(1)).toHaveText('4.0s')
            await expect(page.getByRole('columnheader', { name: 'Profile', exact: true })).toHaveCount(0)
        } else {
            await expect(page.getByTestId('validator-card-1')).toBeVisible()
            const first = await page.getByTestId('validator-card-1').boundingBox()
            expect(first!.y).toBeLessThan(700)
            await expect(page.locator('.pro-val-overview')).not.toHaveAttribute('open')
            await page.locator('.pro-val-overview summary').click()
            await expect(page.getByTestId('network-stats')).toBeVisible()
            await page.locator('.pro-val-overview summary').click()
        }
        await page.screenshot({ path: testInfo.outputPath(`fixture-black-${width}.png`), fullPage: true })
    })
}

test('optional fields, sort, search, tabs and light theme remain usable', async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 1440, height: 1000 })
    await page.goto('/pearl/validators')
    await expect(page.getByTestId('validator-row-1')).toBeVisible()
    await page.getByRole('combobox', { name: 'Theme', exact: true }).selectOption('light')
    await expect(page.locator('.k-pro-ui')).toHaveCSS('background-color', 'rgb(255, 255, 255)')
    await page.getByRole('checkbox', { name: 'All columns' }).check()
    await expect(page.getByRole('columnheader', { name: 'Profile', exact: true })).toBeVisible()
    await page.getByRole('button', { name: 'Participation', exact: true }).click()
    await expect(page.getByRole('columnheader', { name: 'Participation' })).toHaveAttribute('aria-sort', 'descending')
    await page.getByRole('checkbox', { name: 'All columns' }).uncheck()
    await expect(page.getByRole('columnheader', { name: 'Rank' })).toHaveAttribute('aria-sort', 'ascending')
    await page.getByRole('textbox', { name: 'Search validators' }).fill('no-matching-validator')
    await expect(page.getByRole('heading', { name: 'No matching validators' })).toBeVisible()
    await page.getByRole('button', { name: 'Clear search' }).click()
    await expect(page.locator('.val-table tbody tr')).toHaveCount(3)
    await page.evaluate(() => { const label = document.createElement('span'); label.textContent = 'Test fixture'; label.style.cssText = 'font-size:12px;color:var(--pro-secondary)'; document.querySelector('.val-header')!.appendChild(label) })
    await page.screenshot({ path: testInfo.outputPath('fixture-light-1440.png'), fullPage: true })
    // Audit the changed pilot content without disabling rules for its table.
    const axe = await new AxeBuilder({ page }).include('#main-content').analyze()
    expect(axe.violations).toEqual([])
    await page.getByRole('tab', { name: /Candidates/ }).click()
    await expect(page).toHaveURL(/tab=candidates/)
    await page.getByRole('tab', { name: /Network/ }).click()
    await expect(page).toHaveURL(/tab=network/)
    await page.getByRole('link', { name: 'Home', exact: true }).click()
    await expect(page.locator('.k-pro-ui')).toHaveCount(0)
})
