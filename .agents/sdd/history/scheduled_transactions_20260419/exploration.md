# Exploration: Scheduled Transactions

## Affected Files
- `mobile/src/database/types.ts`: Need to add `SCHEDULED` status and recurrence types.
- `mobile/src/database/schema.ts`: Ensure the schema supports all necessary fields.
- `mobile/src/services/TransactionService.ts`: Add logic to handle creation and execution of scheduled transactions.
- New file (e.g., `mobile/src/services/SchedulerService.ts`): To check and execute due transactions.
- UI Components: `mobile/app/(tabs)/transactions.tsx` (or wherever transactions are created/edited).

## Detected Risks
1. **Concurrency/Race Conditions**: If multiple checks for scheduled transactions happen simultaneously. (SQLite is single-writer, but still needs care).
2. **Date Handling**: Complexities with monthly recurrence (e.g., 31st of the month).
3. **Database triggers**: Current triggers only work for `COMPLETED` transactions. Scheduled ones should stay `SCHEDULED` until executed, then they become `COMPLETED` and a *new* `SCHEDULED` one might be created for the next occurrence.
4. **Performance**: Checking due transactions on every app start might be slow if not indexed properly.

## Refactoring Opportunities (Boy Scout)
- Update `Transaction` interface in `types.ts` to match `schema.ts` (currently missing `recurrence_frequency`).
- Clean up `TransactionService.ts` if it has become too large.

## Questions for Design Phase
- Should scheduled transactions be in the same `TRANSACTIONS` table or a separate `SCHEDULED_TRANSACTIONS` table?
  - Current schema suggests the same table.
- How do we handle "upcoming" transactions in the UI?
- Do we need a "next_run_date" column separate from "transaction_date"?
