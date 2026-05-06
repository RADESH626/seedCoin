import '../global.css';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import {
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
} from '@expo-google-fonts/inter';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { NotificationService } from '@/src/shared/services/NotificationService';
import { useEffect, useState } from 'react';
import { useColorScheme, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { getDBConnection } from '@/src/database/connection';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Lógica de notificaciones movida a NotificationService.initialize()

const SeedCoinTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#050B14', // bg-dark-900
    card: '#050B14',
    border: '#1E293B', // dark-700
  },
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });
  const [dbLoaded, setDbLoaded] = useState(false);

  useEffect(() => {
    async function initialize() {
      try {
        await getDBConnection();
        setDbLoaded(true);

        // Inicializar y pedir permisos de notificaciones
        await NotificationService.initialize();
        await NotificationService.requestPermissions();
      } catch (e) {
        console.error("Error initializing App:", e);
      }
    }
    initialize();
  }, []);


  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded && dbLoaded) {
      // Procesamos transacciones programadas al iniciar
      import('@/src/shared/services/SchedulerService')
        .then(({ SchedulerService }) => SchedulerService.processDueTransactions())
        .catch(e => console.error("Error processing schedules:", e));

      SplashScreen.hideAsync();
    }
  }, [loaded, dbLoaded]);

  if (!loaded || !dbLoaded) {
    return (
      <View style={{ flex: 1, backgroundColor: '#050B14' }}>
        <StatusBar style="light" />
      </View>
    );
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={SeedCoinTheme}>
        <StatusBar style="light" />
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="add-transaction" options={{ title: 'Nuevo Movimiento', headerShown: false }} />
          <Stack.Screen name="add-account" options={{ presentation: 'modal', headerShown: false }} />
          <Stack.Screen name="manage-accounts" options={{ presentation: 'modal', headerShown: false }} />
          <Stack.Screen name="scheduled-transactions" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </QueryClientProvider>
  );

}

