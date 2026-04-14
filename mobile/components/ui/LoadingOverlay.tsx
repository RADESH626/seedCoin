import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import Colors from '@/constants/Colors';

interface LoadingOverlayProps {
  message?: string;
}

/**
 * Componente para mostrar un estado de carga a pantalla completa o dentro de un contenedor.
 * Centraliza el diseño del ActivityIndicator y mensajes de carga.
 */
export function LoadingOverlay({ message = 'Cargando...' }: LoadingOverlayProps) {
  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" color={Colors.seed[500]} />
      {message && (
        <Text className="text-gray-500 text-xs mt-4 font-medium uppercase tracking-widest">
          {message}
        </Text>
      )}
    </View>
  );
}
