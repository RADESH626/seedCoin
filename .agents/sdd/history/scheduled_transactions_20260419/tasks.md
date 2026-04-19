# Tasks: Scheduled Transactions

## 1. Database & Types
- [ ] Update `mobile/src/database/types.ts`: Add `SCHEDULED`, `DUE` to `TRANSACTION_STATUS`.
- [ ] Update `mobile/src/database/types.ts`: Add `RecurrenceFrequency` type.
- [ ] Update `mobile/src/database/schema.ts`: Add `is_automatic` to `CREATE_TABLES`.
- [ ] Create/Update tests for schema initialization.

## 2. Scheduler Service (Logic)
- [ ] Create `mobile/src/services/SchedulerService.ts`.
- [ ] Implement `calculateNextOccurrence` logic.
- [ ] Implement `processDueTransactions` (loops through `SCHEDULED` templates).
- [ ] Integrate auto-processing in `mobile/app/_layout.tsx` or similar mounting point.

## 3. Notifications
- [ ] Configure `expo-notifications` setup.
- [ ] Implement silent processing notification in `SchedulerService`.

## 4. UI Components
- [ ] Modify `mobile/components/profile/ProfileMenu.tsx` to add navigation.
- [ ] Create `mobile/app/scheduled-transactions.tsx`:
  - [ ] Implement list sections.
  - [ ] Implement `ScheduledItem` component.
  - [ ] Add confirmation alerts for Approve/Reject.

## 5. Verification
- [ ] Unit tests for date calculations.
- [ ] Integration tests for auto-capture logic.
- [ ] Manual smoke test.
