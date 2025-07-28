
# BankShield AI - Mobile App

AI-Powered Risk-Based Authentication Platform with native mobile capabilities.

## Development

```bash
npm install
npm run dev
```

## Mobile Deployment

This project uses Capacitor to create native iOS and Android apps from the web application.

### Initial Setup

1. **Export to GitHub**: Use the "Export to GitHub" button in Lovable
2. **Clone and Install**: 
   ```bash
   git clone <your-repo-url>
   cd shieldai-auth
   npm install
   ```

### iOS Deployment

1. **Add iOS platform** (requires macOS):
   ```bash
   npx cap add ios
   ```

2. **Build and sync**:
   ```bash
   npm run build
   npx cap sync
   ```

3. **Run on iOS**:
   ```bash
   npx cap run ios
   ```

### Android Deployment

1. **Add Android platform**:
   ```bash
   npx cap add android
   ```

2. **Build and sync**:
   ```bash
   npm run build
   npx cap sync
   ```

3. **Run on Android**:
   ```bash
   npx cap run android
   ```

### Available Scripts

- `npm run cap:add-ios` - Add iOS platform
- `npm run cap:add-android` - Add Android platform
- `npm run cap:sync` - Sync web assets with native platforms
- `npm run cap:run-ios` - Run on iOS simulator/device
- `npm run cap:run-android` - Run on Android emulator/device
- `npm run cap:open-ios` - Open iOS project in Xcode
- `npm run cap:open-android` - Open Android project in Android Studio

### Requirements

- **iOS**: macOS with Xcode installed
- **Android**: Android Studio with Android SDK

### Hot Reload

The app is configured for hot reload during development. Changes to your web code will automatically update in the mobile app.

## Features

- Risk-based authentication
- Real-time security monitoring
- RAG (Retrieval-Augmented Generation) challenges
- Biometric authentication simulation
- Mobile-optimized UI

## Architecture

- **Frontend**: React + TypeScript + Tailwind CSS
- **Mobile**: Capacitor for native iOS/Android
- **State Management**: React Query
- **Routing**: React Router
- **UI Components**: Radix UI + shadcn/ui
