import { View, Text, TextInput } from 'react-native';

interface Props {
  amount: string;
  onAmountChange: (value: string) => void;
  isIncome: boolean;
}

export function AmountInput({ amount, onAmountChange, isIncome }: Props) {
  return (
    <View className="items-center mb-10">
      <Text className="text-gray-400 text-sm font-medium mb-2 uppercase tracking-widest">Monto de la operación</Text>
      <View className="flex-row items-center">
        <Text className={`text-4xl font-bold mr-2 ${isIncome ? 'text-seed-400' : 'text-red-400'}`}>$</Text>
        <TextInput
          className="text-5xl font-black text-white"
          placeholder="0"
          placeholderTextColor="#334155"
          keyboardType="numeric"
          value={amount}
          onChangeText={onAmountChange}
          autoFocus={true}
        />
      </View>
    </View>
  );
}
