import { Pressable, Text } from 'react-native';
import { PlusCircle } from 'lucide-react-native';
import { router } from 'expo-router';
import Colors from '@/src/shared/constants/Colors';
import { useSingleAction } from '@/src/shared/hooks/useSingleAction';

export function AddAccountButton() {
  const { execute: handlePress } = useSingleAction(() => 
    router.push('/add-account' as any)
  );

  return (
    <Pressable 
      onPress={handlePress}
      className="bg-dark-800 border-2 border-dashed border-dark-600 rounded-2xl p-4 items-center justify-center min-w-[120px]"
    >
      <PlusCircle color={Colors.seed[500]} size={24} className="mb-2" />
      <Text className="text-xs text-seed-400 font-bold">Añadir</Text>
    </Pressable>
  );
}

