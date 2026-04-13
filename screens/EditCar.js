import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { useAppContext } from '../AppContext';

export default function EditCar({ route, navigation }) {
  const { carId } = route.params;
  const { config, updateCar } = useAppContext();
  const [car, setCar] = useState({
    name: '',
    category: '',
    price: '',
    image: '',
    description: '',
    features: '',
  });

  useEffect(() => {
    const existingCar = config.cars.find(c => c.id === carId);
    if (existingCar) {
      setCar({
        ...existingCar,
        price: existingCar.price.toString(),
        features: existingCar.features.join(', '),
      });
    }
  }, [carId, config.cars]);

  const handleUpdate = () => {
    if (!car.name || !car.category || !car.price) {
      Alert.alert('Erro', 'Preencha pelo menos nome, categoria e preço.');
      return;
    }
    const updatedCar = {
      ...car,
      price: parseFloat(car.price),
      features: car.features.split(',').map(f => f.trim()),
    };
    updateCar(carId, updatedCar);
    Alert.alert('Sucesso', 'Carro atualizado!');
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Editar Carro</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do Carro"
        value={car.name}
        onChangeText={(value) => setCar({ ...car, name: value })}
      />
      <TextInput
        style={styles.input}
        placeholder="Categoria (Luxo, Econômico, etc.)"
        value={car.category}
        onChangeText={(value) => setCar({ ...car, category: value })}
      />
      <TextInput
        style={styles.input}
        placeholder="Preço por Dia"
        value={car.price}
        onChangeText={(value) => setCar({ ...car, price: value })}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="URL da Imagem"
        value={car.image}
        onChangeText={(value) => setCar({ ...car, image: value })}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={car.description}
        onChangeText={(value) => setCar({ ...car, description: value })}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Características (separadas por vírgula)"
        value={car.features}
        onChangeText={(value) => setCar({ ...car, features: value })}
        multiline
      />

      <TouchableOpacity style={styles.updateBtn} onPress={handleUpdate}>
        <Text style={styles.updateBtnText}>Atualizar Carro</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.cancelBtnText}>Cancelar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: { backgroundColor: '#fff', padding: 10, borderRadius: 5, marginBottom: 10, borderWidth: 1, borderColor: '#ccc' },
  updateBtn: { backgroundColor: '#007bff', padding: 15, borderRadius: 5, alignItems: 'center', marginTop: 20 },
  updateBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  cancelBtn: { backgroundColor: '#dc3545', padding: 15, borderRadius: 5, alignItems: 'center', marginTop: 10 },
  cancelBtnText: { color: '#fff', fontSize: 16 },
});