import React from 'react';
import { View } from 'react-native';

/**
 * Atomo visual que proporciona una atmósfera de fondo premium.
 * Usa gradientes sutiles y desenfoques para elevar la estética de las pantallas.
 */
export function BackgroundAtmosphere() {
  return (
    <View 
      className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] rounded-full bg-seed-600/10 pointer-events-none blur-3xl scale-150" 
      aria-hidden={true}
    />
  );
}
