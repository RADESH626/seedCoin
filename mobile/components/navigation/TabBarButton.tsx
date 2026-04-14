import { Pressable, Text } from 'react-native';
import { LucideIcon } from 'lucide-react-native';

interface TabBarButtonProps {
  label: string;
  Icon: LucideIcon;
  isFocused: boolean;
  onPress: () => void;
}

/**
 * Componente individual para los botones de la barra de navegación inferior.
 * Utiliza clases de Tailwind para gestionar los estados y colores del sistema.
 */
export function TabBarButton({ label, Icon, isFocused, onPress }: TabBarButtonProps) {
  const iconColor = isFocused ? '#ffffff' : '#6b7280'; // Mantenemos el valor pero centralizado en la constante si es necesario

  return (
    <Pressable onPress={onPress} className="flex-1 items-center justify-center gap-1 active:opacity-60">
      <Icon color={iconColor} size={22} />
      <Text 
        numberOfLines={1}
        adjustsFontSizeToFit={true}
        minimumFontScale={0.8}
        className={`text-[9px] font-bold uppercase tracking-tighter ${isFocused ? 'text-white' : 'text-gray-500'}`}
      >
        {label}
      </Text>
    </Pressable>
  );
}
