import { View } from 'react-native';
import { CircularAddButton } from '../ui/CircularAddButton';

/**
 * Botón de Acción Flotante (FAB) centralizado para la creación de transacciones.
 */
export function TabBarFAB({ onPress }: { onPress: () => void }) {
  return (
    <View className="relative size-16 justify-center items-center -mt-10">
      <CircularAddButton 
        onPress={onPress}
        testID="fab-add-transaction"
      />
    </View>
  );
}
