# Inventario Maestro de Auditoría - SeedCoin

Este archivo rastrea el progreso de la auditoría detallada archivo por archivo (Nivel: Cero Tolerancia). Cada archivo debe ser revisado según las reglas de oro de SeedCoin (Capas, Atomización, Precisión Financiera).

**Estado General**: 🔄 Auditoría Granular en Progreso - 2026-04-19
**Progreso**: 42 / 93 archivos revisados

| Archivo | Estado | Notas / Hallazgos |
| :--- | :---: | :--- |
| **Documentación y Raíz** | | |
| `AGENTS.md` | [ ] | |
| `README.md` | [ ] | |
| **Mobile - App (Rutas y Orquestación)** | | |
| `mobile/app/(tabs)/_layout.tsx` | [ ] | |
| `mobile/app/(tabs)/history.tsx` | [ ] | |
| `mobile/app/(tabs)/index.tsx` | [R] | Hallazgo: Uso de `as any` en Redirect. |
| `mobile/app/(tabs)/limits.tsx` | [ ] | |
| `mobile/app/(tabs)/profile.tsx` | [ ] | |
| `mobile/app/_layout.tsx` | [ ] | |
| `mobile/app/+html.tsx` | [ ] | |
| `mobile/app/+not-found.tsx` | [ ] | |
| `mobile/app/add-account.tsx` | [ ] | |
| `mobile/app/add-transaction.tsx` | [R] | Hallazgo: Lógica de cambio de tipo en el orquestador. |
| `mobile/app/manage-accounts.tsx` | [x] | Validado: Correcta orquestación. |
| `mobile/app/onboarding.tsx` | [ ] | |
| `mobile/app/scheduled-transactions.tsx` | [ ] | |
| **Mobile - Components (UI Base)** | | |
| `mobile/components/ui/AddAccountButton.tsx` | [R] | Hallazgo: React 19 (import React). |
| `mobile/components/ui/BackgroundAtmosphere.tsx` | [R] | Hallazgo: React 19 (import React). |
| `mobile/components/ui/Card.tsx` | [R] | Hallazgo: React 19 (import React). |
| `mobile/components/ui/CircularAddButton.tsx" | [R] | Hallazgo: React 19 (import React). |
| `mobile/components/ui/EmptyState.tsx` | [R] | Hallazgo: React 19 (import React). |
| `mobile/components/ui/FloatingActionButton.tsx` | [R] | Hallazgo: React 19 (import React). |
| `mobile/components/ui/FormField.tsx` | [x] | Validado: Correcto uso de ref (React 19). |
| `mobile/components/ui/IconBadge.tsx` | [R] | Hallazgo: React 19 (import React). |
| `mobile/components/ui/LoadingOverlay.tsx` | [R] | Hallazgo: React 19 (import React). |
| `mobile/components/ui/ModalHeader.tsx` | [R] | Hallazgo: React 19 (import React). |
| `mobile/components/ui/PrimaryButton.tsx` | [R] | Hallazgo: React 19 (import React). |
| `mobile/components/ui/ScreenHeader.tsx` | [R] | Hallazgo: React 19 (import React). |
| `mobile/components/ui/SectionHeader.tsx` | [R] | Hallazgo: React 19 (import React). |
| **Mobile - Components (Funcionales)** | | |
| `mobile/components/accounts/AccountTypeSelector.tsx` | [ ] | |
| `mobile/components/dashboard/DashboardHeader.tsx` | [ ] | |
| `mobile/components/dashboard/MonthlySummary.tsx` | [ ] | |
| `mobile/components/dashboard/QuickAccounts.tsx` | [ ] | |
| `mobile/components/dashboard/RecentTransactions.tsx` | [ ] | |
| `mobile/components/dashboard/TotalBalanceCard.tsx` | [ ] | |
| `mobile/components/modals/AddBudgetModal.tsx` | [ ] | |
| `mobile/components/navigation/CustomTabBar.tsx` | [ ] | |
| `mobile/components/navigation/TabBarButton.tsx` | [ ] | |
| `mobile/components/navigation/TabBarFAB.tsx` | [ ] | |
| `mobile/components/onboarding/OnboardingSections.tsx` | [ ] | |
| `mobile/components/profile/ProfileFooter.tsx` | [ ] | |
| `mobile/components/profile/ProfileIdentityCard.tsx` | [ ] | |
| `mobile/components/profile/ProfileMenu.tsx` | [ ] | |
| `mobile/components/profile/ProfileStats.tsx` | [ ] | |
| **Mobile - Modules (Business Logic)** | | |
| `mobile/src/modules/accounts/index.ts` | [x] | |
| `mobile/src/modules/accounts/components/AccountForm.tsx` | [x] | |
| `mobile/src/modules/accounts/components/AccountList.tsx` | [R] | Hallazgo: Renderizado de lista sin FlatList. |
| `mobile/src/modules/accounts/hooks/useAccountLogic.ts` | [R] | Hallazgo: Dependencia de servicios globales legacy. |
| `mobile/src/modules/accounts/hooks/useManageAccountsLogic.ts` | [R] | Hallazgo: React 19 y dependencias legacy. |
| `mobile/src/modules/dashboard/index.ts` | [x] | |
| `mobile/src/modules/dashboard/api/dashboard.api.ts` | [x] | |
| `mobile/src/modules/dashboard/hooks/useDashboardLogic.ts` | [R] | Hallazgo: React 19 y dependencias legacy. |
| `mobile/src/modules/dashboard/hooks/useDashboardQuery.ts` | [x] | |
| `mobile/src/modules/transactions/index.ts` | [ ] | |
| `mobile/src/modules/transactions/api/transaction.api.ts` | [ ] | |
| `mobile/src/modules/transactions/components/AccountSelector.tsx` | [ ] | |
| `mobile/src/modules/transactions/components/AmountInput.tsx` | [ ] | |
| `mobile/src/modules/transactions/components/BudgetCard.tsx` | [ ] | |
| `mobile/src/modules/transactions/components/CategoryGrid.tsx` | [ ] | |
| `mobile/src/modules/transactions/components/HistoryFilters.tsx` | [ ] | |
| `mobile/src/modules/transactions/components/SchedulingOptions.tsx` | [ ] | |
| `mobile/src/modules/transactions/components/TransactionDateField.tsx` | [ ] | |
| `mobile/src/modules/transactions/components/TransactionForm.tsx` | [R] | Hallazgo: Tipado `any` en onDateChange. |
| `mobile/src/modules/transactions/components/TransactionGroup.tsx` | [ ] | |
| `mobile/src/modules/transactions/components/TransactionItem.tsx` | [ ] | |
| `mobile/src/modules/transactions/components/TransactionTypeSelector.tsx` | [ ] | |
| `mobile/src/modules/transactions/hooks/useTransactionActions.ts` | [ ] | |
| `mobile/src/modules/transactions/hooks/useTransactionLogic.ts` | [ ] | |
| `mobile/src/modules/transactions/hooks/useTransactionsQuery.ts` | [ ] | |
| `mobile/src/modules/transactions/types/index.ts` | [ ] | |
| **Mobile - Infrastructure** | | |
| `mobile/src/database/connection.ts` | [x] | Validado: Singleton Promise Pattern funcional. |
| `mobile/src/database/index.ts` | [x] | Validado: Gestión de migraciones robusta. |
| `mobile/src/database/queries.ts` | [x] | Validado: Queries explícitas y eficientes. |
| `mobile/src/database/schema.ts` | [x] | Validado: Uso correcto de INTEGER para moneda. |
| `mobile/src/database/seed.ts` | [x] | Validado: Categorías iniciales bien definidas. |
| `mobile/src/database/test-utils.ts` | [ ] | |
| `mobile/src/database/types.ts` | [x] | Validado: Tipado estricto de DB a Props. |
| `mobile/src/database/utils.ts` | [ ] | |
| `mobile/src/helpers/currency.ts` | [R] | Hallazgo: Intl safety en Android (toLocaleString). |
| `mobile/src/helpers/database.ts" | [ ] | |
| `mobile/src/helpers/date.ts` | [ ] | |
| `mobile/src/helpers/transactions.ts` | [ ] | |
| `mobile/src/helpers/ui.tsx` | [ ] | |
| **Mobile - Legacy / Services** | | |
| `mobile/src/hooks/useAccounts.ts` | [ ] | |
| `mobile/src/hooks/useBudgets.ts" | [ ] | |
| `mobile/src/hooks/useCategories.ts` | [ ] | |
| `mobile/src/hooks/usePreferences.ts` | [ ] | |
| `mobile/src/hooks/useSingleAction.ts` | [ ] | |
| `mobile/src/services/AccountService.ts` | [x] | Validado: Uso de withNativeRetry. |
| `mobile/src/services/BudgetService.ts` | [ ] | |
| `mobile/src/services/CategoryService.ts` | [ ] | |
| `mobile/src/services/logger.ts` | [ ] | |
| `mobile/src/services/NotificationService.ts` | [x] | Validado: Safe-guard para crash en Expo Go. |
| `mobile/src/services/PreferenceService.ts` | [ ] | |
| `mobile/src/services/ProfileService.ts" | [ ] | |
| `mobile/src/services/SchedulerService.ts` | [ ] | |

---
**Leyenda**:
- `[ ]` Pendiente de Revisión Profunda
- `[R]` Reportado (Hallazgos en el reporte de auditoría) 🔴
- `[x]` Revisado y Aprobado 🟢
- `[!]` Requiere acción inmediata (Bloqueante) 🟡
