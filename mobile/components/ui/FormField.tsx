import React, { ReactNode, Ref, useState } from 'react';
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
export const FormField = React.memo(function FormField({
  label,
  prefix,
  suffix,
  containerClassName = '',
  labelClassName = '',
  ref,
  onFocus,
  onBlur,
  ...props
}: FormFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const hasIcons = !!(prefix || suffix);

  return (
    <View className={`mb-6 ${containerClassName}`}>
      {label && (
        <Text 
          className={`text-zinc-400 text-[10px] font-bold uppercase tracking-[2px] mb-2 ml-1 ${labelClassName}`}
        >
          {label}
        </Text>
      )}
      
      <View
        className={`flex-row items-center w-full bg-dark-800 rounded-2xl border ${
          isFocused ? 'border-seed-500' : 'border-dark-700'
        } ${hasIcons ? 'px-4' : ''}`}
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
          style={[
            { flex: 1, color: 'white', fontSize: 16, fontWeight: '500' },
            hasIcons ? { paddingVertical: 16 } : { padding: 16 },
            props.style
          ]}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
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
});
