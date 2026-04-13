import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import FrotaScreen from './screens/FrotaScreen';
import CarDetailScreen from './screens/CarDetailScreen';
import ReservaScreen from './screens/ReservaScreen';
import ContatoScreen from './screens/ContatoScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Frota" component={FrotaScreen} />
        <Stack.Screen name="CarDetail" component={CarDetailScreen} />
        <Stack.Screen name="Reserva" component={ReservaScreen} />
        <Stack.Screen name="Contato" component={ContatoScreen} />
      </Stack.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>
  );
}
