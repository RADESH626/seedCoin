import { getTotalBalance } from '@/src/services/AccountService';
import * as TransactionAPI from '@/src/modules/transactions/api/transaction.api';

export const getDashboardSummary = async () => {
  const [balance, stats, transactions] = await Promise.all([
    getTotalBalance(),
    TransactionAPI.getMonthlyStats(),
    TransactionAPI.getRecentTransactionsWithCategory()
  ]);

  return {
    totalBalance: balance,
    monthlyIncome: stats.total_income,
    monthlyExpense: stats.total_expense,
    recentTransactions: transactions,
    balanceGrowthPct: 0, // TODO: Implementar cálculo real
  };
};
