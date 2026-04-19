import { useState, useCallback } from 'react';
import { View, Text, SectionList, Pressable, Alert, ActivityIndicator } from 'react-native';
import { useFocusEffect, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Check, X, Calendar, Settings, Info, ArrowLeft, Clock } from 'lucide-react-native';

import { getAllScheduledDetailedTransactions, updateTransaction, deleteTransaction } from '@/src/services/TransactionService';
import { DetailedTransaction } from '@/src/database/types';
import { log } from '@/src/services/logger';
import { getDateLabel } from '@/src/helpers/date';

// Componentes UI Reutilizables (simplificados para no fragmentar demasiado)
function SectionHeader({ title }: { title: string }) {
  return (
    <View className="bg-dark-900 py-4">
      <Text className="text-gray-400 text-xs font-bold uppercase tracking-widest">{title}</Text>
    </View>
  );
}

export default function ScheduledTransactionsScreen() {
  const insets = useSafeAreaInsets();
  const [sections, setSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const allSchedules = await getAllScheduledDetailedTransactions();
      
      const due = allSchedules.filter(t => t.status === 'DUE');
      const semi = allSchedules.filter(t => t.status === 'SCHEDULED' && t.is_automatic === 0);
      const auto = allSchedules.filter(t => t.status === 'SCHEDULED' && t.is_automatic === 1);

      const newSections = [];
      if (due.length > 0) newSections.push({ title: 'Pendientes de Aprobación', data: due });
      if (semi.length > 0) newSections.push({ title: 'Configuradas (Semi-automáticas)', data: semi });
      if (auto.length > 0) newSections.push({ title: 'Configuradas (Automáticas)', data: auto });

      setSections(newSections);
    } catch (e) {
      log.error('ScheduledTransactions: Error al cargar', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData])
  );

  const handleApprove = (tx: DetailedTransaction) => {
    Alert.alert(
      "Confirmar Aprobación",
      `¿Deseas registrar esta transacción de $${tx.amount} para ${tx.description}?`,
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Sí, Aprobar", 
          onPress: async () => {
            try {
              await updateTransaction({
                transactionId: tx.transaction_id,
                accountId: tx.account_id,
                isIncome: tx.is_income === 1,
                amount: tx.amount,
                categoryId: tx.category_id,
                description: tx.description,
                status: 'COMPLETED',
                transactionDate: tx.transaction_date,
              });
              fetchData();
            } catch (e) {
              log.error('ScheduledTransactions: Error al aprobar', e);
            }
          }
        }
      ]
    );
  };

  const handleReject = (tx: DetailedTransaction) => {
    Alert.alert(
      "Confirmar Rechazo",
      "¿Deseas cancelar esta ocurrencia? No se registrará el gasto/ingreso.",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Sí, Rechazar", 
          style: "destructive",
          onPress: async () => {
             // Por simplicidad, lo inactivamos o cambiamos a CANCELLED
             try {
               await deleteTransaction(tx.transaction_id);
               fetchData();
             } catch (e) {
               log.error('ScheduledTransactions: Error al rechazar', e);
             }
          }
        }
      ]
    );
  };

  const renderItem = ({ item }: { item: DetailedTransaction }) => (
    <View className="bg-dark-800 border border-dark-700 rounded-3xl p-5 mb-4 flex-row items-center justify-between">
      <View className="flex-row items-center flex-1 pr-4">
        <View 
          className="w-12 h-12 rounded-2xl items-center justify-center mr-4"
          style={{ backgroundColor: `${item.category_color}20` }}
        >
          <Text style={{ fontSize: 20 }}>{item.category_icon}</Text>
        </View>
        
        <View className="flex-1">
          <Text className="text-white font-semibold text-base mb-1" numberOfLines={1}>
            {item.description || item.category_name}
          </Text>
          <View className="flex-row items-center">
            <Calendar size={12} color="#94a3b8" />
            <Text className="text-gray-400 text-xs ml-1 mr-3">{getDateLabel(item.transaction_date)}</Text>
            {item.status === 'SCHEDULED' && (
              <View className="flex-row items-center">
                <Clock size={12} color="#94a3b8" />
                <Text className="text-gray-400 text-xs ml-1 uppercase">{item.recurrence_frequency}</Text>
              </View>
            )}
          </View>
        </View>
      </View>

      <View className="items-end">
        <Text className={`font-bold text-lg mb-2 ${item.is_income ? 'text-green-500' : 'text-white'}`}>
          {item.is_income ? '+' : '-'} ${item.amount}
        </Text>
        
        {item.status === 'DUE' && (
          <View className="flex-row gap-2">
            <Pressable 
              onPress={() => handleReject(item)}
              className="w-10 h-10 rounded-full bg-red-500/10 items-center justify-center border border-red-500/20"
            >
              <X size={18} color="#ef4444" />
            </Pressable>
            <Pressable 
              onPress={() => handleApprove(item)}
              className="w-10 h-10 rounded-full bg-green-500/10 items-center justify-center border border-green-500/20"
            >
              <Check size={18} color="#22c55e" />
            </Pressable>
          </View>
        )}

        {item.status === 'SCHEDULED' && (
          <Pressable 
            className="w-10 h-10 rounded-full bg-dark-700 items-center justify-center"
            onPress={() => {
              // TODO: Editar programación
              Alert.alert("Próximamente", "La edición de programaciones estará disponible en la siguiente versión.");
            }}
          >
            <Settings size={18} color="#94a3b8" />
          </Pressable>
        )}
      </View>
    </View>
  );

  return (
    <View 
      className="flex-1 bg-dark-900 px-6"
      style={{ paddingTop: Math.max(insets.top, 24) }}
    >
      <View className="flex-row items-center justify-between mb-8">
        <Pressable onPress={() => router.back()} className="w-10 h-10 items-center justify-center rounded-full bg-dark-800 border border-dark-700">
           <ArrowLeft size={20} color="white" />
        </Pressable>
        <Text className="text-white text-xl font-bold">Transacciones Programadas</Text>
        <View className="w-10" />
      </View>

      {loading && sections.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator color="#3b82f6" size="large" />
        </View>
      ) : sections.length === 0 ? (
        <View className="flex-1 items-center justify-center py-20 px-10">
          <View className="w-20 h-20 bg-dark-800 rounded-full items-center justify-center mb-6">
            <Calendar size={40} color="#475569" />
          </View>
          <Text className="text-white text-lg font-bold mb-2">Sin programaciones</Text>
          <Text className="text-gray-400 text-center">
            Configura tus pagos recurrentes (Netflix, Alquiler, etc.) desde el historial.
          </Text>
        </View>
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.transaction_id.toString()}
          renderItem={renderItem}
          renderSectionHeader={({ section: { title } }) => (
            <SectionHeader title={title} />
          )}
          stickySectionHeadersEnabled={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
        />
      )}
    </View>
  );
}
