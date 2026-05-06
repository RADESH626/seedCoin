import { View, Text, ScrollView, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Landmark } from 'lucide-react-native';
import { AddAccountButton } from '@/src/modules/accounts/components/AddAccountButton';
import Colors from '@/src/shared/constants/Colors';
import { Card } from '@/components/ui/Card';
import { formatMoney } from '@/src/shared/utils/currency';
import { Account } from '@/src/database/types';

interface Props {
  accounts: Account[];
}

/**
 * Sección de cuentas rápidas en el Dashboard.
 * Cada tarjeta navega a la vista de detalle de esa cuenta.
 */
export function QuickAccounts({ accounts }: Props) {
  return (
    <View className="gap-3">
      <View className="flex-row justify-between items-center">
        <Text className="text-xs font-bold text-gray-300 uppercase tracking-widest">Tus Cuentas</Text>
        <Pressable onPress={() => router.push('/manage-accounts')} hitSlop={10}>
          <Text className="text-xs font-bold text-seed-400">Ver todo</Text>
        </Pressable>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-4 pb-2">
        {accounts.length === 0 ? (
          <Card padding="md" rounded="2xl" className="items-center justify-center opacity-50 min-w-[140px]">
            <Text className="text-xs text-gray-400">Sin cuentas</Text>
          </Card>
        ) : (
          <>
            {accounts.map(acc => (
              <Pressable
                key={acc.account_id}
                onPress={() => router.push({ pathname: '/account/[id]', params: { id: acc.account_id } })}
                className="active:opacity-70"
              >
                <Card padding="md" rounded="2xl" className="min-w-[140px]">
                  <Landmark color={Colors.seed[400]} size={24} className="mb-3" />
                  <Text className="text-xs text-gray-400 font-medium">{acc.name}</Text>
                  <Text className="font-bold text-white text-base mt-0.5">{formatMoney(acc.current_balance, 'COP')}</Text>
                </Card>
              </Pressable>
            ))}
            {/* Botón Permanente para agregar más cuentas al final del scroll */}
            <AddAccountButton />
          </>
        )}
      </ScrollView>
    </View>
  );
}
