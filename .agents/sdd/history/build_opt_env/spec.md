# Specification - Build Optimization & Environment Separation

## Goals
- **G1:** Enable local builds to reduce build time from 17min to ~3-5min.
- **G2:** Automatically hide developer UI components in non-development variants.
- **G3:** Standardize build profiles for consistent deployments.

## Requirements
### R1: Build Profiles
- The project must support three distinct builds:
  - `development`: (Simulator, local dev, all features).
  - `preview`: (APK for internal testing, all features).
  - `production`: (Client build, NO developer features).

### R2: Feature Toggling
- **Given** I am in a `production` build.
- **When** I navigate to the Profile screen.
- **Then** the "Reiniciar Base de Datos" option must NOT be visible.

### R3: Environment Variables
- Use `EXPO_PUBLIC_APP_VARIANT` to identify the current build type.

## Non-Functional Requirements
- **Performance:** Local build execution must not interfere with the dev server if possible.
- **Security:** Ensure that the reset logic is not just hidden but also protected or removed if possible (though for a local SQLite app, hiding is usually sufficient for "clients").
