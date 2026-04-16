import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * Hook para prevenir múltiples ejecuciones simultáneas de una acción.
 * Ideal para navegación (evitar abrir múltiples pantallas) o submits de formularios.
 * 
 * @param action Función asíncrona o de navegación a ejecutar.
 * @param cooldown Tiempo en ms para bloquear ejecuciones después de un éxito (default: 500ms).
 */
export function useSingleAction<T extends (...args: any[]) => any>(
  action: T, 
  cooldown = 500
) {
  const [isProcessing, setIsProcessing] = useState(false);
  const isMounted = useRef(true);

  // Limpieza de montaje
  useEffect(() => {
    return () => { isMounted.current = false; };
  }, []);

  const execute = useCallback(async (...args: Parameters<T>) => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    
    try {
      const result = await action(...args);
      
      // Bloqueamos temporalmente para evitar "double taps" mecánicos
      setTimeout(() => {
        if (isMounted.current) {
          setIsProcessing(false);
        }
      }, cooldown);

      return result;
    } catch (error) {
      if (isMounted.current) {
        setIsProcessing(false);
      }
      throw error;
    }
  }, [action, isProcessing, cooldown]);

  return { execute, isProcessing };
}
