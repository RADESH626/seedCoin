import { View, ScrollView, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useAccountDetail } from '@/src/modules/accounts/hooks/useAccountDetail';
import { AccountDetailHeader } from '@/src/modules/accounts/components/AccountDetailHeader';
import { AccountBalanceCard } from '@/src/modules/accounts/components/AccountBalanceCard';
import { AccountTransactionList } from '@/src/modules/accounts/components/AccountTransactionList';
import { BackgroundAtmosphere } from '@/components/ui/BackgroundAtmosphere';
import { LoadingOverlay } from '@/components/ui/LoadingOverlay';

/**
 * Pantalla de detalle de una cuenta específica.
 * Accesible desde el Dashboard al tocar una tarjeta de QuickAccounts.
 */
export default function AccountDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const accountId = Number(id);
  const { state } = useAccountDetail(accountId);
  const { account, transactions, isLoading, error } = state;

  return (
    <View className="flex-1 bg-dark-900">
      <BackgroundAtmosphere />

      {isLoading ? (
        <LoadingOverlay message="Cargando cuenta..." />
      ) : error || !account ? (
        <View className="flex-1 items-center justify-center standard-screen-px gap-3">
          <Text className="text-4xl">😕</Text>
          <Text className="text-body-lg text-white font-bold text-center">
            {error ?? 'Cuenta no encontrada'}
          </Text>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerClassName="pb-32"
        >
          <AccountDetailHeader
            name={account.name}
            accountType={account.account_type}
          />

          <View className="gap-5">
            <AccountBalanceCard account={account} />
            <AccountTransactionList
              transactions={transactions}
              accountName={account.name}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
}
