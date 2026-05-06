import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ACCOUNT_TYPES, type AccountType } from '@/src/database/types';
import Colors from '@/src/shared/constants/Colors';

interface Props {
  name: string;
  accountType: AccountType;
}

/**
 * Header de la pantalla de detalle de cuenta.
 * Muestra el tipo de cuenta, nombre y botón de retroceso.
 * Respeta la barra de notificaciones mediante useSafeAreaInsets.
 */
export function AccountDetailHeader({ name, accountType }: Props) {
  const insets = useSafeAreaInsets();
  const typeInfo = ACCOUNT_TYPES[accountType] ?? ACCOUNT_TYPES.OTHER;

  return (
    <View
      className="standard-screen-px pb-6 gap-4"
      style={{ paddingTop: Math.max(insets.top, 24) }}
    >
      <Pressable
        onPress={() => router.back()}
        hitSlop={12}
        className="self-start p-2 -ml-2 rounded-full active:bg-dark-700"
      >
        <ArrowLeft color={Colors.seed[400]} size={22} />
      </Pressable>

      <View className="gap-1">
        <Text className="text-xs font-bold text-seed-400 uppercase tracking-widest">
          {typeInfo.label}
        </Text>
        <Text className="text-h1 text-white font-bold" numberOfLines={2}>
          {name}
        </Text>
      </View>
    </View>
  );
}

