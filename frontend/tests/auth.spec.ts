import { test, expect } from '@playwright/test';

test.describe('Authentication & Security', () => {

    test.describe('Registration', () => {

        test('Should fail if passwords do not match', async ({ page }) => {
            await page.goto('/registro');

            await page.getByLabel('Nombre').fill('Bad');
            await page.getByLabel('Apellido').fill('Pass');
            await page.getByLabel('Correo Electrónico').fill('nomatch@test.com');
            await page.getByLabel('Contraseña').fill('123456');
            await page.getByLabel('Confirmar').fill('654321');

            await page.click('button:has-text("Registrarse")');

            // Expect toast error
            await expect(page.getByText('Las contraseñas no coinciden')).toBeVisible();
        });

        test('Should successfuly register new user', async ({ page }) => {
            const email = `newuser${Date.now()}@test.com`;
            await page.goto('/registro');

            await page.getByLabel('Nombre').fill('Good');
            await page.getByLabel('Apellido').fill('User');
            await page.getByLabel('Correo Electrónico').fill(email);
            await page.getByLabel('Contraseña').fill('Password123');
            await page.getByLabel('Confirmar').fill('Password123');

            await page.click('button:has-text("Registrarse")');

            // Redirect to Login
            await expect(page).toHaveURL(/\/iniciar-sesion/);
        });
    });

    test.describe('Login', () => {
        // We need a known user for negative login tests. 
        // Best practice: Register one beforeAll, OR use a random invalid one.

        test('Should fail with invalid credentials', async ({ page }) => {
            await page.goto('/iniciar-sesion');
            await page.getByLabel('Correo Electrónico').fill('wrong@email.com');
            await page.getByLabel('Contraseña').fill('wrongpass');
            await page.click('button:has-text("Iniciar Sesión")');

            // Expect generic error or specific backend message
            // Based on UserServiceImpl, it might throw 401/404.
            // Frontend toast usually shows the error.
            // Adjust assertion based on actual error message.
            // Usually "Credenciales inválidas" or "Usuario no encontrado"
            // For now, check for ANY error toast.
            await expect(page.locator('li[data-type="error"]')).toBeVisible();
        });

        test('Should redirect unauthenticated user from protected route', async ({ page }) => {
            await page.goto('/dashboard');
            await expect(page).toHaveURL(/\/iniciar-sesion/);
        });
    });
});
