import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function BookingScreen({ route, navigation }) {
  const { car } = route.params;
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleConfirm = () => {
    if (startDate && endDate) {
      Alert.alert('Sucesso', `Reserva confirmada para ${car.name} de ${startDate} a ${endDate}`);
      navigation.goBack();
    } else {
      Alert.alert('Erro', 'Por favor, selecione as datas.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reservar {car.name}</Text>
      <TextInput
        style={styles.input}
        placeholder="Data de início (DD/MM/YYYY)"
        value={startDate}
        onChangeText={setStartDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Data de fim (DD/MM/YYYY)"
        value={endDate}
        onChangeText={setEndDate}
      />
      <TouchableOpacity style={styles.button} onPress={handleConfirm}>
        <Text style={styles.buttonText}>Confirmar Reserva</Text>
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
  button: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});