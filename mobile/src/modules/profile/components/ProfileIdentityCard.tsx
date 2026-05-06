import { View, Text, TextInput, Pressable } from 'react-native';
import { User, Save } from 'lucide-react-native';
import { Card } from '@/components/ui/Card';
import { IconBadge } from '@/components/ui/IconBadge';

interface ProfileIdentityCardProps {
  userName: string;
  tempName: string;
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onTempNameChange: (text: string) => void;
}

export function ProfileIdentityCard({
  userName,
  tempName,
  isEditing,
  onEdit,
  onSave,
  onTempNameChange,
}: ProfileIdentityCardProps) {
  return (
    <Card rounded="extra" padding="xl" className="mb-8 items-center">
      <IconBadge size="xl" color="seed" className="mb-4 shadow-xl shadow-seed-600/30">
        <User color="#fff" size={40} />
      </IconBadge>
      
      {isEditing ? (
        <View className="w-full flex-row gap-2 items-center">
          <TextInput
            autoFocus
            value={tempName}
            onChangeText={onTempNameChange}
            className="flex-1 bg-dark-900 border border-dark-700 rounded-xl px-4 py-2 text-white text-lg font-bold"
          />
          <Pressable 
            onPress={onSave}
            className="bg-seed-600 p-3 rounded-xl active:opacity-70"
          >
            <Save color="#fff" size={20} />
          </Pressable>
        </View>
      ) : (
        <Pressable 
          onPress={onEdit}
          className="items-center"
        >
          <Text className="text-white text-xl font-bold">{userName}</Text>
          <Text className="text-seed-400 text-xs mt-1 font-medium">Toca para editar nombre</Text>
        </Pressable>
      )}
    </Card>
  );
}
