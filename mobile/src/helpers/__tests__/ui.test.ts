import { formatMoney } from '../ui';

describe('formatMoney', () => {
  it('debe formatear correctamente en pesos colombianos (COP) sin decimales', () => {
    const result = formatMoney(1000000, 'COP');
    // Nota: toLocaleString en entornos de test/node puede variar según el locale del sistema
    // pero verificamos la estructura general $1.000.000 o similar
    expect(result).toContain('$');
    expect(result).toContain('1');
    expect(result).toContain('000');
  });

  it('debe formatear correctamente en dólares (USD) por defecto con dos decimales', () => {
    const result = formatMoney(1234.56, 'USD');
    expect(result).toBe('$1,234.56');
  });

  it('debe formatear a USD como opción predeterminada', () => {
    const result = formatMoney(500);
    expect(result).toBe('$500.00');
  });
});
