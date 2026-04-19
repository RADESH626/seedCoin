# Tasks - Build Optimization & Environment Separation

- [ ] **1. Configuration Layer**
  - [ ] Update `mobile/eas.json` with the three standard profiles (`development`, `preview`, `production`).
  - [ ] Add `EXPO_PUBLIC_APP_VARIANT` to the `env` block of each profile in `eas.json`.

- [ ] **2. UI Implementation**
  - [ ] Modify `mobile/components/profile/ProfileMenu.tsx` to add the `showDeveloperFeatures` property and its conditional logic.
  - [ ] Update `mobile/app/(tabs)/profile.tsx` to read the environment variable and pass the flag to the menu.

- [ ] **3. Quality Assurance (VERIFY)**
  - [ ] Test the conditional visibility of the "Reset Database" button in the development server.
  - [ ] Simulate a production variant to ensure the button is hidden.
  - [ ] Run `verify-build` to check TypeScript integrity.

- [ ] **4. Documentation & Closure**
  - [ ] Provide the user with the lightweight SDK installation instructions.
  - [ ] Update `walkthrough.md`.
