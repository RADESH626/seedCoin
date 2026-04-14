---
name: clean-database
description: >
  Standards for database design, optimization, and query writing in SeedCoin.
  Trigger: When creating/modifying SQL schema, triggers, indexes, or queries.
metadata:
  author: seedcoin
  version: "1.0"
  scope: [mobile]
  auto_invoke:
    - "Creating or modifying SQL tables"
    - "Writing database queries"
    - "Optimizing database performance"
---

# Clean Database

This skill defines the technical standards for interacting with SeedCoin's SQLite database, ensuring financial precision and high performance.

## 1. Financial Precision (Currency Handling)

**GOLDEN RULE**: Never use `REAL` (floating point) to store money.

- **Storage**: Use `INTEGER` for all balance, amount, or limit columns.
- **Unit**: Store values in the smallest unit (cents/pennies or whole units if no decimals are used in the locale).
- **Processing**: Multiply by 100 on write and divide by 100 on display (if decimals are required).

**Correct Example**:
```sql
CREATE TABLE ACCOUNT (
    balance INTEGER NOT NULL DEFAULT 0 -- $1.00 is stored as 100
);
```

## 2. Query Optimization (Performance)

### Prohibition of `SELECT *`
Never use `SELECT *`. Always project columns explicitly. This saves memory on the mobile device and prevents errors if the schema changes.

```sql
-- AVOID
SELECT * FROM TRANSACTIONS;

-- CORRECT
SELECT transaction_id, amount, transaction_date FROM TRANSACTIONS;
```

### Indexing Strategy (ESR Rule)
Follow the **Equality, Sort, Range** rule to create indexes:
1. **Equality**: Columns used with `=`.
2. **Sort**: Columns used in `ORDER BY`.
3. **Range**: Columns used with `>`, `<`, `BETWEEN`.

**Example**:
```sql
-- For: WHERE account_id = ? ORDER BY transaction_date DESC
CREATE INDEX idx_tx_acc_date ON TRANSACTIONS(account_id, transaction_date);
```

## 3. Security and Robustness

- **Parameterized Queries**: Always use `?` (positional) or `$name` (named) to prevent SQL injection.
- **Explicit Inserts**: Name the columns in `INSERT` statements to avoid failures if optional columns are added.
- **EXPLAIN QUERY PLAN**: If a query seems slow, use `EXPLAIN QUERY PLAN <query>` to verify if it is correctly using indexes.

## 4. Migrations

- Always increment `DATABASE_VERSION` in `database/index.ts` when changing the schema.
- Implement migration logic for existing databases in the `migrateDbIfNeeded` function.

## Related Resources
- **Schema**: `mobile/src/database/schema.ts`
- **Queries**: `mobile/src/database/queries.ts`
- **Initialization**: `mobile/src/database/index.ts`
