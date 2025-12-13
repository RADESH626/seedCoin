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



        test('Should successfully login with valid credentials', async ({ page }) => {
            await page.goto('/iniciar-sesion');
            await page.getByLabel('Correo Electrónico').fill('test@gmail.com');
            await page.getByLabel('Contraseña').fill('Contraseña123@');
            await page.click('button:has-text("Iniciar Sesión")');

            // Expect to be redirected to dashboard
            await expect(page).toHaveURL(/\/dashboard/);
        });

        test('Should redirect unauthenticated user from protected route', async ({ page }) => {
            await page.goto('/dashboard');
            await expect(page).toHaveURL(/\/iniciar-sesion/);
        });
    });

    test.describe('Password Visibility', () => {
        test('Should toggle password visibility in Login', async ({ page }) => {
            await page.goto('/iniciar-sesion');

            const passwordInput = page.locator('#password'); // Direct ID selector
            await expect(passwordInput).toHaveAttribute('type', 'password');

            // Click eye icon. Use adjacent sibling selector
            await page.locator('#password + button').click();
            await expect(passwordInput).toHaveAttribute('type', 'text');

            await page.locator('#password + button').click();
            await expect(passwordInput).toHaveAttribute('type', 'password');
        });

        test('Should toggle password visibility in Register', async ({ page }) => {
            await page.goto('/registro');

            const passwordInput = page.locator('#password');
            const confirmInput = page.locator('#confirmPassword');

            await expect(passwordInput).toHaveAttribute('type', 'password');
            await expect(confirmInput).toHaveAttribute('type', 'password');

            // Toggle Password
            await page.locator('#password + button').click();
            await expect(passwordInput).toHaveAttribute('type', 'text');

            // Toggle Confirm Password
            await page.locator('#confirmPassword + button').click();
            await expect(confirmInput).toHaveAttribute('type', 'text');
        });
    });
});
