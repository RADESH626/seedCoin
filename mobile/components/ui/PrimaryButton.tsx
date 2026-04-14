import React from 'react';
import { Pressable, Text, ActivityIndicator } from 'react-native';

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

/**
 * Atomo reutilizable para botones de acción principal.
 * Encapsula estilos de marca, estados de carga y deshabilitado.
 */
export function PrimaryButton({ 
  label, 
  onPress, 
  disabled = false, 
  loading = false,
  className = "" 
}: PrimaryButtonProps) {
  return (
    <Pressable 
      disabled={disabled || loading}
      onPress={onPress}
      className={`w-full py-4 rounded-2xl flex-row items-center justify-center shadow-lg shadow-seed-600/20
        ${(disabled || loading) ? 'bg-dark-700 opacity-60' : 'bg-seed-600 active:bg-seed-700'}
        ${className}
      `}
    >
      {loading ? (
        <ActivityIndicator color="white" size="small" />
      ) : (
        <Text className={`font-bold text-lg ${disabled ? 'text-gray-400' : 'text-white'}`}>
          {label}
        </Text>
      )}
    </Pressable>
  );
}
