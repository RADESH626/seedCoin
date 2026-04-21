import { View } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Plus } from 'lucide-react-native';

import { useManageAccountsLogic } from '@/src/modules/accounts/hooks/useManageAccountsLogic';
import { AccountList } from '@/src/modules/accounts/components/AccountList';
import { ModalHeader } from '@/components/ui/ModalHeader';
import { FloatingActionButton } from '@/components/ui/FloatingActionButton';

export default function ManageAccountsScreen() {
  const insets = useSafeAreaInsets();
  const { state, handlers } = useManageAccountsLogic();

  return (
    <View className="flex-1 bg-dark-900" style={{ paddingTop: Math.max(insets.top, 16) }}>
      <View className="standard-screen-px flex-1">
        <ModalHeader title="Gestionar Cuentas" onClose={() => router.back()} />

        <AccountList 
          accounts={state.accounts}
          loading={state.loading}
          onEdit={handlers.handleEditAccount}
          onDelete={handlers.handleDelete}
        />
      </View>

      <View 
        className="absolute bottom-10 left-standard right-standard"
        pointerEvents="box-none"
      >
        <FloatingActionButton 
          label="Nueva Cuenta"
          icon={Plus}
          onPress={handlers.handleNewAccount}
        />
      </View>
    </View>
  );
}
