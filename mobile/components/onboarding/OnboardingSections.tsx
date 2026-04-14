import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Landmark } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { PrimaryButton } from '../ui/PrimaryButton';

interface NameSelectionProps {
  nameInput: string;
  setNameInput: (name: string) => void;
  onContinue: () => void;
}

/**
 * Sección inicial de Onboarding para la captura del nombre del usuario.
 * Encapsula la lógica visual de bienvenida.
 */
export function NameSelection({ nameInput, setNameInput, onContinue }: NameSelectionProps) {
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

      <TextInput
        className="w-full bg-dark-800 border border-dark-700 rounded-2xl p-4 text-white text-center text-lg mb-6 shadow-inner"
        placeholder="escribe tu nombre"
        placeholderTextColor="#4b5563"
        value={nameInput}
        onChangeText={setNameInput}
        autoFocus={true}
      />

      <PrimaryButton 
        label="Continuar"
        onPress={onContinue}
        disabled={!nameInput.trim()}
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
        Ahora crea tu primera cuenta y comienza a rastrear tu dinero con estilo.
      </Text>

      <PrimaryButton 
        label="Crea tu primera cuenta"
        onPress={onCreateAccount}
      />
    </View>
  );
}
