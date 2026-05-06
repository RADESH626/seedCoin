import { View, KeyboardAvoidingView, Platform } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAccountLogic } from '@/src/modules/accounts/hooks/useAccountLogic';
import { AccountForm } from '@/src/modules/accounts/components/AccountForm';
import { ModalHeader } from '@/components/ui/ModalHeader';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { LoadingOverlay } from '@/components/ui/LoadingOverlay';

export default function AddAccountScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  
  const { state, handlers } = useAccountLogic(id);

  return (
    <KeyboardAvoidingView 
      className="flex-1 bg-dark-900" 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View 
        className="flex-1 standard-screen-px"
        style={{ paddingTop: Math.max(insets.top, 16) }}
      >
        <ModalHeader 
          title={state.isEditing ? "Editar Cuenta" : "Nueva Cuenta"} 
          onClose={() => router.back()} 
        />

        <AccountForm 
          name={state.name}
          onNameChange={handlers.setName}
          accountType={state.accountType}
          onAccountTypeChange={handlers.setAccountType}
          balance={state.balance}
          onBalanceChange={handlers.setBalance}
          yieldRate={state.yieldRate}
          onYieldRateChange={handlers.setYieldRate}
          paymentDay={state.paymentDay}
          onPaymentDayChange={handlers.setPaymentDay}
          isEditing={state.isEditing}
        />

        <View className="pb-8 pt-4">
          <PrimaryButton 
            label={state.isEditing ? "Actualizar Cuenta" : "Guardar Cuenta"}
            onPress={handlers.handleSave}
            disabled={!state.name.trim()}
            loading={state.loading}
          />
        </View>

        {state.loading && (
          <LoadingOverlay message={state.isEditing ? "Actualizando..." : "Creando cuenta..."} />
        )}

      </View>
    </KeyboardAvoidingView>
  );
}
