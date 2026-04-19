# Specifications: Scheduled Transactions

## Overview
Implement a dual-system for recurring transactions: fully automated (subscriptions) and semi-automated (rent, manual payments).

## Data Requirements
- **Status `SCHEDULED`**: Used as a template for future occurrences.
- **Status `DUE`**: Used for semi-automated occurrences awaiting user approval.
- **Status `COMPLETED`**: Used for executed transactions.
- **Column `is_automatic`**: 1 for silent processing, 0 for manual approval flow.

## Scenarios (Given/When/Then)

### Scenario 1: Automatic Processing
- **Given**: A `SCHEDULED` transaction with `is_automatic = 1` and `transaction_date` in the past or today.
- **When**: `SchedulerService.processDueTransactions()` is triggered.
- **Then**:
  - A clone of the transaction is created with `status = 'COMPLETED'` and current `transaction_date`.
  - The template (`SCHEDULED`) has its `transaction_date` incremented by its `recurrence_frequency`.
  - A local notification is sent via `expo-notifications`.

### Scenario 2: Semi-Automated Processing
- **Given**: A `SCHEDULED` transaction with `is_automatic = 0` and `transaction_date` in the past or today.
- **When**: `SchedulerService.processDueTransactions()` is triggered.
- **Then**:
  - A clone is created with `status = 'DUE'`.
  - The template (`SCHEDULED`) has its `transaction_date` incremented.
  - The user must manually approve this in the "Transacciones Programadas" screen.

### Scenario 3: Approval Flow
- **Given**: A transaction with status `DUE`.
- **When**: The user clicks the "Check" icon in the "Transacciones Programadas" screen and confirms the modal.
- **Then**:
  - The transaction status changes to `COMPLETED`.
  - Database triggers automatically update the account balance.

### Scenario 4: Rejection Flow
- **Given**: A transaction with status `DUE`.
- **When**: The user clicks the "X" icon and confirms.
- **Then**:
  - The transaction status changes to `CANCELLED` (or is soft-deleted).

## Acceptance Criteria
1. The app correctly identifies "due" transactions regardless of how many days have passed since the last start.
2. Notifications work for automatic transactions.
3. The "Transacciones Programadas" screen correctly groups and orders the three types.
4. Confirmation modals appear for any critical action (Approve/Reject/Edit/Delete).
