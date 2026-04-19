import { groupTransactionsByDate } from '@/src/helpers/transactions';
import type { DetailedTransaction } from '@/src/database/types';

describe('Transactions Helpers', () => {
  beforeAll(() => {
    // Set system time to 15th of April 2026 to ensure Hoy is deterministic
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-04-15T12:00:00Z'));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe('groupTransactionsByDate', () => {
    it('groups transactions by the date label provided by getDateLabel', () => {
      const mockTransactions: DetailedTransaction[] = [
        {
          transaction_id: 1,
          account_id: 1,
          is_income: 1,
          amount: 500,
          category_id: 1,
          transaction_date: '2026-04-15T10:00:00Z',
          status: 'COMPLETED',
          created_at: '2026-04-15T10:00:00Z',
          category_name: 'Salary',
          category_color: '#000',
          category_icon: 'money',
          account_name: 'Main',
          description: 'Salary',
          is_automatic: 1
        },
        {
          transaction_id: 2,
          account_id: 1,
          is_income: 0,
          amount: 200,
          category_id: 2,
          transaction_date: '2026-04-15T11:00:00Z',
          status: 'COMPLETED',
          created_at: '2026-04-15T11:00:00Z',
          category_name: 'Food',
          category_color: '#000',
          category_icon: 'food',
          account_name: 'Main',
          description: 'Lunch',
          is_automatic: 1
        },
        {
          transaction_id: 3,
          account_id: 1,
          is_income: 0,
          amount: 100,
          category_id: 2,
          transaction_date: '2026-04-14T15:00:00Z',
          status: 'COMPLETED',
          created_at: '2026-04-14T15:00:00Z',
          category_name: 'Food',
          category_color: '#000',
          category_icon: 'food',
          account_name: 'Main',
          description: 'Dinner',
          is_automatic: 1
        }
      ];

      const grouped = groupTransactionsByDate(mockTransactions);

      expect(Object.keys(grouped)).toEqual(['Hoy', 'Ayer']);
      expect(grouped['Hoy']).toHaveLength(2);
      expect(grouped['Ayer']).toHaveLength(1);
      
      // Verification of grouped objects structure
      expect(grouped['Hoy'][0].transaction_id).toBe(1);
      expect(grouped['Hoy'][1].transaction_id).toBe(2);
      expect(grouped['Ayer'][0].transaction_id).toBe(3);
    });

    it('returns empty object if transactions array is empty', () => {
      const grouped = groupTransactionsByDate([]);
      expect(grouped).toEqual({});
    });
  });
});
