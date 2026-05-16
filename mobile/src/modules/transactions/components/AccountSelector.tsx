import { View, Text, ScrollView, Pressable } from 'react-native';
import { formatMoney } from '@/src/shared/utils/currency';

interface Props {
  accounts: any[];
  selectedAccountId: number | null;
  onSelectAccount: (id: number) => void;
  label?: string;
}

export function AccountSelector({ accounts, selectedAccountId, onSelectAccount, label = 'Cuenta' }: Props) {
  return (
    <View className="mb-8">
      <Text className="text-body-sm mb-3 ml-1">{label}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
        {accounts.map((acc) => (
          <Pressable
            key={acc.account_id}
            onPress={() => onSelectAccount(acc.account_id)}
            className={`mr-3 px-4 py-3 rounded-2xl border flex-row items-center gap-2 ${selectedAccountId === acc.account_id ? 'bg-seed-900/40 border-seed-500' : 'bg-dark-800 border-dark-700'}`}
          >
            <View className={`w-2 h-2 rounded-full ${selectedAccountId === acc.account_id ? 'bg-seed-400' : 'bg-zinc-600'}`} />
            <Text className={`font-bold ${selectedAccountId === acc.account_id ? 'text-seed-100' : 'text-zinc-400'}`}>{acc.name}</Text>
            <Text className="text-caption">{formatMoney(acc.current_balance, 'COP')}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

