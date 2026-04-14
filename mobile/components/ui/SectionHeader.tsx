import React from 'react';
import { View, Text, Pressable } from 'react-native';

interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  onActionPress?: () => void;
}

/**
 * Átomo para encabezados de sección dentro de las pantallas.
 * Estandariza el patrón "Título en Mayúsculas + Acción Lateral".
 */
export function SectionHeader({ title, actionLabel, onActionPress }: SectionHeaderProps) {
  return (
    <View className="flex-row justify-between items-center mb-1">
      <Text className="text-[10px] font-bold text-gray-400 uppercase tracking-[2px]">
        {title}
      </Text>
      {actionLabel && (
        <Pressable 
          onPress={onActionPress}
          hitSlop={10}
          className="active:opacity-50"
        >
          <Text className="text-[11px] font-black text-seed-400 uppercase tracking-wider">
            {actionLabel}
          </Text>
        </Pressable>
      )}
    </View>
  );
}
