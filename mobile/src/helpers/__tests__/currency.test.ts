import { formatMoney, toCents, fromCents } from '../currency';

describe('currency helpers', () => {
  describe('formatMoney', () => {
    it('debe formatear correctamente en pesos colombianos (COP) sin decimales', () => {
      const result = formatMoney(1000000, 'COP');
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

  describe('conversions', () => {
    it('toCents debe convertir decimales a enteros correctamente', () => {
      expect(toCents(100.5)).toBe(10050);
      expect(toCents(100.555)).toBe(10056); // Redondeo
    });

    it('fromCents debe convertir céntimos a decimales correctamente', () => {
      expect(fromCents(10050)).toBe(100.5);
      expect(fromCents(1)).toBe(0.01);
    });
  });
});
