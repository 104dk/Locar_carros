import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

import { AppProvider } from './AppContext';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import FrotaScreen from './screens/FrotaScreen';
import CarDetailScreen from './screens/CarDetailScreen';
import ReservaScreen from './screens/ReservaScreen';
import ContatoScreen from './screens/ContatoScreen';
import AdminDashboard from './screens/AdminDashboard';
import DevSettings from './screens/DevSettings';
import AddCar from './screens/AddCar';
import EditCar from './screens/EditCar';

const Stack = createStackNavigator();

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Frota" component={FrotaScreen} />
          <Stack.Screen name="CarDetail" component={CarDetailScreen} />
          <Stack.Screen name="Reserva" component={ReservaScreen} />
          <Stack.Screen name="Contato" component={ContatoScreen} />
          <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
          <Stack.Screen name="DevSettings" component={DevSettings} />
          <Stack.Screen name="AddCar" component={AddCar} />
          <Stack.Screen name="EditCar" component={EditCar} />
        </Stack.Navigator>
        <StatusBar style="light" />
      </NavigationContainer>
    </AppProvider>
  );
}
