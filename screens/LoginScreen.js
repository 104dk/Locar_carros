import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAppContext } from '../AppContext';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedMode, setSelectedMode] = useState('Cliente');
  const { setMode } = useAppContext();

  const handleLogin = () => {
    if (email && password) {
      setMode(selectedMode);
      if (selectedMode === 'Cliente') {
        navigation.navigate('Home');
      } else if (selectedMode === 'Admin') {
        navigation.navigate('AdminDashboard');
      } else if (selectedMode === 'Dev') {
        navigation.navigate('DevSettings');
      }
    } else {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Text style={styles.modeLabel}>Selecione o Modo:</Text>
      <View style={styles.modeButtons}>
        <TouchableOpacity
          style={[styles.modeButton, selectedMode === 'Cliente' && styles.modeButtonActive]}
          onPress={() => setSelectedMode('Cliente')}
        >
          <Text style={[styles.modeButtonText, selectedMode === 'Cliente' && styles.modeButtonTextActive]}>Cliente</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modeButton, selectedMode === 'Admin' && styles.modeButtonActive]}
          onPress={() => setSelectedMode('Admin')}
        >
          <Text style={[styles.modeButtonText, selectedMode === 'Admin' && styles.modeButtonTextActive]}>Admin</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modeButton, selectedMode === 'Dev' && styles.modeButtonActive]}
          onPress={() => setSelectedMode('Dev')}
        >
          <Text style={[styles.modeButtonText, selectedMode === 'Dev' && styles.modeButtonTextActive]}>Dev</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  modeLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  modeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  modeButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007bff',
  },
  modeButtonActive: {
    backgroundColor: '#007bff',
  },
  modeButtonText: {
    color: '#007bff',
    fontWeight: '600',
  },
  modeButtonTextActive: {
    color: '#fff',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});