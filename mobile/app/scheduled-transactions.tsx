import { useMemo, useCallback } from 'react';
import { View, Text, SectionList, Pressable, Alert, ActivityIndicator } from 'react-native';
import { useFocusEffect, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Check, X, Calendar, Settings, ArrowLeft, Clock } from 'lucide-react-native';
import { CircularAddButton } from '@/components/ui/CircularAddButton';
import { Card } from '@/components/ui/Card';
import { IconBadge } from '@/components/ui/IconBadge';

import { useScheduledTransactions, useUpdateTransaction, useDeleteTransaction } from '@/src/modules/transactions';
import { DetailedTransaction } from '@/src/modules/transactions/types';
import { log } from '@/src/shared/services/logger';
import { getDateLabel } from '@/src/shared/utils/date';



// Componentes UI Reutilizables (simplificados para no fragmentar demasiado)
function SectionHeader({ title }: { title: string }) {
  return (
    <View className="bg-dark-900 py-4">
      <Text className="text-caption">{title}</Text>
    </View>
  );
}

export default function ScheduledTransactionsScreen() {
  const insets = useSafeAreaInsets();
  
  const { data: allSchedules = [], isPending, refetch } = useScheduledTransactions();
  const updateMutation = useUpdateTransaction();
  const deleteMutation = useDeleteTransaction();

  const sections = useMemo(() => {
    const due = allSchedules.filter((t: DetailedTransaction) => t.status === 'DUE');
    const semi = allSchedules.filter((t: DetailedTransaction) => t.status === 'SCHEDULED' && t.is_automatic === 0);
    const auto = allSchedules.filter((t: DetailedTransaction) => t.status === 'SCHEDULED' && t.is_automatic === 1);


    const newSections = [];
    if (due.length > 0) newSections.push({ title: 'Pendientes de Aprobación', data: due });
    if (semi.length > 0) newSections.push({ title: 'Configuradas (Semi-automáticas)', data: semi });
    if (auto.length > 0) newSections.push({ title: 'Configuradas (Automáticas)', data: auto });
    return newSections;
  }, [allSchedules]);


  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );


  const handleApprove = (tx: DetailedTransaction) => {
    Alert.alert(
      "Confirmar Aprobación",
      `¿Deseas registrar esta transacción de $${tx.amount} para ${tx.description}?`,
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Sí, Aprobar", 
          onPress: () => {
            updateMutation.mutate({
              transactionId: tx.transaction_id,
              accountId: tx.account_id,
              isIncome: tx.is_income === 1,
              amount: tx.amount,
              categoryId: tx.category_id,
              description: tx.description,
              status: 'COMPLETED',
              transactionDate: tx.transaction_date,
              isAutomatic: tx.is_automatic === 1,
            });
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
          onPress: () => {
             deleteMutation.mutate(tx.transaction_id);
          }
        }
      ]
    );
  };


  const renderItem = ({ item }: { item: DetailedTransaction }) => (
    <Card padding="lg" rounded="3xl" className="mb-4 flex-row items-center justify-between">
      <View className="flex-row items-center flex-1 pr-4">
        <View 
          className="size-12 rounded-2xl items-center justify-center mr-4"
          style={{ backgroundColor: `${item.category_color}20` }}
        >
          <Text style={{ fontSize: 20 }}>{item.category_icon}</Text>
        </View>
        
        <View className="flex-1">
          <Text className="text-body-lg" numberOfLines={1}>
            {item.description || item.category_name}
          </Text>
          <View className="flex-row items-center">
            <Calendar size={12} color="#94a3b8" />
            <Text className="text-body-sm ml-1 mr-3">{getDateLabel(item.transaction_date)}</Text>
            {item.status === 'SCHEDULED' && (
              <View className="flex-row items-center">
                <Clock size={12} color="#94a3b8" />
                <Text className="text-caption ml-1">{item.recurrence_frequency}</Text>
              </View>
            )}
          </View>
        </View>
      </View>

      <View className="items-end">
        <Text className={`text-h2 mb-2 ${item.is_income ? 'text-green-500' : 'text-white'}`}>
          {item.is_income ? '+' : '-'} ${item.amount}
        </Text>
        
        {item.status === 'DUE' && (
          <View className="flex-row gap-2">
            <Pressable 
              onPress={() => handleReject(item)}
            >
              <IconBadge color="red" showBorder>
                <X size={18} color="#ef4444" />
              </IconBadge>
            </Pressable>
            <Pressable 
              onPress={() => handleApprove(item)}
            >
              <IconBadge color="green" showBorder>
                <Check size={18} color="#22c55e" />
              </IconBadge>
            </Pressable>
          </View>
        )}

        {item.status === 'SCHEDULED' && (
          <Pressable 
            onPress={() => {
              // TODO: Editar programación
              Alert.alert("Próximamente", "La edición de programaciones estará disponible en la siguiente versión.");
            }}
          >
            <IconBadge color="dark">
              <Settings size={18} color="#94a3b8" />
            </IconBadge>
          </Pressable>
        )}
      </View>
    </Card>
  );

  return (
    <View 
      className="flex-1 bg-dark-900 standard-screen-px"
      style={{ paddingTop: Math.max(insets.top, 24) }}
    >
      <View className="flex-row items-center justify-between mb-8">
        <Pressable onPress={() => router.back()} className="size-10 items-center justify-center rounded-full bg-dark-800 border border-dark-700">
           <ArrowLeft size={20} color="white" />
        </Pressable>
        <Text className="text-h2">Transacciones Programadas</Text>
        <CircularAddButton 
          size="sm"
          onPress={() => router.push('/add-transaction?type=scheduled')} 
        />
      </View>

      {isPending && sections.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator color="#3b82f6" size="large" />
        </View>
      ) : sections.length === 0 ? (

        <View className="flex-1 items-center justify-center py-20 px-10">
          <View className="size-20 bg-dark-800 rounded-full items-center justify-center mb-6">
            <Calendar size={40} color="#475569" />
          </View>
          <Text className="text-h2 mb-2">Sin programaciones</Text>
          <Text className="text-body-sm text-center mb-10">
            Configura tus pagos recurrentes (Netflix, Alquiler, etc.) desde el historial.
          </Text>
          <CircularAddButton 
            size="lg"
            onPress={() => router.push('/add-transaction?type=scheduled')} 
          />
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

