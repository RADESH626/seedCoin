import { View, Text } from 'react-native';
import { LucideIcon } from 'lucide-react-native';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  className?: string;
}

/**
 * Componente genérico para estados vacíos en listas o paneles.
 */
export function EmptyState({ icon: Icon, title, description, className = "" }: EmptyStateProps) {
  return (
    <View className={`py-20 items-center opacity-50 ${className}`}>
      <Icon size={48} color="#475569" strokeWidth={1} />
      <Text className="text-gray-400 mt-4 font-medium text-center">{title}</Text>
      {description && (
        <Text className="text-gray-500 text-xs mt-1 text-center px-4">{description}</Text>
      )}
    </View>
  );
}
