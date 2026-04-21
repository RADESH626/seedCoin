import React from 'react';
import { View, Pressable } from 'react-native';

type CardPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  className?: string;
  padding?: CardPadding;
  /** Permite forzar un radio de borde específico. Por defecto es rounded-3xl. */
  rounded?: '2xl' | '3xl' | 'extra';
  /** Si es true, el fondo es ligeramente más claro o tiene hover effect. */
  active?: boolean;
}

const paddingStyles: Record<CardPadding, string> = {
  none: 'p-0',
  sm: 'p-2',
  md: 'p-4',
  lg: 'p-5',
  xl: 'p-6',
};

const roundedStyles: Record<'2xl' | '3xl' | 'extra', string> = {
  '2xl': 'rounded-2xl',
  '3xl': 'rounded-3xl',
  'extra': 'rounded-[32px]',
};

/**
 * Componente Contenedor base para tarjetas en SeedCoin.
 * Unifica el estilo de fondo oscuro, bordes y redondeado.
 */
export function Card({
  children,
  onPress,
  className = '',
  padding = 'md',
  rounded = '3xl',
  active = false,
}: CardProps) {
  const Container = onPress ? Pressable : View;
  const paddingClass = paddingStyles[padding];
  const roundedClass = roundedStyles[rounded];
  const interactiveClass = onPress ? 'active:bg-dark-700/50' : '';
  const activeClass = active ? 'bg-dark-700' : 'bg-dark-800';

  return (
    <Container
      onPress={onPress}
      className={`
        ${activeClass} 
        border border-dark-700 
        ${roundedClass} 
        ${paddingClass} 
        ${interactiveClass} 
        ${className}
      `}
    >
      {children}
    </Container>
  );
}
