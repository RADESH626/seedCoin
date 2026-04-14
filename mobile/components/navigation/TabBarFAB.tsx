import React from 'react';
import { View, Pressable } from 'react-native';
import { Plus } from 'lucide-react-native';

export function TabBarFAB({ onPress }: { onPress: () => void }) {
  return (
    <View className="relative w-16 h-16 justify-center items-center -mt-10">
      <Pressable 
        onPress={onPress}
        testID="fab-add-transaction"
        className="w-14 h-14 bg-seed-600 rounded-full items-center justify-center border-4 border-dark-900 shadow-[0_0_15px_rgba(25,42,255,0.6)] elevation-5 active:scale-95 active:bg-seed-500"
      >
        <Plus color="#ffffff" size={28} />
      </Pressable>
    </View>
  );
}
