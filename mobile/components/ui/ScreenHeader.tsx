import React from 'react';
import { View, Text } from 'react-native';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

/**
 * Atomo para el encabezado estándar de las pantallas de la aplicación.
 * Asegura que el espaciado y la jerarquía tipográfica sean consistentes.
 */
export function ScreenHeader({ title, subtitle, children }: ScreenHeaderProps) {
  return (
    <View className="mb-8">
      <View className="flex-row justify-between items-center">
        <View>
          <Text className="text-h2">{title}</Text>
          {subtitle && (
            <Text className="text-body-sm mt-1">{subtitle}</Text>
          )}
        </View>
        {children}
      </View>
    </View>
  );
}
