import { 
  CreditCard, Banknote, Briefcase, Utensils, Gift, 
  Home, Car, Zap, Gamepad2, HeartPulse, GraduationCap, 
  PlusCircle, MinusCircle, CircleDollarSign
} from 'lucide-react-native';

/**
 * Mapea un iconName en string al componente respectivo de Lucide-React-Native.
 * Solo utilidades visuales/interfaz.
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
