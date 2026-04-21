import { Pressable, View } from 'react-native';
import { Plus } from 'lucide-react-native';

interface CircularAddButtonProps {
  onPress: () => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  testID?: string;
}

/**
 * Botón circular estandarizado basado en el diseño del FAB principal.
 */
export function CircularAddButton({ 
  onPress, 
  size = 'md', 
  className = '',
  testID
}: CircularAddButtonProps) {
  // Dimensiones basadas en el tamaño
  const sizes = {
    sm: { container: 'w-10 h-10', icon: 20, border: 'border-2' },
    md: { container: 'w-14 h-14', icon: 28, border: 'border-4' },
    lg: { container: 'w-20 h-20', icon: 40, border: 'border-4' },
  };

  const currentSize = sizes[size];

  return (
    <Pressable 
      onPress={onPress}
      testID={testID}
      className={`
        ${currentSize.container} 
        bg-seed-600 
        rounded-full 
        items-center 
        justify-center 
        ${currentSize.border} 
        border-dark-900 
        shadow-[0_0_15px_rgba(25,42,255,0.6)] 
        elevation-5 
        active:scale-95 
        active:bg-seed-500
        ${className}
      `}
    >
      <Plus color="#ffffff" size={currentSize.icon} strokeWidth={2.5} />
    </Pressable>
  );
}
