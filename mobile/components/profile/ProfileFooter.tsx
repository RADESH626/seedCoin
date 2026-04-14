import { View, Text } from 'react-native';
import { Database } from 'lucide-react-native';

export function ProfileFooter() {
  return (
    <View className="items-center mb-20 opacity-40">
      <View className="flex-row items-center gap-2 mb-1">
        <Database size={12} color="#94a3b8" />
        <Text className="text-gray-400 text-[10px] font-bold">SQLite v3.x Local Storage</Text>
      </View>
      <Text className="text-gray-500 text-[10px]">SeedCoin v1.0.0 • 2026</Text>
    </View>
  );
}
