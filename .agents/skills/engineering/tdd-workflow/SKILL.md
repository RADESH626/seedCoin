---
name: tdd-workflow
description: >
  Flujo de trabajo de Desarrollo Guiado por Pruebas (TDD) para SeedCoin.
  Trigger: SIEMPRE al implementar funcionalidades, corregir bugs o refactorizar — sin importar el componente.
  Este es un flujo OBLIGATORIO, no opcional.
trigger: Implementar funcionalidad o corregir bug
allowed-tools: [Read, Edit, Write, Command, Task]
metadata:
  author: seedcoin
  version: "1.0"
  scope: [root, mobile]
  auto_invoke:
    - "Implementando una nueva funcionalidad"
    - "Corrigiendo un bug"
    - "Refactorizando código"
---

# Flujo de Trabajo TDD (Test-Driven Development)

## Ciclo TDD (OBLIGATORIO)

```
+-----------------------------------------+
|  RED -> GREEN -> REFACTOR               |
|     ^                        |          |
|     +------------------------+          |
+-----------------------------------------+
```

**La pregunta NO es "¿debería escribir tests?", sino "¿qué tests necesito?"**

---

## Las Tres Leyes de TDD

1. **No escribir código de producción** hasta tener un test fallido.
2. **No escribir más test** de lo necesario para que falle.
3. **No escribir más código** de lo necesario para que pase.

---

## Fase 0: Evaluación (SIEMPRE PRIMERO)

Antes de escribir CUALQUIER código:

```bash
# 1. Buscar tests existentes
find mobile/src -name "*.test.ts" -o -name "*.test.tsx"

# 2. Comprobar cobertura (coverage)
cd mobile && npx jest --coverage --coverageReporters=text-summary

# 3. Leer los tests existentes
```

### Árbol de Decisión

```
+-------------------------------------------------+
|   ¿Existe un archivo de test para este código?  |
+----------+-----------------------+--------------+
           | NO                    | SÍ
           v                       v
+------------------+    +--------------------------+
| CREAR archivo    |    | Comprobar cobertura      |
| de test          |    | para tu cambio           |
| → Fase 1: RED    |    +-----------+--------------+
+------------------+                |
                        +-----------+-----------+
                        | ¿Faltan casos?        |
                        +---+-----------+-------+
                            | SÍ        | NO
                            v           v
                    +-----------+   +-----------+
                    | AÑADIR    |   | Proceder  |
                    | tests     |   | Fase 2    |
                    | Fase 1    |   +-----------+
                    +-----------+
```

---

## Fase 1: RED — Escribir un Test que Falle

### Para NUEVAS Funcionalidades

```typescript
describe("calculateBalance", () => {
  it("debería retornar 0 para una lista vacía", () => {
    // Given (Dado que)
    const transactions: Transaction[] = [];

    // When (Cuando)
    const result = calculateBalance(transactions);

    // Then (Entonces)
    expect(result).toBe(0);
  });
});
```

**Ejecutar → DEBE fallar.** El test hace referencia a código que aún no existe.

### Para CORRECCIÓN DE BUGS

Escribe un test que **reproduzca el bug** primero:

```typescript
it("no debería lanzar error con monto nulo", () => {
  // Este test reproduce el bug reportado
  expect(() => formatAmount(null as any)).not.toThrow();
});
```

**Ejecutar → Debe FALLAR (reproduciendo el bug)**

### Para REFACTORIZACIÓN

Captura TODO el comportamiento actual ANTES de refactorizar:

```bash
# Ejecutar TODOS los tests existentes — deben PASAR
cd mobile && npx jest --passWithNoTests
```

**Ejecutar → Todos deben PASAR (línea base)**

---

## Fase 2: GREEN — Código Mínimo

Escribe el código MÍNIMO para que el test pase. El "hardcoding" (valores fijos) es válido para el primer test.

```typescript
// El test espera que calculateBalance([]) === 0
function calculateBalance(): number {
  return 0; // FAKE IT — el valor fijo es válido para el primer test
}
```

