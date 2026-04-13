import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { config as defaultConfig } from './config';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [mode, setMode] = useState('Cliente'); // Cliente, Admin, Dev
  const [config, setConfig] = useState(defaultConfig);

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      const storedConfig = await AsyncStorage.getItem('appConfig');
      if (storedConfig) {
        setConfig(JSON.parse(storedConfig));
      }
    } catch (error) {
      console.error('Erro ao carregar config:', error);
    }
  };

  const saveConfig = async (newConfig) => {
    try {
      await AsyncStorage.setItem('appConfig', JSON.stringify(newConfig));
      setConfig(newConfig);
    } catch (error) {
      console.error('Erro ao salvar config:', error);
    }
  };

  const updateConfig = (key, value) => {
    const newConfig = { ...config, [key]: value };
    saveConfig(newConfig);
  };

  const addCar = (car) => {
    const newCars = [...config.cars, { ...car, id: Date.now().toString() }];
    updateConfig('cars', newCars);
  };

  const removeCar = (id) => {
    const newCars = config.cars.filter(car => car.id !== id);
    updateConfig('cars', newCars);
  };

  const updateCar = (id, updatedCar) => {
    const newCars = config.cars.map(car => car.id === id ? { ...car, ...updatedCar } : car);
    updateConfig('cars', newCars);
  };

  return (
    <AppContext.Provider value={{
      mode,
      setMode,
      config,
      updateConfig,
      addCar,
      removeCar,
      updateCar,
    }}>
      {children}
    </AppContext.Provider>
  );
};