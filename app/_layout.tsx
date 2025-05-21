import { useColorScheme } from '@/hooks/useColorScheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import CadastroCliente from './(tabs)/CadastroCliente';
import CadastroProfissional from './(tabs)/CadastroProfissional';
import TelaCliente from './(tabs)/TelaCliente';
import TelaEscolhaPerfil from './(tabs)/TelaEscolhaPerfil';
import TelaLogin from './(tabs)/TelaLogin';
import TelaInicial from './TelaInicial';
import type { RootStackParamList } from './types/routes';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack.Navigator initialRouteName="TelaInicial" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="TelaInicial" component={TelaInicial} />
          <Stack.Screen name="Login" component={TelaLogin} />
          <Stack.Screen name="EscolhaPerfil" component={TelaEscolhaPerfil} />
          <Stack.Screen name="CadastroProfissional" component={CadastroProfissional} />
          <Stack.Screen name="CadastroCliente" component={CadastroCliente} />
          <Stack.Screen name="TelaCliente" component={TelaCliente} />
        </Stack.Navigator>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
