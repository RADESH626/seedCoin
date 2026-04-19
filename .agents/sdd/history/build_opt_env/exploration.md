# Exploration Report - Build Optimization & Environment Separation

## Findings

### Build Duration
- **Current State:** Using EAS Build with default settings.
- **Problem:** Free tier EAS builds are slow (queues + generic environment).
- **Optimization Opportunities:**
  - Implement `eas build --local` to leverage the local machine's power.
  - Configure caching in EAS.
  - Optimize dependencies.

### Environment Separation
- **Developer Features:** Identified `handleReset` in `mobile/app/(tabs)/profile.tsx`.
- **Mechanism:** No current environment variable system is in place.
- **Proposed Solution:**
  - Use `EXPO_PUBLIC_` environment variables or `expo-constants` for build-time flags.
  - Define `development`, `preview`, and `production` profiles in `eas.json`.

## Impact Mapping
- **Files to Modify:**
  - `mobile/eas.json`: Add build profiles and environment variables.
  - `mobile/app/(tabs)/profile.tsx`: Conditionally render developer features.
  - `mobile/components/profile/ProfileMenu.tsx`: Likely needs props or context for hiding items.

## Risk Detection
- Local builds require a properly configured Android/iOS development environment on the host machine.
- Environment variables in Expo for production must be set in the EAS Dashboard or secrets.

## Boy Scout Check
- `profile.tsx` looks clean, but the conditional logic for developer features should be centralized or clearly flagged.
