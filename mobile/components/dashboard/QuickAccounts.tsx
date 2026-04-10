import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { Landmark } from 'lucide-react-native';
import { AddAccountButton } from '@/components/ui/AddAccountButton';
import Colors from '@/constants/Colors';
import { formatMoney } from '@/src/helpers/ui';
import { Account } from '@/src/database/types';

interface Props {
  accounts: Account[];
}

export function QuickAccounts({ accounts }: Props) {
  return (
    <View className="gap-3">
      <View className="flex-row justify-between items-center">
        <Text className="text-xs font-bold text-gray-300 uppercase tracking-widest">Tus Cuentas</Text>
        <Pressable>
          <Text className="text-xs font-bold text-seed-400">Ver todo</Text>
        </Pressable>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-4 pb-2">
        {accounts.length === 0 ? (
          <View className="bg-dark-800 border border-dark-700 rounded-2xl p-4 items-center justify-center opacity-50 min-w-[140px]">
            <Text className="text-xs text-gray-400">Sin cuentas</Text>
          </View>
        ) : (
          <>
            {accounts.map(acc => (
              <View key={acc.account_id} className="bg-dark-800 border border-dark-700 rounded-2xl p-4 min-w-[140px]">
                <Landmark color={Colors.seed[400]} size={24} className="mb-3" />
                <Text className="text-xs text-gray-400 font-medium">{acc.name}</Text>
                <Text className="font-bold text-white text-base mt-0.5">{formatMoney(acc.current_balance, 'COP')}</Text>
              </View>
            ))}
            {/* Botón Permanente para agregar mas cuentas al final del scroll */}
            <AddAccountButton />
          </>
        )}
      </ScrollView>
    </View>
  );
}
