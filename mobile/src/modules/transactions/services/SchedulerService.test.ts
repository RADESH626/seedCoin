import { SchedulerService } from '@/src/modules/transactions/services/SchedulerService';
import { RecurrenceFrequency } from '@/src/database/types';

describe('SchedulerService', () => {
  describe('calculateNextOccurrence', () => {
    it('should correctly calculate DAILY recurrence', () => {
      const base = '2024-01-01T10:00:00.000Z';
      const next = SchedulerService.calculateNextOccurrence(base, 'DAILY');
      expect(next).toBe('2024-01-02T10:00:00.000Z');
    });

    it('should correctly calculate WEEKLY recurrence', () => {
      const base = '2024-01-01T10:00:00.000Z'; // Lunes
      const next = SchedulerService.calculateNextOccurrence(base, 'WEEKLY');
      expect(next).toBe('2024-01-08T10:00:00.000Z');
    });

    it('should correctly calculate BIWEEKLY recurrence', () => {
      const base = '2024-01-01T10:00:00.000Z';
      const next = SchedulerService.calculateNextOccurrence(base, 'BIWEEKLY');
      expect(next).toBe('2024-01-15T10:00:00.000Z');
    });

    it('should correctly calculate MONTHLY recurrence', () => {
      const base = '2024-01-15T10:00:00.000Z';
      const next = SchedulerService.calculateNextOccurrence(base, 'MONTHLY');
      expect(next).toBe('2024-02-15T10:00:00.000Z');
    });

    it('should handle MONTHLY recurrence at end of month (Jan 31 to Feb)', () => {
      const base = '2024-01-31T10:00:00.000Z';
      const next = SchedulerService.calculateNextOccurrence(base, 'MONTHLY');
      // 2024 es bisiesto
      expect(next).toBe('2024-02-29T10:00:00.000Z');
    });

    it('should handle MONTHLY recurrence at end of month (Mar 31 to Apr)', () => {
      const base = '2024-03-31T10:00:00.000Z';
      const next = SchedulerService.calculateNextOccurrence(base, 'MONTHLY');
      // Abril tiene 30 días
      expect(next).toBe('2024-04-30T10:00:00.000Z');
    });

    it('should correctly calculate YEARLY recurrence', () => {
      const base = '2024-01-01T10:00:00.000Z';
      const next = SchedulerService.calculateNextOccurrence(base, 'YEARLY');
      expect(next).toBe('2025-01-01T10:00:00.000Z');
    });
  });
});
