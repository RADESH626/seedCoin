# Audit Report: Database Layer (2026-04-14)

## Summary
The database layer has been significantly improved following the PlanetScale/SQLite Expert standards. However, the **Hooks** layer still contains legacy patterns for error handling and lacks explicit handling for the new `INTEGER` currency format.

**Overall Rating**: 🟢🟡 (Good, with specific improvements needed)

---

## Detailed Findings

### 1. `mobile/src/database/hooks.ts`
- **Rating**: 🟡 IMPROVEMENT
- **Issue**: **Redundant Error Handling**. `useAccounts` and `useDashboard` implement manual retry logic for Native SQLite errors, while a robust `withNativeRetry` helper exists at the top of the file.
- **Issue**: **Currency Conversion**. Since the database now returns `INTEGER` (cents), the hooks are passing raw integers to the UI. If the UI expects decimals, this will cause display bugs (e.g., $100 showing as 10000).
- **Suggested Fix**: 
  1. Refactor all hooks to use `withNativeRetry`.
  2. Implement a `formatCurrency` utility or handle the `/ 100` conversion in the hooks' state setters.

### 2. `mobile/src/database/schema.ts`
- **Rating**: 🟢 CLEAN
- **Observation**: Fully compliant with `INTEGER` currency standards and ESR indexing rules.

### 3. `mobile/src/database/queries.ts`
- **Rating**: 🟢 CLEAN
- **Observation**: No `SELECT *` usages found. All projections are explicit.

---

## Conclusion
The core database structure is excellent. The next step is to **propagate the INTEGER precision** up to the Hooks and UI layers to ensure consistent display.

> [!IMPORTANT]
> **Priority**: Refactor `hooks.ts` to use `withNativeRetry` and prepare for currency formatting.
