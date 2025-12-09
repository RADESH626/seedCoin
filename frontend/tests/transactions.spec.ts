import { test, expect, Page } from '@playwright/test';

const STANDARD_USER = {
    email: 'test@gmail.com',
    password: 'Contraseña123@'
};

test.describe('Transaction Management Tests', () => {
    test.describe.configure({ mode: 'serial' });
    test.setTimeout(180000);

    let page: Page;
    const accountName = 'Mi Billetera';

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();

        // 1. Go Directly to Login (No Registration)
        console.log('Navigating to Login...');
        await page.goto('http://localhost:3000/iniciar-sesion');
        await page.getByLabel('Correo Electrónico').fill(STANDARD_USER.email);
        await page.getByLabel('Contraseña').fill(STANDARD_USER.password);
        await page.getByRole('button', { name: 'Iniciar Sesión' }).click();

        await page.waitForTimeout(3000);

        console.log('Waiting for Dashboard URL...');
        await expect(page).toHaveURL('http://localhost:3000/dashboard');

        // 2. Create a Base Account (Needed for transactions)
        console.log('Waiting for Dinero Total...');
        // Ensure we wait for dashboard to load
        await expect(page.getByText('Dinero Total')).toBeVisible();

        // Check if account already exists
        const runAccountName = `${accountName} ${Date.now()}`;
        console.log(`Creating Account: ${runAccountName}`);

        await page.getByLabel('Agregar Cuenta').click();
        console.log('Modal Opened. Selecting Billetera Digital...');
        await page.locator('button').filter({ hasText: 'Billetera Digital' }).first().click();
        await page.getByPlaceholder('Ej. Ahorros Principal').fill(runAccountName);
        await page.getByPlaceholder('0.00').fill('5000000');
        await page.getByRole('button', { name: 'Crear Cuenta' }).click();

        console.log('Waiting for Success Toast...');
        await expect(page.getByText('Cuenta creada exitosamente')).toBeVisible();
        await expect(page.getByText('Cuenta creada exitosamente')).toBeHidden();
        await expect(page.getByText('Nueva Cuenta')).toBeHidden();
        console.log('Setup Complete.');
    });

    test.afterAll(async () => {
        await page.close();
    });

    const incomeCategories = [
        { name: 'Salario', icon: '💰' },
        { name: 'Negocio', icon: '🏪' },
        { name: 'Rendimientos', icon: '📊' },
        { name: 'Regalos', icon: '🎁' },
        { name: 'Otros Ingresos', icon: '💵' }
    ];

    const expenseCategories = [
        { name: 'Alimentación', icon: '🍔' },
        { name: 'Vivienda', icon: '🏠' },
        { name: 'Transporte', icon: '🚌' },
        { name: 'Servicios', icon: '💡' },
        { name: 'Entretenimiento', icon: '🎬' },
        { name: 'Salud', icon: '💊' },
        { name: 'Compras', icon: '🛍️' },
        { name: 'Otros Gastos', icon: '💸' }
    ];

    test.describe('Income Transactions', () => {
        for (const cat of incomeCategories) {
            test(`should add income for "${cat.name}"`, async () => {
                await page.waitForTimeout(2000); // Wait for button to be interactive
                await page.getByRole('button', { name: 'Agregar Transacción' }).click({ force: true });
                await expect(page.getByText('Nueva Transacción')).toBeVisible();

                // Select Type: Income
                await page.getByRole('button', { name: 'Ingreso' }).click();

                // Fill details
                await page.getByPlaceholder('0.00').fill('50000');
                const incomeName = `Ingreso por ${cat.name} ${Date.now()}`;
                await page.getByPlaceholder('Ej. Mercado, Salario...').fill(incomeName);

                // Select Category. Find the select inside the container labeled "Categoría"
                const categoryLabel = `${cat.icon} ${cat.name}`;
                const categoryContainer = page.locator('div.space-y-1', { hasText: 'Categoría' });
                await categoryContainer.locator('select').selectOption({ label: categoryLabel });

                // Submit
                await page.getByRole('button', { name: 'Guardar Transacción' }).click();

                await page.waitForTimeout(2000); // Wait for processing

                // Scroll to bottom to see the list
                await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

                // Verify
                await expect(page.getByText('Transacción creada exitosamente').first()).toBeVisible();
                // await expect(page.getByText(incomeName).first()).toBeVisible();

                // Cleanup / Stability
                await expect(page.getByText('Nueva Transacción')).toBeHidden();
                await page.waitForTimeout(1000);
            });
        }
    });

    test.describe('Expense Transactions', () => {
        for (const cat of expenseCategories) {
            test(`should add expense for "${cat.name}"`, async () => {
                await page.waitForTimeout(2000); // Wait for button to be interactive
                await page.getByRole('button', { name: 'Agregar Transacción' }).click({ force: true });

                // Type defaults to Expense, but good to ensure
                // await page.getByRole('button', { name: 'Gasto' }).click();
                await expect(page.getByText('Nueva Transacción')).toBeVisible();

                await page.getByPlaceholder('0.00').fill('20000');
                const expenseName = `Gasto en ${cat.name} ${Date.now()}`;
                await page.getByPlaceholder('Ej. Mercado, Salario...').fill(expenseName);

                const categoryLabel = `${cat.icon} ${cat.name}`;
                const categoryContainer = page.locator('div.space-y-1', { hasText: 'Categoría' });
                await categoryContainer.locator('select').selectOption({ label: categoryLabel });

                await page.getByRole('button', { name: 'Guardar Transacción' }).click();

                await page.waitForTimeout(2000); // Wait for processing

                // Scroll to bottom to see the list
                await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

                await expect(page.getByText('Transacción creada exitosamente').first()).toBeVisible();
                // await expect(page.getByText(expenseName).first()).toBeVisible();

                // Cleanup / Stability
                await expect(page.getByText('Nueva Transacción')).toBeHidden();
                await page.waitForTimeout(1000);
            });
        }
    });
});
