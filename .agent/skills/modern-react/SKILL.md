---
name: modern-react
description: >
  Modern React 19 and React Native patterns.
  Trigger: When writing React 19 components, hooks in .tsx, refs as props, React Native patterns, NativeWind, or Expo Router.
metadata:
  author: seedcoin
  version: "1.0"
  scope: [root, mobile]
  auto_invoke: "Writing React 19 / React Native / Expo Router components"
---

# Modern React (React 19 + React Native)

## No Manual Memoization (REQUIRED)

```typescript
// ✅ React Compiler handles optimization automatically
function TransactionList({ transactions }: Props) {
  const filtered = transactions.filter(t => t.type === "income");
  const sorted = filtered.sort((a, b) => b.amount - a.amount);

  const handlePress = (id: number) => {
    router.push(`/transaction/${id}`);
  };

  return <FlatList data={sorted} renderItem={({ item }) => (
    <TransactionCard transaction={item} onPress={() => handlePress(item.id)} />
  )} />;
}

// ❌ NEVER: Manual memoization
const filtered = useMemo(() => transactions.filter(t => t.type === "income"), [transactions]);
const handlePress = useCallback((id: number) => router.push(`/transaction/${id}`), []);
```

## Imports (REQUIRED)

```typescript
// ✅ ALWAYS: Named imports
import { useState, useEffect, useRef } from "react";

// ❌ NEVER
import React from "react";
import * as React from "react";
```

## ref as Prop (No forwardRef)

```typescript
// ✅ React 19: ref is just a prop
function CustomInput({ ref, ...props }: InputProps & { ref?: React.Ref<TextInput> }) {
  return <TextInput ref={ref} {...props} />;
}

// ❌ Old way (unnecessary now)
const CustomInput = forwardRef<TextInput, InputProps>((props, ref) => (
  <TextInput ref={ref} {...props} />
));
```

---

## React Native Patterns

### FlatList vs ScrollView

```typescript
// ✅ FlatList for dynamic lists (virtualization)
<FlatList
  data={transactions}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => <TransactionCard transaction={item} />}
/>

// ✅ ScrollView only for short/static content
<ScrollView>
  <AccountSummary />
  <QuickActions />
</ScrollView>

// ❌ NEVER: ScrollView with dynamic lists
<ScrollView>
  {transactions.map(t => <TransactionCard key={t.id} transaction={t} />)}
</ScrollView>
```

### Pressable vs TouchableOpacity

```typescript
// ✅ Pressable (modern, more flexible)
<Pressable
  onPress={handlePress}
  className="active:opacity-70"
>
  <Text>Press me</Text>
</Pressable>

// ⚠️ TouchableOpacity (legacy, still valid but prefer Pressable)
```

### Platform-Specific

```typescript
import { Platform } from "react-native";

// ✅ For minor differences
const paddingTop = Platform.OS === "ios" ? 44 : 0;

// ✅ For major differences
const styles = Platform.select({
  ios: { shadowColor: "#000", shadowOffset: { width: 0, height: 2 } },
  android: { elevation: 4 },
});
```

---

## NativeWind (Tailwind in RN)

```typescript
// ✅ Use className with NativeWind
<View className="flex-1 bg-background-primary p-4">
  <Text className="text-lg font-bold text-text-primary">
    Balance
  </Text>
</View>

// ❌ AVOID: StyleSheet when NativeWind suffices
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
});
```

## Expo Router

```typescript
import { useRouter, useLocalSearchParams, Link } from "expo-router";

// ✅ Programmatic navigation
const router = useRouter();
router.push("/accounts/new");
router.back();

// ✅ Typed params
type AccountParams = { accountId: string };
const { accountId } = useLocalSearchParams<AccountParams>();

// ✅ Declarative Link
<Link href="/accounts/1" asChild>
  <Pressable>
    <Text>View account</Text>
  </Pressable>
</Link>
```

---

## Component Structure

```typescript
// ✅ Recommended order inside a component
function AccountCard({ account, onPress }: AccountCardProps) {
  // 1. Hooks (state, effects, router)
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  // 2. Derived values
  const formattedBalance = formatCurrency(account.currentBalance);

  // 3. Handlers
  const handleToggle = () => setIsExpanded(!isExpanded);

  // 4. Early returns
  if (!account) return null;

  // 5. JSX
  return (
    <Pressable onPress={onPress} className="bg-white rounded-xl p-4">
      <Text className="text-lg font-bold">{account.name}</Text>
      <Text className="text-xl">{formattedBalance}</Text>
    </Pressable>
  );
}
```

## Quick Reference

| Pattern | Rule |
|---------|------|
| `useMemo` / `useCallback` | DON'T use — React Compiler optimizes |
| `forwardRef` | DON'T use — `ref` is a normal prop |
| Imports | Named: `import { useState }` |
| Lists | `FlatList` for dynamic, `ScrollView` for static |
| Buttons | `Pressable` over `TouchableOpacity` |
| Styles | NativeWind `className` by default |
| Navigation | Expo Router `useRouter` + `Link` |

## Commands

```bash
# Start development
cd mobile && npm start

# Type check
cd mobile && npx tsc --noEmit

# Lint
cd mobile && npm run lint
```

## Resources

- **Components**: `mobile/components/`
- **Screens**: `mobile/app/`
- **Theme/Colors**: `mobile/tailwind.config.js`
- **Complement**: `.agent/skills/frontend_development/SKILL.md`
