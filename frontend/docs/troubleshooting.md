# Error Log & Troubleshooting

This document tracks errors encountered during development and their solutions.

## [2026-01-08] Module not found: Can't resolve '@/components/...'
**Context:** accessing `dashboard/scheduled-expenses` page.
**Error Message:**
```
Module not found: Can't resolve '@/components/Dashboard/transactions/ScheduledTransactionModal'
```
**Analysis:**
- The error indicated a path containing `/transactions/` which did not exist in the source code.
- Verified `tsconfig.json` paths and file structure; all were correct.
- `grep` search showed no references to the incorrect path.

**Root Cause:** Stale Next.js build cache (`.next` folder) retaining old path references or build artifacts.
**Solution:**
1. Stopped the dev server.
2. Deleted the `.next` directory (`rm -Recurse .next -Force`).
3. Restarted the dev server (`npm run dev`).

---

## [2026-01-08] Missing & Duplicate Component Imports
**Context:** Reviewing dashboard pages (`dashboard/page.tsx`, `transactions/page.tsx`).
**Error/Issue:**
- `TransactionModal` import was commented out in `dashboard/page.tsx`.
- `TransactionModal` import was duplicated (and commented out) in `transactions/page.tsx`.

**Solution:**
1. Uncommented the import in `dashboard/page.tsx`.
2. Removed the duplicate/commented line in `transactions/page.tsx`.
3. Verified verification of other dashboard pages (`accounts`, `layout`, `scheduled-expenses`).
