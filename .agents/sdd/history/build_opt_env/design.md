# Technical Design - Build Optimization & Environment Separation

## Core Logic: Environment Identification
We will use `process.env.EXPO_PUBLIC_APP_VARIANT` to distinguish between environments.

| Variant | Visibility | Description |
|---------|------------|-------------|
| `development` | Full | Default for `expo start`. Includes all features. |
| `preview` | Full | For internal APKs. Includes reset and logs. |
| `production` | Restricted | For clients. Hides developer tools. |

## UI Components

### ProfileMenu (`mobile/components/profile/ProfileMenu.tsx`)
- **New Prop:** `showDeveloperFeatures: boolean`
- **Logic:** Conditionally render the `RotateCcw` list item.

### ProfileScreen (`mobile/app/(tabs)/profile.tsx`)
- **Integration:** Calculate `showDeveloperFeatures` using `process.env.EXPO_PUBLIC_APP_VARIANT`.
- **Default:** If variable is undefined, default to `true` (safe for development).

## Configuration Layer

### EAS Profiles (`mobile/eas.json`)
```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "env": { "EXPO_PUBLIC_APP_VARIANT": "development" }
    },
    "preview": {
      "android": { "buildType": "apk" },
      "env": { "EXPO_PUBLIC_APP_VARIANT": "preview" }
    },
    "production": {
      "env": { "EXPO_PUBLIC_APP_VARIANT": "production" }
    }
  }
}
```

## Infrastructure: Local Build
- Instructions for the user to install `command-line tools` for Android SDK.
- Command for local build: `eas build --platform android --local --profile preview`.
