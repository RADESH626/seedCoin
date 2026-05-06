import { View, Text, ScrollView } from 'react-native';
import { FormField } from '@/components/ui/FormField';
import { AccountTypeSelector } from '@/src/modules/accounts/components/AccountTypeSelector';
import { ACCOUNT_TYPES } from '@/src/database/types';

interface AccountFormProps {
  name: string;
  onNameChange: (val: string) => void;
  accountType: string;
  onAccountTypeChange: (val: string) => void;
  balance: string;
  onBalanceChange: (val: string) => void;
  yieldRate: string;
  onYieldRateChange: (val: string) => void;
  paymentDay: string;
  onPaymentDayChange: (val: string) => void;
  isEditing: boolean;
}

export function AccountForm({
  name,
  onNameChange,
  accountType,
  onAccountTypeChange,
  balance,
  onBalanceChange,
  yieldRate,
  onYieldRateChange,
  paymentDay,
  onPaymentDayChange,
  isEditing,
}: AccountFormProps) {
  return (
    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      <FormField
        label="Nombre de la cuenta"
        placeholder="Ej: Billetera Diaria"
        value={name}
        onChangeText={onNameChange}
      />

      <AccountTypeSelector 
        selectedType={accountType} 
        onSelect={onAccountTypeChange} 
      />

      <FormField
        label={isEditing ? 'Capital Inicial (Ajustar)' : 'Capital Inicial (COP)'}
        placeholder="0"
        keyboardType="numeric"
        value={balance}
        onChangeText={onBalanceChange}
        containerClassName="mb-6"
        prefix={<Text className="text-gray-400 text-lg font-bold">$</Text>}
        suffix={<Text className="text-gray-500 text-sm font-bold">COP</Text>}
      />

      {accountType === ACCOUNT_TYPES.YIELD.id && (
        <View className="mb-8">
          <View className="mb-6">
            <FormField
              label="Rendimiento Anual (%)"
              placeholder="0.0"
              keyboardType="numeric"
              value={yieldRate}
              onChangeText={onYieldRateChange}
              suffix={<Text className="text-gray-500 text-sm font-bold">%</Text>}
            />
          </View>
          
          <View>
            <FormField
              label="Día de Pago del rendimiento"
              placeholder="1"
              keyboardType="numeric"
              value={paymentDay}
              onChangeText={onPaymentDayChange}
              suffix={<Text className="text-gray-500 text-sm font-bold">día</Text>}
            />
          </View>
        </View>
      )}
      
      {isEditing && (
        <Text className="text-[10px] text-gray-500 mt-2 ml-1 italic">
          Nota: Cambiar el capital inicial ajustará automáticamente el saldo actual.
        </Text>
      )}
    </ScrollView>
  );
}
