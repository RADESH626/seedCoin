import { View, Text, TextInput } from 'react-native';

interface Props {
  description: string;
  onDescriptionChange: (text: string) => void;
}

export function TransactionDescriptionField({ description, onDescriptionChange }: Props) {
  return (
    <View className="mb-8">
      <Text className="text-zinc-400 text-sm font-medium mb-3 ml-1">Descripción</Text>
      <TextInput
        className="bg-dark-800 border border-dark-700 rounded-2xl p-4 text-white font-medium"
        placeholder="Ej. Mercado mensual"
        placeholderTextColor="#4b5563"
        value={description}
        onChangeText={onDescriptionChange}
      />
    </View>
  );
}
