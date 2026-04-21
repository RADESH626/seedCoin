import { View, Text, ScrollView, Pressable } from 'react-native';
import { Trash2, Landmark, ChevronRight } from 'lucide-react-native';
import { Account } from '@/src/database/types';
import { formatMoney } from '@/src/helpers/currency';
import { EmptyState } from '@/components/ui/EmptyState';
import Colors from '@/constants/Colors';

interface AccountListProps {
  accounts: Account[];
  loading: boolean;
  onEdit: (id: number) => void;
  onDelete: (id: number, name: string) => void;
}

export function AccountList({ accounts, loading, onEdit, onDelete }: AccountListProps) {
  if (accounts.length === 0 && !loading) {
    return (
      <EmptyState 
        icon={Landmark}
        title="No tienes cuentas activas"
        description="Agrega una cuenta para comenzar a registrar tus movimientos."
      />
    );
  }

  return (
    <ScrollView 
      className="flex-1 mt-4" 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 120 }}
    >
      <View className="gap-4">
        {accounts.map(acc => (
          <View 
            key={acc.account_id}
            className="bg-dark-800 border border-dark-700 rounded-3xl overflow-hidden"
          >
            <Pressable 
              className="p-5 flex-row items-center justify-between active:bg-dark-700/50"
              onPress={() => onEdit(acc.account_id)}
            >
              <View className="flex-row items-center gap-4 flex-1">
                <View className="w-12 h-12 rounded-2xl bg-seed-500/10 items-center justify-center">
                  <Landmark size={24} color={Colors.seed[400]} />
                </View>
                <View className="flex-1">
                  <Text className="text-white font-bold text-base">{acc.name}</Text>
                  <Text className="text-gray-400 text-xs mt-0.5 uppercase tracking-wider">{acc.account_type}</Text>
                </View>
                <View className="items-end mr-2">
                   <Text className="text-white font-bold text-base">{formatMoney(acc.current_balance, 'COP')}</Text>
                </View>
              </View>
              <ChevronRight size={18} color="#475569" />
            </Pressable>
            
            <View className="border-t border-dark-700/50 flex-row">
               <Pressable 
                onPress={() => onDelete(acc.account_id, acc.name)}
                className="flex-1 flex-row items-center justify-center p-4 gap-2 active:bg-red-500/10"
               >
                 <Trash2 size={16} color="#ef4444" />
                 <Text className="text-red-500 text-xs font-bold uppercase tracking-wider">Eliminar Cuenta</Text>
               </Pressable>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
