import { Fragment } from 'react';
import { View, Text } from 'react-native';
import { TransactionItem } from '@/src/modules/transactions/components/TransactionItem';
import { SectionHeader } from '@/components/ui/SectionHeader';
import type { Transaction } from '@/src/database/types';
import { getCategoryById } from '@/src/modules/categories/constants/categories';
import type { RecentTransaction } from '@/src/database/types';

interface Props {
  transactions: Transaction[];
  accountName: string;
}

/** Adapta un Transaction (raw) al tipo RecentTransaction necesario por TransactionItem */
function toRecentTransaction(tx: Transaction, accountName: string): RecentTransaction {
  const category = getCategoryById(tx.category_id);
  return {
    ...tx,
    category_name: category?.name ?? 'Desconocido',
    category_icon: category?.icon ?? 'help-circle',
    category_color: category?.color ?? '#9ca3af',
    account_name: accountName,
  };
}

/**
 * Lista de transacciones filtradas por cuenta.
 * Reutiliza TransactionItem para consistencia visual con el resto de la app.
 */
export function AccountTransactionList({ transactions, accountName }: Props) {
  return (
    <View className="standard-screen-px gap-3">
      <SectionHeader title="Movimientos" />

      <View className="bg-dark-800 border border-dark-700 rounded-2xl p-2">
        {transactions.length === 0 ? (
          <View className="py-10 items-center justify-center opacity-50 gap-2">
            <Text className="text-2xl">💸</Text>
            <Text className="text-sm text-gray-400 text-center">
              No hay movimientos{'\n'}en esta cuenta
            </Text>
          </View>
        ) : (
          transactions.map((tx, index) => {
            const isLast = index === transactions.length - 1;
            const rich = toRecentTransaction(tx, accountName);
            return (
              <Fragment key={tx.transaction_id}>
                <TransactionItem transaction={rich} />
                {!isLast && <View className="h-px bg-dark-700 mx-3" />}
              </Fragment>
            );
          })
        )}
      </View>
    </View>
  );
}
