import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { Trash2 } from 'lucide-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { TransactionTypeSelector } from '../components/TransactionTypeSelector';
import { AmountInput } from '../components/AmountInput';
import { AccountSelector } from '../components/AccountSelector';
import { CategoryGrid } from '../components/CategoryGrid';
import { TransactionDateField } from '../components/TransactionDateField';
import { SchedulingOptions } from '../components/SchedulingOptions';
import { Account, Category, RecurrenceFrequency } from '@/src/database/types';

interface TransactionFormProps {
  isIncome: boolean;
  onTypeChange: (val: boolean) => void;
  amount: string;
  onAmountChange: (val: string) => void;
  accounts: Account[];
  selectedAccountId: number | null;
  onSelectAccount: (id: number) => void;
  categories: Category[];
  selectedCategoryId: number | null;
  onSelectCategory: (id: number) => void;
  date: Date;
  onDatePress: () => void;
  description: string;
  onDescriptionChange: (val: string) => void;
  frequency: RecurrenceFrequency | null;
  onFrequencyChange: (freq: RecurrenceFrequency | null) => void;
  isAutomatic: boolean;
  onAutomaticChange: (val: boolean) => void;
  isEditing: boolean;
  onDelete?: () => void;
  showDatePicker: boolean;
  onDateChange: (event: any, date?: Date) => void;
}

export function TransactionForm({
  isIncome,
  onTypeChange,
  amount,
  onAmountChange,
  accounts,
  selectedAccountId,
  onSelectAccount,
  categories,
  selectedCategoryId,
  onSelectCategory,
  date,
  onDatePress,
  description,
  onDescriptionChange,
  frequency,
  onFrequencyChange,
  isAutomatic,
  onAutomaticChange,
  isEditing,
  onDelete,
  showDatePicker,
  onDateChange,
}: TransactionFormProps) {
  return (
    <>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <TransactionTypeSelector
          isIncome={isIncome}
          onTypeChange={onTypeChange}
        />

        <AmountInput
          amount={amount}
          onAmountChange={onAmountChange}
          isIncome={isIncome}
        />

        <AccountSelector
          accounts={accounts}
          selectedAccountId={selectedAccountId}
          onSelectAccount={onSelectAccount}
        />

        <CategoryGrid
          categories={categories}
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={onSelectCategory}
          isIncome={isIncome}
        />

        <TransactionDateField
          date={date}
          description={description}
          onDatePress={onDatePress}
          onDescriptionChange={onDescriptionChange}
        />

        <SchedulingOptions
          frequency={frequency}
          onFrequencyChange={onFrequencyChange}
          isAutomatic={isAutomatic}
          onAutomaticChange={onAutomaticChange}
        />

        {isEditing && onDelete && (
          <TouchableOpacity
            onPress={onDelete}
            className="mt-8 mb-4 py-4 flex-row items-center justify-center bg-red-500/10 border border-red-500/20 rounded-2xl"
          >
            <Trash2 size={20} color="#f87171" className="mr-2" />
            <Text className="text-red-400 font-bold ml-2">Eliminar Movimiento</Text>
          </TouchableOpacity>
        )}

        <View className="h-10" />
      </ScrollView>

      {showDatePicker && (
        <DateTimePicker 
          value={date} 
          mode="date" 
          is24Hour={true} 
          onChange={onDateChange} 
        />
      )}
    </>
  );
}
