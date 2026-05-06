import { View, Text } from 'react-native';
import { TrendingUp, CalendarDays } from 'lucide-react-native';
import { formatMoney } from '@/src/shared/utils/currency';
import Colors from '@/src/shared/constants/Colors';
import type { Account } from '@/src/database/types';

interface Props {
  account: Account;
}

/**
 * Tarjeta premium con el saldo actual de la cuenta.
 * Si la cuenta es de tipo YIELD, muestra además la tasa de rendimiento y el día de pago.
 */
export function AccountBalanceCard({ account }: Props) {
  const isYield = account.account_type === 'YIELD';

  return (
    <View className="standard-screen-px gap-3">
      {/* Saldo principal */}
      <View className="bg-dark-800 border border-dark-700 rounded-3xl p-6 gap-1">
        <Text className="text-xs font-bold text-gray-400 uppercase tracking-widest">
          Saldo Actual
        </Text>
        <Text className="text-4xl font-bold text-white mt-1">
          {formatMoney(account.current_balance, 'COP')}
        </Text>
        <Text className="text-xs text-gray-500 mt-1">
          Balance inicial: {formatMoney(account.initial_balance, 'COP')}
        </Text>
      </View>

      {/* Datos de rendimiento — solo si aplica */}
      {isYield && (
        <View className="flex-row gap-3">
          <View className="flex-1 bg-dark-800 border border-dark-700 rounded-2xl p-4 gap-2">
            <View className="flex-row items-center gap-2">
              <TrendingUp color={Colors.seed[400]} size={16} />
              <Text className="text-xs font-bold text-seed-400 uppercase tracking-wider">
                Rendimiento
              </Text>
            </View>
            <Text className="text-2xl font-bold text-white">
              {(account.yield_rate ?? 0).toFixed(2)}%
            </Text>
            <Text className="text-[11px] text-gray-400">Tasa anual</Text>
          </View>

          <View className="flex-1 bg-dark-800 border border-dark-700 rounded-2xl p-4 gap-2">
            <View className="flex-row items-center gap-2">
              <CalendarDays color={Colors.seed[400]} size={16} />
              <Text className="text-xs font-bold text-seed-400 uppercase tracking-wider">
                Pago
              </Text>
            </View>
            <Text className="text-2xl font-bold text-white">
              Día {account.payment_day ?? 1}
            </Text>
            <Text className="text-[11px] text-gray-400">Día del mes</Text>
          </View>
        </View>
      )}
    </View>
  );
}
