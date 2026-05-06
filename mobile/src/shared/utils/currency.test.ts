import { toCents, fromCents, formatMoney } from './currency';

describe('currency utils', () => {
  describe('toCents', () => {
    it('should convert decimal to cents correctly', () => {
      expect(toCents(10.50)).toBe(1050);
      expect(toCents(0.99)).toBe(99);
      expect(toCents(1)).toBe(100);
    });

    it('should handle floating point precision issues', () => {
      // 0.1 + 0.2 is famously 0.30000000000000004
      expect(toCents(0.1 + 0.2)).toBe(30);
    });

    it('should round correctly', () => {
      expect(toCents(10.505)).toBe(1051);
      expect(toCents(10.504)).toBe(1050);
    });
  });

  describe('fromCents', () => {
    it('should convert cents to decimal correctly', () => {
      expect(fromCents(1050)).toBe(10.50);
      expect(fromCents(99)).toBe(0.99);
      expect(fromCents(100)).toBe(1);
    });
  });

  describe('formatMoney', () => {
    it('should format USD correctly by default', () => {
      expect(formatMoney(1234.56)).toBe('$1,234.56');
      expect(formatMoney(10)).toBe('$10.00');
    });

    it('should format COP correctly', () => {
      // Note: toLocaleString might vary by environment (Node vs Browser)
      // but usually for COP it uses dots as thousand separators.
      const result = formatMoney(1234567, 'COP');
      expect(result).toMatch(/\$1[.,]234[.,]567/); // Flexible for dot or comma depending on locale setup
    });
  });
});
