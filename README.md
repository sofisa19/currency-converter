# 💱 Currency Converter

A modern, fast, and interactive Currency Converter application built with **React Native** and **Expo**. This application enables users to reliably convert between various global currencies with real-time exchange rates.

> **Note:** The application is currently tested and fully working for **Android**.

## ✨ Features

- **Real-Time Exchange Rates**: Fetches the latest currency exchange rates efficiently using `@tanstack/react-query`.
- **Currency Selection**: Custom-built `CurrencyPicker` and `CurrencyButton` components for a seamless UI experience.
- **Date Selection**: Integration with `@react-native-community/datetimepicker` for querying currency rates at specific historical dates.
- **Smooth Animations**: Animated transitions and interactive UI elements powered by `react-native-reanimated`.
- **Modern Routing**: Utilizes `expo-router` for file-based routing and navigation, ensuring a clean architecture.
- **Type-Safe**: Developed entirely in **TypeScript** for robust logic and minimal runtime errors.

## 🛠️ Technology Stack

- **Framework**: [Expo](https://expo.dev/) (SDK 55) / React Native
- **Language**: TypeScript
- **Data Fetching & Caching**: [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **Animations**: React Native Reanimated
- **Navigation**: Expo Router (File-based routing)

## 📂 Project Structure

```text
src/
├── app/                  # Expo Router file-based route definitions (index.tsx, _layout.tsx)
├── components/           # Reusable UI components (CurrencyButton, CurrencyPicker, etc.)
├── hooks/                # Custom React hooks containing business and fetching logic 
│                           (useCurrencies.ts, useCurrencyRatesUSD.ts)
└── utils/                # Utility functions and shared types (convert.ts, types.ts)
```

## 🚀 Getting Started

Follow these steps to run the application locally.

### 1. Install Dependencies

Ensure you have Node.js installed, then run the following in the project root:

```bash
npm install
```

### 2. Start the Application

Run the Expo development server:

```bash
npm start
```

### 3. Run on Android (Recommended)

Since the app is optimized and confirmed working for Android, you can launch it on an Android emulator or a physical device:

- Press `a` in the terminal to open the app on a connected Android device or emulator using Expo.
- Alternatively, you can use the native Android run command:
  ```bash
  npm run android
  ```

## 📜 Scripts

Available commands defined in `package.json`:

- `npm start` - Starts the Expo development server.
- `npm run android` - Runs the app natively on Android.
- `npm run ios` - Runs the app natively on iOS.
- `npm run web` - Starts the project on the web.
- `npm run lint` - Lints the codebase using Expo's linting configuration.
