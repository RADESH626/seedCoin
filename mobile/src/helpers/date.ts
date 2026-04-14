/**
 * Devuelve una etiqueta amigable para una fecha dada (Hoy, Ayer o Fecha Formateada).
 * Formato: es-CO: "day de month de year"
 */
export function getDateLabel(dateStr: string): string {
  const dateObj = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (dateObj.toDateString() === today.toDateString()) {
    return 'Hoy';
  }
  
  if (dateObj.toDateString() === yesterday.toDateString()) {
    return 'Ayer';
  }

  return dateObj.toLocaleDateString('es-CO', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });
}
