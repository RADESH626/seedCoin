import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Settings, RotateCcw, ChevronRight, Wallet, CalendarClock } from 'lucide-react-native';
import { Card } from '@/components/ui/Card';
import { IconBadge } from '@/components/ui/IconBadge';

interface ProfileMenuProps {
  onResetDatabase: () => void;
  showDeveloperFeatures?: boolean;
}

export function ProfileMenu({ onResetDatabase, showDeveloperFeatures }: ProfileMenuProps) {
  return (
    <>
      <Text className="text-gray-500 text-[10px] font-bold uppercase mb-4 ml-2 tracking-widest">Ajustes Generales</Text>
      
      <Card padding="none" rounded="extra" className="overflow-hidden mb-8">
        <Pressable 
          className="flex-row items-center justify-between p-5 border-b border-dark-700 active:bg-dark-700/50"
          onPress={() => router.push('/manage-accounts' as any)}
        >
          <View className="flex-row items-center gap-4">
            <IconBadge color="blue" className="rounded-2xl">
              <Wallet size={20} color="#3b82f6" />
            </IconBadge>
            <Text className="text-white font-medium">Gestionar Cuentas</Text>
          </View>
          <ChevronRight size={18} color="#475569" />
        </Pressable>

        <Pressable 
          className="flex-row items-center justify-between p-5 border-b border-dark-700 active:bg-dark-700/50"
          onPress={() => router.push('/scheduled-transactions' as any)}
        >
          <View className="flex-row items-center gap-4">
            <IconBadge color="purple" className="rounded-2xl">
              <CalendarClock size={20} color="#a855f7" />
            </IconBadge>
            <Text className="text-white font-medium">Transacciones Programadas</Text>
          </View>
          <ChevronRight size={18} color="#475569" />
        </Pressable>

        <Pressable 
          className="flex-row items-center justify-between p-5 border-b border-dark-700 active:bg-dark-700/50"
          onPress={() => {/* TODO: Navegación a preferencias UI */}}
        >
          <View className="flex-row items-center gap-4">
            <IconBadge color="orange" className="rounded-2xl">
              <Settings size={20} color="#f97316" />
            </IconBadge>
            <Text className="text-white font-medium">Preferencias UI</Text>
          </View>
          <ChevronRight size={18} color="#475569" />
        </Pressable>

        {showDeveloperFeatures && (
          <Pressable 
            onPress={onResetDatabase}
            className="flex-row items-center justify-between p-5 active:bg-dark-700/50"
          >
            <View className="flex-row items-center gap-4">
              <IconBadge color="red" className="rounded-2xl">
                <RotateCcw size={20} color="#ef4444" />
              </IconBadge>
              <Text className="text-red-400 font-medium">Reiniciar Base de Datos</Text>
            </View>
            <ChevronRight size={18} color="#475569" />
          </Pressable>
        )}
      </Card>
    </>
  );
}
