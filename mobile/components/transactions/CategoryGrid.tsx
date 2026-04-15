import { View, Text, Pressable } from 'react-native';
import { 
  PlusCircle, Banknote, Briefcase, Gift, Utensils, Home, 
  Car, Zap, Gamepad2, Activity, GraduationCap, CreditCard, MinusCircle 
} from 'lucide-react-native';

// Mapeo manual de iconos para evitar dependencias circulares complejas en este componente
const ICON_MAP: Record<string, any> = {
  'cash': Banknote,
  'briefcase': Briefcase,
  'gift': Gift,
  'add-circle-outline': PlusCircle,
  'restaurant': Utensils,
  'home': Home,
  'car': Car,
  'flash': Zap,
  'game-controller': Gamepad2,
  'medkit': Activity,
  'school': GraduationCap,
  'card': CreditCard,
  'remove-circle-outline': MinusCircle,
};

interface Props {
  categories: any[];
  selectedCategoryId: number | null;
  onSelectCategory: (id: number) => void;
  isIncome: boolean;
}

export function CategoryGrid({ categories = [], selectedCategoryId, onSelectCategory, isIncome }: Props) {
  const filteredCategories = Array.isArray(categories) 
    ? categories.filter(c => c.is_income === (isIncome ? 1 : 0))
    : [];

  return (
    <View className="mb-8">
      <Text className="text-gray-400 text-sm font-medium mb-4 ml-1">Selecciona una categoría</Text>
      <View className="flex-row flex-wrap justify-between gap-y-4">
        {filteredCategories.map((cat) => {
          const Icon = ICON_MAP[cat.icon] || PlusCircle;
          const isSelected = selectedCategoryId === cat.category_id;
          
          return (
            <Pressable
              key={cat.category_id}
              onPress={() => onSelectCategory(cat.category_id)}
              className="items-center w-[22%]"
            >
              <View 
                className={`w-14 h-14 rounded-2xl items-center justify-center border-2 mb-2 ${isSelected ? 'bg-seed-600 border-seed-400' : 'bg-dark-800 border-dark-700'}`}
              >
                <Icon color={isSelected ? '#fff' : (cat.color || '#9ca3af')} size={24} />
              </View>
              <Text 
                numberOfLines={1}
                className={`text-[10px] text-center font-medium ${isSelected ? 'text-seed-100' : 'text-gray-500'}`}
              >
                {cat.name}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
