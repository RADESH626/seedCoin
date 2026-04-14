import { 
  CreditCard, Banknote, Briefcase, Utensils, Gift, 
  Home, Car, Zap, Gamepad2, HeartPulse, GraduationCap, 
  PlusCircle, MinusCircle, CircleDollarSign
} from 'lucide-react-native';

/**
 * Mapea un iconName en string al componente respectivo de Lucide-React-Native
 */
export const getCategoryIcon = (iconName: string, color: string, size: number) => {
  switch (iconName) {
    case 'restaurant': return <Utensils color={color} size={size} />;
    case 'cash': return <Banknote color={color} size={size} />;
    case 'briefcase': return <Briefcase color={color} size={size} />;
    case 'gift': return <Gift color={color} size={size} />;
    case 'home': return <Home color={color} size={size} />;
    case 'car': return <Car color={color} size={size} />;
    case 'flash': return <Zap color={color} size={size} />;
    case 'game-controller': return <Gamepad2 color={color} size={size} />;
    case 'medkit': return <HeartPulse color={color} size={size} />;
    case 'school': return <GraduationCap color={color} size={size} />;
    case 'card': return <CreditCard color={color} size={size} />;
    case 'add-circle-outline': return <PlusCircle color={color} size={size} />;
    case 'remove-circle-outline': return <MinusCircle color={color} size={size} />;
    default: return <CircleDollarSign color={color} size={size} />;
  }
};

export type CurrencyType = 'USD' | 'COP';

/**
 * Formatea un número según el estándar de moneda local
 * @param amount Cantidad en número
 * @param currency 'USD' (por defecto) o 'COP'
 */
export const formatMoney = (amount: number, currency: CurrencyType = 'USD') => {
  if (currency === 'COP') {
    // Formato colombiano: sin decimales, usando 'es-CO' para separadores correctos (1.000.000)
    return '$' + amount.toLocaleString('es-CO', { 
      minimumFractionDigits: 0, 
      maximumFractionDigits: 0 
    });
  }
  
  // Default: Dólares (USD)
  return '$' + amount.toLocaleString('en-US', { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  });
};
