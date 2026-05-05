---
name: ui-development
description: >
  Golden rules for creating, modifying, or refactoring React Native components, using Modern React 19, Expo Router, and NativeWind styling.
trigger: Creating or styling UI components
allowed-tools: [Read, Edit, Write]
metadata:
  author: seedcoin
  version: "2.0"
  scope: [root, mobile]
  auto_invoke: "Creating interfaces, fixing Frontend styles or React logic"
---

# UI Development (React 19 + NativeWind + React Native)

This skill consolidates Frontend Development, Modern React, and Styling rules for SeedCoin.

## 1. Modern React 19
- **No Manual Memoization**: React Compiler handles optimization. NEVER use `useMemo` or `useCallback` manually.
- **ref as Prop**: `ref` is a normal prop in React 19. Do NOT use `forwardRef`.
- **Imports**: Always use named imports (e.g., `import { useState }`). NO `import React from "react"`.

## 2. React Native Patterns
- **Functional Components Only**: NEVER use class components.
- **FlatList vs ScrollView**: Use `FlatList` for dynamic lists. `ScrollView` only for static/short content.
- **Buttons**: Prefer `Pressable` over `TouchableOpacity`.
- **Safe Area**: Primary screens must be wrapped in safe area components.

## 3. Component Architecture
- **Semantic UI Atomization (Strict)**: Screen files (`app/`) must NOT be monolithic. Extract semantic blocks (Identity, Stats, Menu) into `components/`. Empty States and FABs must be abstract components. Keep screen files < 150 lines.
- **Component File Order**: Hooks -> Derived values -> Handlers -> Early returns -> JSX.
- **Expo Router**: Use `useRouter`, `useLocalSearchParams`, and `Link` for navigation.

## 4. NativeWind & Styling (Dark-First)
- **className Over StyleSheet**: Use `className` with Tailwind utilities. Avoid `StyleSheet.create`.
- **Typography Aliases**: Use defined aliases (`text-h1`, `text-h2`, `text-body-lg`, `text-body-sm`, `text-caption`) instead of raw font classes in JSX.
- **Layout**: Use `standard-screen-px` for horizontal padding. Use `gap-x`/`gap-y` in Flexbox over individual margins.
- **Official Palette**: 
  - Background: `bg-dark-900`
  - Cards: `bg-dark-800`
  - Borders: `border-dark-700`
  - Accent: `text-seed-400`, `bg-seed-500`

## Commands
```bash
# Start dev server
cd mobile && npm start
```
