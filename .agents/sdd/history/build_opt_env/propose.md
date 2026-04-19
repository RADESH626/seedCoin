# Proposal - Build Optimization & Environment Separation

## Strategy
1. **Build Duration Optimization:**
   - Implement **Local Builds** via `eas build --local`. This avoids EAS queues and remote overhead.
   - Configure `eas.json` to support local build workflows easily.

2. **Feature Control (Client vs. Developer):**
   - Introduce `EXPO_PUBLIC_APP_VARIANT` environment variable.
   - Update `ProfileMenu` and `ProfileScreen` to conditionally render the "Reset Database" option.
   - In `production` builds, the developer menu items will be completely omitted from the UI.

3. **Build Profiles (eas.json):**
   - **development:** For local development and simulators.
   - **preview:** For testing APKs (Internal distribution).
   - **production:** For final clients (No developer tools).

## Affected Files
- [MODIFY] `mobile/eas.json`
- [MODIFY] `mobile/app/(tabs)/profile.tsx`
- [MODIFY] `mobile/components/profile/ProfileMenu.tsx` (If extraction is needed)

## Rollback Plan
- Revert `eas.json` changes.
- Remove conditional rendering logic in `profile.tsx`.
- The application will default back to showing all features and using remote EAS builds.

## Risks
- **Local Environment:** Local builds require Android Studio / Xcode tools installed and configured on the machine.
- **Environment Variables:** Must be careful with naming convention (`EXPO_PUBLIC_`) to ensure accessibility at build time.
