import { Text, ScrollView } from 'react-native';
import { FormField } from '@/components/ui/FormField';
import { AccountTypeSelector } from '@/components/accounts/AccountTypeSelector';

interface AccountFormProps {
  name: string;
  onNameChange: (val: string) => void;
  accountType: string;
  onAccountTypeChange: (val: string) => void;
  balance: string;
  onBalanceChange: (val: string) => void;
  isEditing: boolean;
}

export function AccountForm({
  name,
  onNameChange,
  accountType,
  onAccountTypeChange,
  balance,
  onBalanceChange,
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
        containerClassName="mb-8"
        prefix={<Text className="text-gray-400 text-lg font-bold">$</Text>}
        suffix={<Text className="text-gray-500 text-sm font-bold">COP</Text>}
      />
      
      {isEditing && (
        <Text className="text-[10px] text-gray-500 mt-2 ml-1 italic">
          Nota: Cambiar el capital inicial ajustará automáticamente el saldo actual.
        </Text>
      )}
    </ScrollView>
  );
}
