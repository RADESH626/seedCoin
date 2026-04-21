import { ReactNode, Ref } from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';

interface FormFieldProps extends TextInputProps {
  label?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  containerClassName?: string;
  labelClassName?: string;
  ref?: Ref<TextInput>;
}

/**
 * Componente atómico para campos de formulario con estilizado consistente.
 * Estandariza etiquetas a mayúsculas con espaciado tracking-[2px].
 * Implementa el patrón "Dark Input" del sistema de diseño de SeedCoin.
 * 
 * @example
 * <FormField 
 *   label="Nombre de la cuenta" 
 *   placeholder="Ej: Billetera" 
 *   value={name} 
 *   onChangeText={setName} 
 * />
 */
export function FormField({
  label,
  prefix,
  suffix,
  containerClassName = '',
  labelClassName = '',
  ref,
  ...props
}: FormFieldProps) {
  // Ajustamos el padding horizontal dependiendo de si hay prefijo/sufijo
  // para mantener la alineación visual con el borde del contenedor.
  const hasIcons = !!(prefix || suffix);

  return (
    <View className={`mb-6 ${containerClassName}`}>
      {label && (
        <Text 
          className={`text-gray-400 text-[10px] font-bold uppercase tracking-[2px] mb-2 ml-1 ${labelClassName}`}
        >
          {label}
        </Text>
      )}
      
      <View
        className={`flex-row items-center w-full bg-dark-800 rounded-2xl border border-dark-700 focus-within:border-seed-500 overflow-hidden ${
          hasIcons ? 'px-4' : ''
        }`}
      >
        {prefix && (
          <View className="pr-1">
            {prefix}
          </View>
        )}
        
        <TextInput
          ref={ref}
          placeholderTextColor="#4b5563"
          selectionColor="#10b981" // seed-500 color approx
          className={`flex-1 text-white font-medium text-base ${
            hasIcons ? 'py-4' : 'p-4'
          } ${props.className || ''}`}
          // En NativeWind, focus: solo funciona si el elemento es el que recibe el foco.
          // Si el borde está en el contenedor, usamos focus-within en el View.
          {...props}
        />

        {suffix && (
          <View className="pl-1">
            {suffix}
          </View>
        )}
      </View>
    </View>
  );
}
