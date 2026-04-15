import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Settings, RotateCcw, ChevronRight, Wallet } from 'lucide-react-native';

interface ProfileMenuProps {
  onResetDatabase: () => void;
}

export function ProfileMenu({ onResetDatabase }: ProfileMenuProps) {
  return (
    <>
      <Text className="text-gray-500 text-[10px] font-bold uppercase mb-4 ml-2 tracking-widest">Ajustes Generales</Text>
      
      <View className="bg-dark-800 border border-dark-700 rounded-[32px] overflow-hidden mb-8">
        <Pressable 
          className="flex-row items-center justify-between p-5 border-b border-dark-700 active:bg-dark-700/50"
          onPress={() => router.push('/manage-accounts' as any)}
        >
          <View className="flex-row items-center gap-4">
            <View className="w-10 h-10 rounded-2xl bg-blue-500/10 items-center justify-center">
              <Wallet size={20} color="#3b82f6" />
            </View>
            <Text className="text-white font-medium">Gestionar Cuentas</Text>
          </View>
          <ChevronRight size={18} color="#475569" />
        </Pressable>

        <Pressable 
          className="flex-row items-center justify-between p-5 border-b border-dark-700 active:bg-dark-700/50"
          onPress={() => {/* TODO: Navegación a preferencias UI */}}
        >
          <View className="flex-row items-center gap-4">
            <View className="w-10 h-10 rounded-2xl bg-orange-500/10 items-center justify-center">
              <Settings size={20} color="#f97316" />
            </View>
            <Text className="text-white font-medium">Preferencias UI</Text>
          </View>
          <ChevronRight size={18} color="#475569" />
        </Pressable>

        <Pressable 
          onPress={onResetDatabase}
          className="flex-row items-center justify-between p-5 active:bg-dark-700/50"
        >
          <View className="flex-row items-center gap-4">
            <View className="w-10 h-10 rounded-2xl bg-red-500/10 items-center justify-center">
              <RotateCcw size={20} color="#ef4444" />
            </View>
            <Text className="text-red-400 font-medium">Reiniciar Base de Datos</Text>
          </View>
          <ChevronRight size={18} color="#475569" />
        </Pressable>
      </View>
    </>
  );
}
