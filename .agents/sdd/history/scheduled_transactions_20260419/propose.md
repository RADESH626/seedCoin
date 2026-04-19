# Proposed Solution: Scheduled Transactions

## Strategy
We will implement a system that uses the `TRANSACTIONS` table to store templates for recurring transactions.

1. **Enhance Types & Constants**:
   - Add `SCHEDULED` to `TRANSACTION_STATUS`.
   - Add `RecurrenceFrequency` enum (Daily, Weekly, Monthly, Yearly).
   - Update `Transaction` interface to include optional `recurrence_frequency`.

2. **Core Logic**:
   - Create `SchedulerService.ts` responsible for:
     - `processDueTransactions()`: Finds scheduled transactions that should have occurred by now and creates actual transaction entries for them.
     - `calculateNextDate(currentDate, frequency)`: Utility to determine the next occurrence date.
   - Integrate `processDueTransactions` into the app's initialization flow (e.g., in a `useEffect` at the root level or within a `DatabaseProvider`).

3. **User Interface**:
   - Modify the transaction creation form to allow setting a recurrence.
   - Add a UI section to view and manage (delete/edit) scheduled transactions.

## Affected Files
- [MODIFY] `mobile/src/database/types.ts`
- [MODIFY] `mobile/src/services/TransactionService.ts`
- [NEW] `mobile/src/services/SchedulerService.ts`
- [NEW] `mobile/src/hooks/useScheduler.ts`
- [MODIFY] `mobile/app/(tabs)/transactions.tsx` (or equivalent creation screen)

## Rollback Plan
1. Delete all transactions with `status = 'SCHEDULED'` from the database.
2. Revert code changes to previous commit.
3. No database schema changes are strictly required as the columns already exist, but if we add any, we would need a migration to revert them.

## Risks & Assumptions
- **Risk**: Missing a processing cycle. *Mitigation*: The service checks for *all* past-due transactions, so if the app isn't opened for a week, it will catch up on all missing transactions.
- **Assumption**: The user wants the recurrence to create a *new* transaction entry each time, keeping the "Scheduled" entry as the "template" for the future.
