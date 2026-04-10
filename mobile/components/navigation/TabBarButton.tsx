import React from 'react';
import { Pressable, Text } from 'react-native';
import { LucideIcon } from 'lucide-react-native';

interface TabBarButtonProps {
  label: string;
  Icon: LucideIcon;
  isFocused: boolean;
  onPress: () => void;
}

export function TabBarButton({ label, Icon, isFocused, onPress }: TabBarButtonProps) {
  return (
    <Pressable onPress={onPress} className="items-center justify-center w-14 gap-1">
      <Icon color={isFocused ? '#ffffff' : '#6b7280'} size={24} />
      <Text 
        className={`text-[10px] ${isFocused ? 'text-white font-semibold' : 'text-gray-500 font-medium'}`}
      >
        {label}
      </Text>
    </Pressable>
  );
}
