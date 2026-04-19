# Technical Design: Scheduled Transactions

## Data Model

### SQLite Schema (`schema.ts`)
```sql
ALTER TABLE TRANSACTIONS ADD COLUMN is_automatic BOOLEAN NOT NULL DEFAULT 1;
```
*(Note: Since we are in development, we can just update the `CREATE_TABLES` string in `schema.ts`).*

### TypeScript Types (`types.ts`)
```typescript
export const TRANSACTION_STATUS = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  SCHEDULED: 'SCHEDULED', // Template
  DUE: 'DUE',             // Pending manual approval
} as const;

export type RecurrenceFrequency = 'DAILY' | 'WEEKLY' | 'BIWEEKLY' | 'MONTHLY' | 'YEARLY';

export interface Transaction {
  // ... existing fields
  status: TransactionStatus;
  recurrence_frequency?: RecurrenceFrequency;
  is_automatic: number; // 0 or 1
}
```

## Service Contracts

### `SchedulerService.ts`
```typescript
/**
 * Scans for all past-due SCHEDULED transactions and processes them.
 */
export async function processDueTransactions(): Promise<void>;

/**
 * Handles the logic for a single triggered schedule.
 */
async function triggerSchedule(template: Transaction): Promise<void>;

/**
 * Calculates next ISO date string based on frequency.
 */
function getNextOccurrence(dateStr: string, frequency: RecurrenceFrequency): string;
```

## UI Structure

### Screens
- `app/scheduled-transactions.tsx`: 
  - `FlatList` with three sections using `renderSectionHeader`.
  - Section 1: `DUE` transactions.
  - Section 2: `SCHEDULED` && `is_automatic == 0`.
  - Section 3: `SCHEDULED` && `is_automatic == 1`.

### Components
- `ScheduledItem`: Card component with dynamic actions.
  - If status `DUE`: Show primary actions (Approve/Reject).
  - If status `SCHEDULED`: Show secondary actions (Edit/Delete).

## Notification Flow
1. `processDueTransactions` runs.
2. If `is_automatic == 1` and `triggered`:
   - Call `Notifications.scheduleNotificationAsync` (immediate).
   - Log activity.
