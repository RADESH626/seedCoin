import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Landmark } from 'lucide-react-native';
import Colors from '@/src/shared/constants/Colors';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { FormField } from '@/components/ui/FormField';
import { log } from '@/src/shared/services/logger';

interface NameSelectionProps {
  onContinue: (name: string) => void;
}

/**
 * Sección inicial de Onboarding para la captura del nombre del usuario.
 * Encapsula la lógica visual de bienvenida.
 */
export function NameSelection({ onContinue }: NameSelectionProps) {
  const [localName, setLocalName] = React.useState('');

  return (
    <View className="flex-1 justify-center items-center px-6">
      <View className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] rounded-full bg-seed-600/10 pointer-events-none blur-3xl scale-150" />

      <View className="w-24 h-24 rounded-full bg-seed-600/20 items-center justify-center mb-8 border border-seed-500/30">
        <Landmark color={Colors.seed[400]} size={48} />
      </View>

      <Text className="text-white text-3xl font-extrabold text-center tracking-tight mb-2">
        ¡Hola! ¿Cómo te llamas?
      </Text>
      <Text className="text-gray-400 text-base text-center mb-8 leading-relaxed px-4">
        Personalicemos tu bóveda financiera.
      </Text>

      <FormField
        containerClassName="w-full"
        className="text-left text-lg text-white"
        placeholder="escribe tu nombre"
        onChangeText={setLocalName}
        autoFocus={true}
        autoCorrect={false}
        spellCheck={false}
      />

      <PrimaryButton
        className="w-full"
        label="Continuar"
        onPress={() => onContinue(localName)}
        disabled={!localName.trim()}
      />
    </View>
  );
}

interface AccountStartProps {
  userName: string;
  onCreateAccount: () => void;
}

/**
 * Sección final de Onboarding que invita a crear la primera cuenta.
 */
export function AccountStart({ userName, onCreateAccount }: AccountStartProps) {
  return (
    <View className="flex-1 justify-center items-center px-6">
      <View className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] rounded-full bg-seed-600/10 pointer-events-none blur-3xl scale-150" />

      <View className="w-24 h-24 rounded-full bg-seed-600/20 items-center justify-center mb-8 border border-seed-500/30">
        <Landmark color={Colors.seed[400]} size={48} />
      </View>

      <Text className="text-white text-3xl font-extrabold text-center tracking-tight mb-3">
        Perfecto, <Text className="text-seed-400">{userName}</Text>
      </Text>
      <Text className="text-gray-400 text-base text-center mb-10 leading-relaxed px-4">
        Ahora vamos a crear tu primera cuenta para comenzar a gestionar tus finanzas.
      </Text>

      <PrimaryButton
        className="w-full"
        label="Crea tu primera cuenta"
        onPress={onCreateAccount}
      />
    </View>
  );
}

