---
name: frontend-development
description: >
  Golden rules for creating, modifying, or refactoring React Native components.
  Trigger: When creating interfaces, fixing styles or frontend logic.
metadata:
  author: seedcoin
  version: "1.1"
  scope: [root, mobile]
  auto_invoke: "Creating interfaces, fixing Frontend styles or logic"
---

# Frontend Development Skill (React Native & UI)

This skill defines the golden rules for any modification, creation, or refactoring of visual components in SeedCoin.

## 1. Purpose
Ensure architectural coherence and visual consistency across all screens and components of the mobile application (React Native).

## 2. Relevant File Locations
- **Reusable Components:** `mobile/components/`
- **Screens / Routes:** `mobile/app/`

## 3. Project Rules (Strict)
1. **Functional Components:** **NEVER** use class components (`class Component extends React.Component`). Use exclusively React Functional Components (elements returning JSX) combined with Hooks.
2. **Naming:**
   - Files: `PascalCase` for components (`UserProfile.tsx`).
   - Hooks and functions: `camelCase` (`useUserData`, `fetchData`).
3. **TypeScript:** Strong typing mandatory when interacting with interfaces defined in `mobile/src/database/types.ts`. Using `any` is forbidden.
4. **Safe Area:** Always use the safe area context. Primary screens must be wrapped in safe area components to avoid overlapping with the notch or system bar (`react-native-safe-area-context`).
5. **Semantic UI Atomization (Strict):** Screen files (`app/`) should not be monolithic. Any UI section representing a distinct logical or semantic block (e.g., Identity Card, Stats Summary, Action Menu, Footer) **MUST** be extracted into a separate component in `components/<feature>/`. Do not wait for a block to exceed a specific line count; if it defines a clear sub-section of the UI, it belongs in its own file. Screen files must act as orchestrators, aiming to keep their total JSX footprint minimal and overall file length under 150 lines. This promotes modularity, easier testing, and clearer screen structure.

## 4. Standard Workflow
1. Analyze the required design / mockup.
2. Check if a base component (`Button`, `Card`) exists in `components/` that can be reused before creating one from scratch.
3. Use `export default` if consumed by Expo Router in `app/`, or named export (`export function`) if it belongs to `components/`.

> **Note:** For React 19 patterns, modern React Native, NativeWind, and Expo Router, see `.agent/skills/modern-react/SKILL.md`.

## Commands

```bash
# Start dev server
cd mobile && npm start

# Type check
cd mobile && npx tsc --noEmit

# Lint
cd mobile && npm run lint
```

## Resources

- **Components**: `mobile/components/`
- **Screens**: `mobile/app/`
- **Types**: `mobile/src/database/types.ts`
- **Theme**: `mobile/tailwind.config.js`
- **Complement**: `.agent/skills/modern-react/SKILL.md` (React 19 + RN patterns)
