# Reporte de Error: Require Cycles por Barrel Files 🐛

- **Fecha:** 03/05/2026
- **Componente:** Metro Bundler / Arquitectura
- **Estado:** ✅ Solucionado

## 📝 Descripción del Problema
Al arrancar la aplicación con Expo Go (código QR), el servidor de Metro lanzaba múltiples advertencias de "Require cycles" (dependencias circulares) asociadas a `useDashboardLogic`, `useTransactionLogic` y `dashboard.api.ts`. Esto provocaba que el motor de JavaScript hiciera un esfuerzo extra en el arranque para resolver el orden de carga de los archivos, retrasando la carga inicial de la aplicación.

## 🔍 Causa Raíz
El problema radicaba en el uso de "Barrel Files" (archivos `index.ts` que re-exportan funciones de otros archivos dentro de un mismo módulo). Algunos de nuestros *hooks* y *servicios* internos estaban importando sus dependencias desde el `index.ts` principal de su propio módulo, lo que generaba un bucle infinito (por ejemplo: `index.ts` importa a `useTransactionLogic`, y a su vez `useTransactionLogic` importa utilidades desde `index.ts`).

## 🛠️ Solución Implementada
Se reemplazaron las importaciones que apuntaban a los "Barrel Files" (ej. `@/src/modules/transactions`) por importaciones directas a los archivos específicos de donde provienen dichas funciones o hooks (ej. `./useTransactionActions`).

### Bloque de Código (Antes)
```tsx
import { 
  useTransactionById, 
  useCreateTransaction, 
  useUpdateTransaction, 
  useDeleteTransaction 
} from '@/src/modules/transactions';
```

### Bloque de Código (Después)
```tsx
import { useTransactionById } from './useTransactionsQuery';
import { 
  useCreateTransaction, 
  useUpdateTransaction, 
  useDeleteTransaction 
} from './useTransactionActions';
```

## 🧠 Lección Aprendida
Evitar el uso de "Barrel Files" (`index.ts`) para importar dependencias internamente dentro del mismo módulo. Los `index.ts` solo deben utilizarse para exponer una API pública del módulo hacia *otros* componentes externos de la aplicación, nunca para resolver importaciones internas cruzadas.
