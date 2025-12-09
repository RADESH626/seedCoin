import { test, expect } from '@playwright/test';

test.describe('Functional Flows', () => {

    // Shared user for this suite
    const user = {
        name: 'FuncUser',
        lastName: 'Test',
        email: `func${Date.now()}@test.com`,
        password: 'Password123'
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

        // --- SETUP: Register & Login ---
        await page.goto('/registro');
        await page.getByLabel('Nombre').fill(user.name);
        await page.getByLabel('Apellido').fill(user.lastName);
        await page.getByLabel('Correo Electrónico').fill(user.email);
        await page.getByLabel('Contraseña').fill(user.password);
        await page.getByLabel('Confirmar').fill(user.password);
        await page.click('button:has-text("Registrarse")');
        await expect(page).toHaveURL(/\/iniciar-sesion/);

        await page.getByLabel('Correo Electrónico').fill(user.email);
        await page.getByLabel('Contraseña').fill(user.password);
        await page.click('button:has-text("Iniciar Sesión")');
        await expect(page).toHaveURL('http://localhost:3000/dashboard');


        // --- ACCOUNTS ---

        // Unhappy Path: Empty Form
        await page.getByLabel('Agregar Cuenta').or(page.getByText('Crear mi primera cuenta')).first().click();
        await page.click('button:has-text("Crear Cuenta")');
        await expect(page.getByText('Por favor completa todos los campos')).toBeVisible();
        await page.getByRole('button').filter({ has: page.locator('svg.lucide-x') }).click(); // Close or just Re-fill

        // Happy Path: Create Account
        // Re-open if closed, or just fill if it stayed open (Toast usually doesn't close modal)
        // If modal stayed open, we can fill.
        // AccountModal keeps state? Yes.
        await page.getByText('Efectivo').first().click();
        await page.fill('input[placeholder="Ej. Ahorros Principal"]', 'Bank Test');
        await page.fill('input[placeholder="0.00"]', '1000');
        await page.click('button:has-text("Crear Cuenta")');

        await expect(page.getByText('Bank Test')).toBeVisible();
        await expect(page.getByText('$1,000')).toBeVisible();


        // --- TRANSACTIONS ---

        // Happy Path: Add Income
        await page.click('button:has-text("Agregar Transacción")');
        await page.getByText('Ingreso').click();
        await page.fill('input[placeholder="0.00"]', '500');
        await page.fill('input[placeholder="Ej. Mercado, Salario..."]', 'Extra Cash');
        await page.waitForTimeout(500); // Allow account/category to load
        await page.click('button:has-text("Guardar Transacción")');

        await expect(page.getByText('Extra Cash')).toBeVisible();

        // Verify Balance Update: 1000 + 500 = 1500
        // We look for 1,500 in the dashboard summary
        await expect(page.locator('text=$1,500')).toBeVisible(); // Might be loose, but acceptable for MVP


        // Unhappy Path: Submit Empty Transaction 
        await page.click('button:has-text("Agregar Transacción")');
        await page.click('button:has-text("Guardar Transacción")');
        await expect(page.getByText('Por favor completa todos los campos')).toBeVisible();
        // Close modal
        await page.getByRole('button').filter({ has: page.locator('svg.lucide-x') }).first().click();
    });

});
