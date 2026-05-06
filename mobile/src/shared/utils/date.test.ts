import { getDateLabel, getTimeLabel } from './date';

describe('date utils', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    // Set a fixed date: 2026-05-06T12:00:00Z
    jest.setSystemTime(new Date('2026-05-06T12:00:00Z'));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe('getDateLabel', () => {
    it('should return "Hoy" for current date', () => {
      const today = new Date('2026-05-06T08:00:00Z').toISOString();
      expect(getDateLabel(today)).toBe('Hoy');
    });

    it('should return "Ayer" for previous date', () => {
      const yesterday = new Date('2026-05-05T08:00:00Z').toISOString();
      expect(getDateLabel(yesterday)).toBe('Ayer');
    });

    it('should return formatted date for older dates', () => {
      const older = new Date('2026-01-01T08:00:00Z').toISOString();
      // Format: "1 de enero de 2026"
      expect(getDateLabel(older)).toBe('1 de enero de 2026');
    });
  });

  describe('getTimeLabel', () => {
    it('should return formatted time', () => {
      const timeStr = '2026-05-06T14:30:00Z';
      const result = getTimeLabel(timeStr);
      // More flexible regex to handle "AM", "PM", "A. M.", "p. m.", etc.
      expect(result).toMatch(/\d{2}:\d{2}/);
      expect(result.toLowerCase()).toContain('m'); // Should contain 'm' from AM/PM
    });

    it('should return empty string for null input', () => {
      expect(getTimeLabel('')).toBe('');
    });
  });
});
