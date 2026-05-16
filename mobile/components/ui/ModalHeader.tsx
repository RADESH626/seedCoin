import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { LucideIcon, X } from 'lucide-react-native';

interface ModalHeaderProps {
  title: string;
  onClose: () => void;
  Icon?: LucideIcon;
}

/**
 * Átomo reutilizable para el encabezado de pantallas modales.
 * Asegura consistencia visual en toda la aplicación.
 */
export function ModalHeader({ title, onClose, Icon }: ModalHeaderProps) {
  return (
    <View className="flex-row justify-between items-center pb-6">
      <View className="flex-row items-center gap-3">
        {Icon && <Icon size={24} color="#3b82f6" />}
        <Text className="text-h2">{title}</Text>
      </View>
      <Pressable 
        testID="close-modal-button"
        onPress={onClose} 
        className="size-10 bg-dark-800 rounded-full items-center justify-center border border-dark-700 active:bg-dark-700"
      >
        <X color="#9ca3af" size={20} />
      </Pressable>
    </View>
  );
}
