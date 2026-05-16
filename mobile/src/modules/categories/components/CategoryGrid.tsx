import { View, Text, Pressable } from 'react-native';
import {
  PlusCircle, Banknote, Briefcase, Gift, Utensils, Home,
  Car, Zap, Gamepad2, Activity, GraduationCap, CreditCard, MinusCircle
} from 'lucide-react-native';

import { CATEGORIES } from '@/src/modules/categories/constants/categories';

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
  selectedCategoryId: string | null;
  onSelectCategory: (id: string) => void;
  isIncome: boolean;
}

export function CategoryGrid({ selectedCategoryId, onSelectCategory, isIncome }: Props) {
  const filteredCategories = CATEGORIES.filter(c => c.is_income === (isIncome ? 1 : 0));

  return (
    <View className="mb-8">
      <Text className="text-body-sm mb-4 ml-1">Selecciona una categoría</Text>

      <View className="flex flex-row flex-wrap justify-start">
        {filteredCategories.map((cat) => {
          const Icon = ICON_MAP[cat.icon] || PlusCircle;
          const isSelected = selectedCategoryId === cat.category_id;
          const safeColor = cat.color || '#9ca3af';

          const unselectedStyle = {
            backgroundColor: `${safeColor}15`,
            borderColor: `${safeColor}30`
          };

          return (
            <Pressable
              key={cat.category_id}
              onPress={() => onSelectCategory(cat.category_id)}
              className="items-center"
              style={{ width: '33.33%', paddingHorizontal: 8, marginBottom: 24 }}
            >
              <View
                className={`w-14 h-14 rounded-2xl items-center justify-center border-2 mb-2 ${isSelected ? 'bg-seed-600 border-seed-400' : ''}`}
                style={isSelected ? {} : unselectedStyle}
              >
                <Icon color={isSelected ? '#fff' : safeColor} size={24} />
              </View>
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                className={`text-[10px] text-center font-medium leading-tight ${isSelected ? 'text-seed-400 font-bold' : 'text-zinc-400'}`}
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
