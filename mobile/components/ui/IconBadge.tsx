import React from 'react';
import { View, ViewStyle } from 'react-native';

type BadgeSize = 'sm' | 'md' | 'lg' | 'xl';
type BadgeColor = 'blue' | 'green' | 'red' | 'seed' | 'neutral' | 'dark' | 'orange' | 'purple' | 'custom';

interface IconBadgeProps {
  children: React.ReactNode;
  size?: BadgeSize;
  color?: BadgeColor;
  className?: string;
  showBorder?: boolean;
  style?: ViewStyle;
}

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
};

const colorStyles: Record<BadgeColor, string> = {
  blue: 'bg-blue-500/10',
  green: 'bg-green-500/10',
  red: 'bg-red-500/10',
  seed: 'bg-seed-600/10',
  neutral: 'bg-dark-700',
  dark: 'bg-dark-800',
  orange: 'bg-orange-500/10',
  purple: 'bg-purple-500/10',
  custom: '',
};

const borderStyles: Record<BadgeColor, string> = {
  blue: 'border-blue-500/20',
  green: 'border-green-500/20',
  red: 'border-red-500/20',
  seed: 'border-seed-600/20',
  neutral: 'border-dark-600/20',
  dark: 'border-dark-700',
  orange: 'border-orange-500/20',
  purple: 'border-purple-500/20',
  custom: '',
};

/**
 * Componente Atomo para mostrar un ícono dentro de un contenedor circular estilizado.
 * Utilizado frecuentemente en tarjetas de información y resúmenes.
 */
export function IconBadge({
  children,
  size = 'md',
  color = 'neutral',
  className = '',
  showBorder = false,
  style,
}: IconBadgeProps) {
  const sizeClass = sizeStyles[size] || sizeStyles.md;
  const colorClass = colorStyles[color] || colorStyles.neutral;
  const borderClass = showBorder ? `border ${borderStyles[color] || ''}` : '';

  return (
    <View 
      style={style}
      className={`rounded-full items-center justify-center ${sizeClass} ${colorClass} ${borderClass} ${className}`}
    >
      {children}
    </View>
  );
}
