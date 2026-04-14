import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TrendingUp, TrendingDown } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { formatMoney } from '@/src/helpers/currency';

interface Props {
  totalBalance: number;
  balanceGrowthPct: number;
}

export function TotalBalanceCard({ totalBalance, balanceGrowthPct }: Props) {
  return (
    <LinearGradient
      colors={[Colors.seed[600], Colors.seed[700], Colors.seed[800]]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="w-full rounded-3xl p-6 pt-7 relative overflow-hidden shadow-xl shadow-seed-600/20"
    >
      <View className="absolute -top-5 -right-5 w-32 h-32 bg-white/10 rounded-full" />

      <Text className="text-seed-100 text-sm font-medium mb-1">Saldo Total</Text>
      <Text className="text-white text-4xl font-extrabold tracking-tight mb-6">
        {formatMoney(totalBalance, 'COP')}
      </Text>

      <View className="flex-row items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full border border-white/10 self-start">
        {balanceGrowthPct >= 0 ? (
          <>
            <TrendingUp color="#86efac" size={14} />
            <Text className="text-white text-xs font-semibold">+{balanceGrowthPct.toFixed(1)}% vs. inicio mes</Text>
          </>
        ) : (
          <>
            <TrendingDown color="#fca5a5" size={14} />
            <Text className="text-white text-xs font-semibold">{balanceGrowthPct.toFixed(1)}% vs. inicio mes</Text>
          </>
        )}
      </View>
    </LinearGradient>
  );
}
