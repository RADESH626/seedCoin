import { getDateLabel, getTimeLabel } from '@/src/helpers/date';

describe('Date Helpers', () => {
  beforeAll(() => {
    // Mock system time to a fixed date so 'Hoy' and 'Ayer' are deterministic
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-04-15T12:00:00Z'));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe('getDateLabel', () => {
    it('returns "Hoy" for the current date', () => {
      const today = new Date('2026-04-15T10:00:00Z').toISOString();
      expect(getDateLabel(today)).toBe('Hoy');
    });

    it('returns "Ayer" for yesterday', () => {
      const yesterday = new Date('2026-04-14T10:00:00Z').toISOString();
      expect(getDateLabel(yesterday)).toBe('Ayer');
    });

    it('returns formatted date for older dates', () => {
      const olderDate = new Date('2026-04-10T10:00:00Z').toISOString();
      // En locale es-CO produce "10 de abril de 2026"
      expect(getDateLabel(olderDate)).toBe('10 de abril de 2026');
    });
  });

  describe('getTimeLabel', () => {
    it('returns formatted time in 12-hour format with AM', () => {
      // 08:30 local
      const morning = new Date('2026-04-15T08:30:00').toISOString();
      expect(getTimeLabel(morning)).toMatch(/08:30 (a.\s*m.|AM)/i);
    });

    it('returns formatted time in 12-hour format with PM', () => {
      // 14:45 local
      const afternoon = new Date('2026-04-15T14:45:00').toISOString();
      expect(getTimeLabel(afternoon)).toMatch(/02:45 (p.\s*m.|PM)/i);
    });

    it('returns empty string if dateString is empty', () => {
      expect(getTimeLabel('')).toBe('');
    });
  });
});
