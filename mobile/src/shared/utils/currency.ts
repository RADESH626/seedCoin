/**
 * Útiles para el manejo de moneda y precisión financiera en SeedCoin.
 * Centraliza la conversión entre decimales (UI) y enteros (DB).
 */

export type CurrencyType = 'USD' | 'COP';

/**
 * Convierte un valor decimal (ej. 100.50) a céntimos enteros (ej. 10050).
 * Usamos redondeo para evitar problemas de precisión de punto flotante.
 */
export function toCents(amount: number): number {
  return Math.round(amount * 100);
}

/**
 * Convierte un valor en céntimos enteros (ej. 10050) a decimal (ej. 100.50).
 */
export function fromCents(cents: number): number {
  return cents / 100;
}

/**
 * Formatea un número según el estándar de moneda local.
 * @param amount Cantidad en número (decimal)
 * @param currency 'USD' (por defecto) o 'COP'
 */
export function formatMoney(amount: number, currency: CurrencyType = 'USD'): string {
  if (currency === 'COP') {
    // Formato colombiano: sin decimales, usando 'es-CO' para separadores correctos (1.000.000)
    return '$' + Math.round(amount).toLocaleString('es-CO', { 
      minimumFractionDigits: 0, 
      maximumFractionDigits: 0 
    });
  }
  
  // Default: Dólares (USD)
  return '$' + amount.toLocaleString('en-US', { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  });
}
