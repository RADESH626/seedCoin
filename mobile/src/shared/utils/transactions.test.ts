import { groupTransactionsByDate } from './transactions';
import { DetailedTransaction } from '@/src/database/types';

// Mock date utils to have predictable labels
jest.mock('./date', () => ({
  getDateLabel: jest.fn((date) => {
    if (date.startsWith('2026-05-06')) return 'Hoy';
    if (date.startsWith('2026-05-05')) return 'Ayer';
    return 'Older';
  })
}));

describe('transactions utils', () => {
  describe('groupTransactionsByDate', () => {
    it('should group transactions by date label', () => {
      const mockTransactions: Partial<DetailedTransaction>[] = [
        { transaction_id: 1, transaction_date: '2026-05-06T10:00:00Z', amount: 100 },
        { transaction_id: 2, transaction_date: '2026-05-06T11:00:00Z', amount: 200 },
        { transaction_id: 3, transaction_date: '2026-05-05T09:00:00Z', amount: 50 },
        { transaction_id: 4, transaction_date: '2026-01-01T12:00:00Z', amount: 1000 },
      ];

      const result = groupTransactionsByDate(mockTransactions as DetailedTransaction[]);

      expect(Object.keys(result)).toEqual(['Hoy', 'Ayer', 'Older']);
      expect(result['Hoy']).toHaveLength(2);
      expect(result['Ayer']).toHaveLength(1);
      expect(result['Older']).toHaveLength(1);
      expect(result['Hoy'][0].transaction_id).toBe(1);
      expect(result['Hoy'][1].transaction_id).toBe(2);
    });

    it('should return empty object for empty list', () => {
      expect(groupTransactionsByDate([])).toEqual({});
    });
  });
});
