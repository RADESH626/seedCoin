import { test, expect, Page } from '@playwright/test';

// Define existing user credentials
const STANDARD_USER = {
    email: 'test@gmail.com',
    password: 'Contraseña123@'
};

// Configure serial mode for this file to share the page/session
test.describe.configure({ mode: 'serial' });

test.describe('Account Management Tests', () => {
    test.setTimeout(60000);

    let page: Page;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();

        // 1. Go to Login explicitly (No Registration)
        await page.goto('http://localhost:3000/iniciar-sesion');

        // 2. Login with existing user
        await page.getByLabel('Correo Electrónico').fill(STANDARD_USER.email);
        await page.getByLabel('Contraseña').fill(STANDARD_USER.password);
        await page.getByRole('button', { name: 'Iniciar Sesión' }).click();

        // 3. Verify Dashboard access
        await expect(page).toHaveURL('http://localhost:3000/dashboard');
    });

    test.afterAll(async () => {
        await page.close();
    });

    test.describe('Happy Paths - Create Accounts', () => {
        const accountTypes = [
            'Efectivo',
            'Cuenta Bancaria',
            'Tarjeta de Crédito',
            'Billetera Digital',
            'Inversión'
        ];

        for (const type of accountTypes) {
            test(`should create a "${type}" account successfully`, async () => {
                // Return to dashboard if not there (cleanup)
                if (page.url() !== 'http://localhost:3000/dashboard') {
                    await page.goto('http://localhost:3000/dashboard');
                }

                // Open Modal
                await page.getByLabel('Agregar Cuenta').click();
                await expect(page.getByText('Nueva Cuenta')).toBeVisible();

                // Select Type (handling icons)
                await page.locator('button').filter({ hasText: type }).first().click();

                // Fill details with unique name
                const accountName = `Mi ${type} ${Date.now()}`;
                const initialBalance = '100000';
                await page.getByPlaceholder('Ej. Ahorros Principal').fill(accountName);
                await page.getByPlaceholder('0.00').fill(initialBalance);

                // Submit
                await page.getByRole('button', { name: 'Crear Cuenta' }).click();

                // Verify Success Toast first
                await expect(page.getByText('Cuenta creada exitosamente')).toBeVisible();
                await expect(page.getByText('Nueva Cuenta')).toBeHidden();

                // Navigate to Accounts Page to verify visibility (Dashboard only shows top 3)
                // Use explicit navigation to avoid UI menu flakiness (responsive hiding, etc.)
                await page.goto('http://localhost:3000/dashboard/accounts');
                await expect(page).toHaveURL(/.*\/dashboard\/accounts/);

                // Verify Account Card is present in the full list
                await expect(page.getByText(accountName)).toBeVisible();

                // Go back to Dashboard for next test
                await page.goto('http://localhost:3000/dashboard');
            });
        }
    });

    test.describe('Unhappy Paths - Validation', () => {
        test('should fail if fields are empty', async () => {
            if (page.url() !== 'http://localhost:3000/dashboard') {
                await page.goto('http://localhost:3000/dashboard');
            }

            await page.getByLabel('Agregar Cuenta').click();
            await page.getByRole('button', { name: 'Crear Cuenta' }).click();

            await expect(page.getByText('Por favor completa todos los campos')).toBeVisible();

            // Close modal to reset state
            await page.locator('button').filter({ has: page.locator('svg.lucide-x') }).click();
            await expect(page.getByText('Nueva Cuenta')).toBeHidden();
        });

        test('should fail if account name is missing', async () => {
            await page.getByLabel('Agregar Cuenta').click();

            await page.locator('button').filter({ hasText: 'Efectivo' }).first().click();
            await page.getByPlaceholder('0.00').fill('50000');

            await page.getByRole('button', { name: 'Crear Cuenta' }).click();
            await expect(page.getByText('Por favor completa todos los campos')).toBeVisible();

            await page.locator('button').filter({ has: page.locator('svg.lucide-x') }).click();
        });
    });
});
