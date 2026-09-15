import { test, expect } from '@playwright/test'
import { MOBILE_375, expectNoMobileOverflow } from './helpers/overflow'

/**
 * Create DAO E2E — verifies the 5-step DAO creation wizard.
 * Tests wizard structure, navigation, and form validation.
 * No wallet required.
 */

test.describe('Create DAO Wizard', () => {
    test('wizard loads with step 1 (Preset)', async ({ page }) => {
        await page.goto('/dao/create')
        await expect(page.locator('body')).toContainText(/Create|DAO/)
        // Should show preset options
        await expect(page.locator('body')).toContainText(/Basic|Team|Treasury|Enterprise/)
    })

    test('step indicator text visible', async ({ page }) => {
        await page.goto('/dao/create')
        // Step 1 label should show "Name, Path & Preset"
        await expect(page.locator('body')).toContainText(/Name.*Path|Preset/)
    })

    test('step 1 has preset cards', async ({ page }) => {
        await page.goto('/dao/create')
        await expect(page.locator('body')).toContainText('Basic')
        await expect(page.locator('body')).toContainText('Team')
    })

    test('create DAO at 375px — no overflow', async ({ page }) => {
        await page.setViewportSize(MOBILE_375)
        await page.goto('/dao/create')
        // The wizard header + step rail are the widest things on this route;
        // measuring before they exist proved nothing (~304 chars vs 1089 settled).
        await expect(page.getByRole('heading', { name: /Create a DAO/ })).toBeVisible()
        await expectNoMobileOverflow(page)
    })
    test('duplicate founders are rejected before governance review', async ({ page }) => {
        await page.goto('/dao/create')
        await page.getByPlaceholder('My DAO', { exact: true }).fill('Configuration Test DAO')
        await page.getByPlaceholder('gno.land/r/username/mydao', { exact: true }).fill('gno.land/r/test/configuration_test')
        await page.getByRole('button', { name: 'Next: Members & Roles →' }).click()
        const address = 'g1747t5m2f08plqjlrjk2q0qld7465hxz8gkx59c'
        await page.getByPlaceholder('g1...', { exact: true }).first().fill(address)
        await page.getByRole('button', { name: /Add Member/ }).click()
        await page.getByPlaceholder('g1...', { exact: true }).nth(1).fill(address)
        await page.getByRole('button', { name: 'Next: Governance →' }).click()
        await expect(page.getByText('Duplicate member addresses are not allowed')).toBeVisible()
        await expect(page.getByRole('heading', { name: 'Initial Members & Roles' })).toBeVisible()
        await page.getByPlaceholder('g1...', { exact: true }).nth(1).fill('g1jg8mtutu9khhfwc4nxmuhcpftf0pajdhfvsqf5')
        await page.getByRole('button', { name: 'Next: Governance →' }).click()
        await expect(page.getByText('Governance Settings', { exact: true }).first()).toBeVisible()
    })

    test('an invalid Gno package name stays on the first step', async ({ page }) => {
        await page.goto('/dao/create')
        await page.getByPlaceholder('My DAO', { exact: true }).fill('Configuration Test DAO')
        await page.getByPlaceholder('gno.land/r/username/mydao', { exact: true }).fill('gno.land/r/test/123dao')
        await page.getByRole('button', { name: 'Next: Members & Roles →' }).click()
        await expect(page.getByText('Realm name must be a valid, non-reserved Gno package identifier')).toBeVisible()
        await expect(page.getByPlaceholder('My DAO', { exact: true })).toBeVisible()
    })

})
