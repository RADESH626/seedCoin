import { test, expect } from '@playwright/test';

test.describe('Functional Flows', () => {

    // Shared user for this suite
    const user = {
        name: 'FuncUser',
        lastName: 'Test',
        email: 'test@gmail.com',
        password: 'Contraseña123@'
    };

    test.beforeAll(async ({ browser }) => {
        // Register the user ONCE for the whole suite used herein?
        // Actually, individual tests run in isolation unless we use storageState.
        // For simplicity, we will register in a helper for each test or just register once using a browser context.
        // Let's do a "setup" step inside the tests or maintain a single flow for dependent steps.
        // To properly test "Add Transaction" we NEED an account.
        // So we will stick to a linear flow test for "The Lifetime of a User" or similar.
    });

    test('Full Functional Cycle', async ({ page }) => {

        // --- SETUP: Login ---
        await page.goto('/iniciar-sesion');

        await page.getByLabel('Correo Electrónico').fill(user.email);
        await page.getByLabel('Contraseña').fill(user.password);
        await page.click('button:has-text("Iniciar Sesión")');
        await page.waitForTimeout(3000);
        await expect(page).toHaveURL('http://localhost:3000/dashboard');


        // --- ACCOUNTS ---

        // Unhappy Path: Empty Form
        await page.getByLabel('Agregar Cuenta').or(page.getByText('Crear mi primera cuenta')).first().click();
        await page.click('button:has-text("Crear Cuenta")');
        await expect(page.getByText('Por favor completa todos los campos')).toBeVisible();
        await page.getByRole('button').filter({ has: page.locator('svg.lucide-x') }).click(); // Close or just Re-fill

        // Happy Path: Create Account
        await page.getByLabel('Agregar Cuenta').click();
        await page.locator('button').filter({ hasText: 'Efectivo' }).first().click();
        const accountName = `Bank Test ${Date.now()}`;
        await page.fill('input[placeholder="Ej. Ahorros Principal"]', accountName);
        await page.fill('input[placeholder="0.00"]', '1000');
        await page.click('button:has-text("Crear Cuenta")');

        await expect(page.getByText('Cuenta creada exitosamente')).toBeVisible();

        // Navigate to Accounts Page to verify (since Dashboard limits items)
        await page.goto('http://localhost:3000/dashboard/accounts');
        await page.waitForTimeout(2000);
        await expect(page.getByText(accountName)).toBeVisible();
        await expect(page.getByText('$1,000')).toBeVisible();

        // Return to dashboard for next steps
        await page.goto('http://localhost:3000/dashboard');


        // --- TRANSACTIONS ---

        // Happy Path: Add Income
        const transactionName = `Extra Cash ${Date.now()}`;
        await page.click('button:has-text("Agregar Transacción")');
        await page.getByText('Ingreso').click();
        await page.fill('input[placeholder="0.00"]', '500');
        await page.fill('input[placeholder="Ej. Mercado, Salario..."]', transactionName);
        await page.waitForTimeout(500); // Allow account/category to load
        await page.click('button:has-text("Guardar Transacción")');

        await page.waitForTimeout(2000); // Wait for list update

        await expect(page.getByText(transactionName)).toBeVisible();

        // Might be loose, but acceptable for MVP


        // Unhappy Path: Submit Empty Transaction 
        await page.click('button:has-text("Agregar Transacción")');
        await page.click('button:has-text("Guardar Transacción")');
        await expect(page.getByText('Por favor completa todos los campos')).toBeVisible();
        // Close modal
        await page.getByRole('button').filter({ has: page.locator('svg.lucide-x') }).first().click();
    });

});
