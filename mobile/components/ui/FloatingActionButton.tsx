import { Text, Pressable, ViewStyle } from 'react-native';
import { LucideIcon } from 'lucide-react-native';
import Colors from '@/src/shared/constants/Colors';

interface FloatingActionButtonProps {
  label: string;
  icon: LucideIcon;
  onPress: () => void;
  className?: string;
  style?: ViewStyle;
}

/**
 * Botón de Acción Flotante (FAB) estandarizado para SeedCoin.
 */
export function FloatingActionButton({ 
  label, 
  icon: Icon, 
  onPress, 
  className = "",
  style 
}: FloatingActionButtonProps) {
  return (
    <Pressable 
      onPress={onPress}
      className={`bg-seed-500 flex-row items-center justify-center p-5 rounded-2xl gap-3 ${className}`}
      style={[
        { boxShadow: `0px 4px 20px ${Colors.seed[500]}66` },
        style
      ]}
    >
      <Icon size={24} color="white" strokeWidth={3} />
      <Text className="text-white font-extrabold text-base uppercase tracking-wider">{label}</Text>
    </Pressable>
  );
}