**Esto pasa. Pero no hemos terminado...**

---

## Fase 3: Triangulación (CRÍTICO)

**Un test permite falsear (fake). Múltiples tests FUERZAN la lógica real.**

Añade tests con diferentes entradas que rompan el valor fijo:

| Escenario | ¿Requerido? |
|-----------|-----------|
| Camino feliz (Happy path) | SÍ |
| Valores cero/vacíos | SÍ |
| Valores límite (Boundary) | SÍ |
| Diferentes entradas válidas | SÍ (rompe el fake) |
| Condiciones de error | SÍ |

```typescript
// AÑADIR — rompe el fake:
it("debería sumar ingresos", () => {
  const txns = [{ amount: 1000, type: "income" }];
  expect(calculateBalance(txns)).toBe(1000);
});

it("debería restar gastos", () => {
  const txns = [{ amount: 500, type: "expense" }];
  expect(calculateBalance(txns)).toBe(-500);
});

it("debería manejar precisión decimal", () => {
  const txns = [
    { amount: 10.10, type: "income" },
    { amount: 3.30, type: "expense" },
  ];
  expect(calculateBalance(txns)).toBeCloseTo(6.80, 2);
});
```

**Ahora el fake se ROMPE → Se requiere la implementación real.**

---

## Fase 4: REFACTOR

Tests en GREEN → Mejora la calidad del código SIN cambiar el comportamiento.

- Extraer funciones/métodos.
- Mejorar nombres → invocar `clean-code`.
- Añadir tipos → invocar `strict-typescript`.
- Reducir duplicación.

**Ejecutar tests después de CADA cambio → Deben seguir en GREEN.**

---

## Referencia Rápida

```
+-------------------------------------------------+
|              FLUJO DE TRABAJO TDD               |
+-------------------------------------------------+
| 0. EVALUAR: ¿Qué tests existen? ¿Qué falta?    |
|                                                 |
| 1. RED: Escribir UN test que falle              |
|    +-- Ejecutar → Debe fallar con error claro   |
|                                                 |
| 2. GREEN: Escribir código MÍNIMO para pasar     |
|    +-- Falsear (Fake it) es válido al inicio    |
|                                                 |
| 3. TRIANGULAR: Añadir tests que rompan el fake  |
|    +-- Diferentes entradas, casos de borde      |
|                                                 |
| 4. REFACTOR: Mejorar con confianza              |
|    +-- Los tests se mantienen en verde siempre  |
|                                                 |
| 5. REPETIR: Siguiente comportamiento/requisito  |
+-------------------------------------------------+
```

---

## Anti-Patrones (NUNCA HACER)

```typescript
// 1. Código primero, tests después
function newFeature() { ... }  // Tests después = INÚTIL

// 2. Saltar la triangulación
// Un solo test permite falsear para siempre

// 3. Probar detalles de implementación
expect(component.state.isLoading).toBe(true);   // MAL — prueba el comportamiento
expect(mockService.callCount).toBe(3);           // MAL — acoplamiento frágil

// 4. Todos los tests a la vez antes de cualquier código
// Escribe UN test, haz que pase, LUEGO escribe el siguiente

// 5. Métodos de test gigantes
// Cada test debe verificar UN solo comportamiento
```

## Comandos

```bash
# Modo watch (desarrollo)
cd mobile && npx jest --watch

# Ejecución única
cd mobile && npx jest --passWithNoTests

# Con cobertura (coverage)
cd mobile && npx jest --coverage

# Filtrar por nombre
cd mobile && npx jest --testPathPattern="calculateBalance"

# Solo archivos cambiados
cd mobile && npx jest --onlyChanged
```

## Recursos

- **Tests existentes:** `mobile/src/**/*.test.ts`
- **Configuración de Jest:** `mobile/jest.config.js`
- **Complemento:** `.agent/skills/clean-code/SKILL.md` (calidad de código)
---
