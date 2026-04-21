# Exploration: Scheduled Transactions Bug

## Affected Files
- `mobile/src/modules/transactions/hooks/useTransactionLogic.ts`: Source of the amount parsing bug and save logic.
- `mobile/src/modules/transactions/api/transaction.api.ts`: Verification of `is_automatic` storage logic.
- `mobile/app/scheduled-transactions.tsx`: Filtering logic for the "Automáticas" section.
- `mobile/src/services/SchedulerService.ts`: Processing logic for due transactions.

## Detected Risks
1. **Financial Precision**: The amount parsing logic is currently stripping decimal points, multiplying the intended amount by 100 before `toCents` even runs.
2. **State Synchronization**: React Query cache invalidation might not be sufficient if the `SchedulerService` needs to run immediately after adding a transaction for "today".
3. **UI/UX Confusion**: If a user creates a transaction part of a recurrency, they might expect it to appear in the "History" immediately if the date was today.

## Refactoring Opportunities (Boy Scout)
- Replace manual numeric cleaning in `useTransactionLogic.ts` with a more robust helper or better handling of decimals.
- Add immediate trigger of `SchedulerService.processDueTransactions()` after saving a scheduled transaction.
- Improve `SchedulingOptions` consistency.

## Git State
Current project uses Expo 54 and SQLite.
