import { test, expect, Page } from '@playwright/test';
import { API_URL } from '../src/config';

const STANDARD_USER = {
    email: 'test@gmail.com',
    password: 'Contraseña123@'
};

test.describe('Scheduled Transactions (Automated Expenses/Incomes)', () => {
    test.describe.configure({ mode: 'serial' });
    test.setTimeout(180000);

    let page: Page;
    let userId: number;
    let accountId: number;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();

        // Login
        await page.goto('http://localhost:3000/iniciar-sesion');
        await page.getByLabel('Correo Electrónico').fill(STANDARD_USER.email);
        await page.getByLabel('Contraseña').fill(STANDARD_USER.password);
        await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
        await expect(page).toHaveURL('http://localhost:3000/dashboard');

        // Create Account for testing
        await page.getByLabel('Agregar Cuenta').click();
        await page.locator('button').filter({ hasText: 'Billetera Digital' }).first().click();
        const accountName = `AutoTest ${Date.now()}`;
        await page.getByPlaceholder('Ej. Ahorros Principal').fill(accountName);
        await page.getByPlaceholder('0.00').fill('1000000');
        await page.getByRole('button', { name: 'Crear Cuenta' }).click();
        await expect(page.getByText('Cuenta creada exitosamente')).toBeVisible();
        await page.getByLabel('Cerrar').click({ force: true });
    });

    test.afterAll(async () => {
        await page.close();
    });

    test('should create a Scheduled Expense', async () => {
        // Navigate
        await page.getByText('Programación').click();
        await expect(page).toHaveURL(/.*\/scheduled-expenses/);

        // Open Modal
        await page.getByRole('button', { name: 'Nuevo' }).click();
        await expect(page.getByText('Nueva Programación')).toBeVisible();

        // Fill Form
        await page.getByRole('button', { name: 'Gasto' }).click();
        await page.getByPlaceholder('0.00').fill('50000');
        await page.getByPlaceholder('Ej. Suscripción Netflix...').fill('Netflix Monthly');

        // Select Account (first available)
        const accountSelect = page.locator('div.space-y-1', { hasText: 'Cuenta' }).locator('select');
        await accountSelect.selectOption({ index: 1 });

        // Select Category
        const categorySelect = page.locator('div.space-y-1', { hasText: 'Categoría' }).locator('select');
        await categorySelect.selectOption({ index: 1 }); // e.g., Alimentación or whatever is first

        // Select Frequency
        const freqSelect = page.locator('div.space-y-1', { hasText: 'Frecuencia' }).locator('select');
        await freqSelect.selectOption({ label: 'Mensual' });

        // Submit
        await page.getByRole('button', { name: 'Crear Programación' }).click();

        // Verify
        await expect(page.getByText('Programación creada exitosamente')).toBeVisible();
        await expect(page.getByText('Netflix Monthly')).toBeVisible();
    });

    test('should execute a Scheduled Expense (Manual Trigger)', async ({ request }) => {
        // 1. Create a transaction due TODAY
        await page.getByRole('button', { name: 'Nuevo' }).click();

        const testName = `AutoPay Verify ${Date.now()}`;
        await page.getByPlaceholder('0.00').fill('15000');
        await page.getByPlaceholder('Ej. Suscripción Netflix...').fill(testName);

        // Set Date to Today
        const today = new Date().toISOString().split('T')[0];
        await page.locator('input[type="date"]').fill(today);

        // Select Account & Category
        await page.locator('div.space-y-1', { hasText: 'Cuenta' }).locator('select').selectOption({ index: 1 });
        await page.locator('div.space-y-1', { hasText: 'Categoría' }).locator('select').selectOption({ index: 1 });

        await page.getByRole('button', { name: 'Crear Programación' }).click();
        await expect(page.getByText('Programación creada exitosamente')).toBeVisible();

        // 2. Trigger the Backend Process via API
        const response = await request.post(`${API_URL}/scheduled-transactions/process`);
        expect(response.ok()).toBeTruthy();

        // 3. Check Dashboard for the executed transaction
        await page.goto('http://localhost:3000/dashboard');

        // It might take a moment or reload
        // Look for the transaction in recent list
        await expect(page.getByText(testName)).toBeVisible();

        // Optional: Check if amount is red (Expense)
        const amountEl = page.locator('tr', { hasText: testName }).locator('.text-red-600');
        await expect(amountEl).toBeVisible();
    });

    test('should execute a Scheduled Income (Manual Trigger)', async ({ request }) => {
        // Navigate
        await page.goto('http://localhost:3000/dashboard/scheduled-expenses');

        // 1. Create Income due TODAY
        await page.getByRole('button', { name: 'Nuevo' }).click();

        await page.getByRole('button', { name: 'Ingreso' }).click(); // Click Type Income

        const testName = `AutoIncome Verify ${Date.now()}`;
        await page.getByPlaceholder('0.00').fill('500000');
        await page.getByPlaceholder('Ej. Suscripción Netflix...').fill(testName);

        // Set Date to Today
        const today = new Date().toISOString().split('T')[0];
        await page.locator('input[type="date"]').fill(today);

        // Select Account & Category
        await page.locator('div.space-y-1', { hasText: 'Cuenta' }).locator('select').selectOption({ index: 1 });
        await page.locator('div.space-y-1', { hasText: 'Categoría' }).locator('select').selectOption({ index: 1 });

        await page.getByRole('button', { name: 'Crear Programación' }).click();
        await expect(page.getByText('Programación creada exitosamente')).toBeVisible();

        // 2. Trigger
        const response = await request.post(`${API_URL}/scheduled-transactions/process`);
        expect(response.ok()).toBeTruthy();

        // 3. Check Dashboard
        await page.goto('http://localhost:3000/dashboard');

        // Look for the transaction
        await expect(page.getByText(testName)).toBeVisible();

        // Check if amount is green (Income)
        // Note: class check might vary depending on exact UI implementation, usually 'text-green-600'
        const amountEl = page.locator('tr', { hasText: testName }).locator('.text-green-600'); // Assuming income is green
        await expect(amountEl).toBeVisible();
    });
});
