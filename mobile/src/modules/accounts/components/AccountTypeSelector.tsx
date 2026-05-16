import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Landmark, Wallet, CreditCard, PiggyBank, MoreHorizontal, TrendingUp } from 'lucide-react-native';
import Colors from '@/src/shared/constants/Colors';
import { ACCOUNT_TYPES, AccountType } from '@/src/database/types';

interface AccountTypeSelectorProps {
  selectedType: string;
  onSelect: (typeId: string) => void;
}

const ICON_MAP = {
  wallet: Wallet,
  landmark: Landmark,
  'piggy-bank': PiggyBank,
  'credit-card': CreditCard,
  'trending-up': TrendingUp,
  'more-horizontal': MoreHorizontal,
};

/**
 * Componente molecular para la selección del tipo de cuenta.
 * Centraliza la lógica visual y el mapeo de iconos de los tipos de cuenta.
 */
export function AccountTypeSelector({ selectedType, onSelect }: AccountTypeSelectorProps) {
  const types = Object.values(ACCOUNT_TYPES);

  return (
    <View className="mb-6">
      <Text className="text-body-sm mb-3 ml-1">Tipo de fondo</Text>
      <View className="flex-row flex-wrap justify-between gap-y-3">
        {types.map((type) => {
          const IconComponent = ICON_MAP[type.icon as keyof typeof ICON_MAP] || MoreHorizontal;
          const isSelected = selectedType === type.id;
          
          return (
            <Pressable
              key={type.id}
              onPress={() => onSelect(type.id)}
              className={`w-[48%] py-3 px-2 rounded-2xl flex-row items-center justify-center gap-2 border 
                ${isSelected ? 'bg-seed-900 border-seed-500' : 'bg-dark-800 border-dark-700'}
              `}
            >
              <IconComponent color={isSelected ? Colors.seed[400] : '#9ca3af'} size={18} />
              <Text className={`font-semibold ${isSelected ? 'text-seed-400' : 'text-zinc-400'}`}>
                {type.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
