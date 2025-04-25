import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TelaInicial from './TelaInicial';
import TelaLogin from './TelaLogin';
import TelaEscolhaPerfil from './TelaEscolhaPerfil';
import CadastroProfissional from './CadastroProfissional';
import CadastroCliente from './CadastroCliente';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TelaInicial" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="TelaInicial" component={TelaInicial} />
        <Stack.Screen name="Login" component={TelaLogin} />
        <Stack.Screen name="EscolhaPerfil" component={TelaEscolhaPerfil} />
        <Stack.Screen name="CadastroProfissional" component={CadastroProfissional} />
        <Stack.Screen name="CadastroCliente" component={CadastroCliente} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
