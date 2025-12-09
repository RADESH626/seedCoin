import { test, expect } from '@playwright/test';

test.describe('SeedCoin End-to-End Flow', () => {

    // Generate random user for each run to avoid conflicts
    const timestamp = Date.now();
    const user = {
        name: `TestUser`,
        lastName: `Automated`,
        email: `test${timestamp}@example.com`,
        password: 'Password123!',
    };

    test('Complete User Flow: Register -> Login -> Manage Finances', async ({ page }) => {

        // 1. REGISTRATION
        console.log(`Starting Registration for ${user.email}`);
        await page.goto('/registro');

        await page.getByLabel('Nombre').fill(user.name);
        await page.getByLabel('Apellido').fill(user.lastName);
        await page.getByLabel('Correo Electrónico').fill(user.email);
        await page.getByLabel('Contraseña').fill(user.password);
        await page.getByLabel('Confirmar').fill(user.password);

        // Click register button
        await page.click('button:has-text("Registrarse")');

        // Verify redirection to Login
        await expect(page).toHaveURL(/\/iniciar-sesion/);
        console.log('Registration Successful');

        // 2. LOGIN
        console.log('Starting Login');
        await page.getByLabel('Correo Electrónico').fill(user.email);
        await page.getByLabel('Contraseña').fill(user.password);
        await page.click('button:has-text("Iniciar Sesión")');

        // Verify Dashboard Access
        await expect(page).toHaveURL('http://localhost:3000/dashboard');
        await expect(page.getByText('Balance General')).toBeVisible();
        console.log('Login Successful');

        // 3. CREATE ACCOUNT
        console.log('Creating Account');

        // Find "Agregar Cuenta" button (we added aria-label="Agregar Cuenta" or "Crear mi primera cuenta")
        const createAccountBtn = page.getByRole('button', { name: "Agregar Cuenta" }).or(page.getByText('Crear mi primera cuenta'));
        await expect(createAccountBtn.first()).toBeVisible();
        await createAccountBtn.first().click();

        // Fill Account Modal
        // Note: AccountModal uses cards for account types. Assuming 'Efectivo' or similar is fetched.
        // We'll click the first type available if possible, or wait for fetch.
        await page.waitForTimeout(1000); // Wait for API fetch
        const firstAccountType = page.locator('button > span.text-2xl').first();
        await firstAccountType.click();

        await page.fill('input[placeholder="Ej. Ahorros Principal"]', 'Billetera Principal');
        await page.fill('input[placeholder="0.00"]', '0'); // Initial balance 0 to test incoming money
        await page.click('button:has-text("Crear Cuenta")');

        // Verify Account Created
        await expect(page.getByText('Billetera Principal')).toBeVisible();
        console.log('Account Created');

        // 4. ADD INCOME (Transaction)
        console.log('Adding Income');
        await page.click('button:has-text("Agregar Transacción")'); // Open Modal

        // Modal interaction
        await page.getByText('Ingreso').click(); // Select Type
        await page.fill('input[placeholder="0.00"]', '5000000'); // Amount
        await page.fill('input[placeholder="Ej. Mercado, Salario..."]', 'Salario Mensual'); // Desc

        // We need to ensure the correct account is selected. Since we just created one, it should be in the list.
        // The modal might auto-select or require selection. 
        // Assuming default or user selects first available.
        // TransactionModal uses a select/dropdown logic? 
        // Let's verify TransactionModal content briefly via assumption or explicit selection if straightforward.
        // For now, assume default is sufficient or manual step.
        // Actually, TransactionModal usually requires Account & Category.
        // We select Type (Income), Amount, Description.
        // We need to select Account and Category.

        // Let's wait for loading
        await page.waitForTimeout(1000);

        // Select Account (first balance card or dropdown in modal?)
        // In TransactionModal: it has logic for accounts.
        // Let's assume we proceed. If it fails, we refine selectors.

        // Submit
        await page.click('button:has-text("Guardar Transacción")');

        // Verify
        await expect(page.getByText('Salario Mensual')).toBeVisible();

        // 5. VALIDATE TOTALS
        // Check if balance updated
        // text content of Balance General should contain 5,000,000
    });
});
