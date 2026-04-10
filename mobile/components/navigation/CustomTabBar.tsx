import React from 'react';
import { View, Alert } from 'react-native';
import { Home, Wallet, PieChart, User } from 'lucide-react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { TabBarButton } from './TabBarButton';
import { TabBarFAB } from './TabBarFAB';

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  
  const handleDummyPress = (tabName: string) => {
    Alert.alert("Próximamente", `La sección de ${tabName} estará disponible pronto.`);
  };

  const isHomeFocused = state.routes[state.index].name === 'index';
  const isHistoryFocused = state.routes[state.index].name === 'history';
  const isProfileFocused = state.routes[state.index].name === 'profile';

  return (
    <View 
      className="flex-row justify-between items-center bg-dark-900 border-t border-dark-700 absolute bottom-0 left-0 right-0 px-6 pt-3 rounded-t-[40px] shadow-[0_-10px_20px_rgba(0,0,0,0.5)] elevation-20"
      style={{ paddingBottom: insets.bottom + 10 }}
    >
      <TabBarButton 
        label="Inicio" 
        Icon={Home} 
        isFocused={isHomeFocused} 
        onPress={() => navigation.navigate('index')} 
      />
      <TabBarButton 
        label="Historial" 
        Icon={Wallet} 
        isFocused={isHistoryFocused} 
        onPress={() => navigation.navigate('history')} 
      />
      
      <TabBarFAB onPress={() => router.push('/add-transaction' as any)} />

      <TabBarButton 
        label="Límites" 
        Icon={PieChart} 
        isFocused={false} 
        onPress={() => handleDummyPress('Límites')} 
      />
      <TabBarButton 
        label="Perfil" 
        Icon={User} 
        isFocused={isProfileFocused} 
        onPress={() => navigation.navigate('profile')} 
      />
    </View>
  );
}
