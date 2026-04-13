import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { useAppContext } from '../AppContext';

export default function AdminDashboard({ navigation }) {
  const { config, removeCar } = useAppContext();

  const handleAddCar = () => {
    navigation.navigate('AddCar');
  };

  const handleEditCar = (carId) => {
    navigation.navigate('EditCar', { carId });
  };

  const handleDeleteCar = (id) => {
    Alert.alert(
      'Confirmar',
      'Tem certeza que deseja remover este carro?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Remover', onPress: () => removeCar(id) },
      ]
    );
  };

  const renderCar = ({ item }) => (
    <View style={styles.carItem}>
      <Text style={styles.carName}>{item.name}</Text>
      <Text style={styles.carCategory}>{item.category} - R$ {item.price}/dia</Text>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.editBtn} onPress={() => handleEditCar(item.id)}>
          <Text style={styles.btnText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteBtn} onPress={() => handleDeleteCar(item.id)}>
          <Text style={styles.btnText}>Remover</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Painel Admin</Text>
      <TouchableOpacity style={styles.addBtn} onPress={handleAddCar}>
        <Text style={styles.addBtnText}>Adicionar Novo Carro</Text>
      </TouchableOpacity>
      <FlatList
        data={config.cars}
        renderItem={renderCar}
        keyExtractor={item => item.id}
        style={styles.list}
      />
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.backBtnText}>Voltar ao Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  addBtn: { backgroundColor: '#28a745', padding: 15, borderRadius: 5, alignItems: 'center', marginBottom: 20 },
  addBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  list: { flex: 1 },
  carItem: { backgroundColor: '#fff', padding: 15, marginBottom: 10, borderRadius: 5, elevation: 2 },
  carName: { fontSize: 18, fontWeight: 'bold' },
  carCategory: { color: '#666', marginBottom: 10 },
  actions: { flexDirection: 'row', justifyContent: 'space-between' },
  editBtn: { backgroundColor: '#007bff', padding: 10, borderRadius: 5, flex: 1, marginRight: 5 },
  deleteBtn: { backgroundColor: '#dc3545', padding: 10, borderRadius: 5, flex: 1, marginLeft: 5 },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  backBtn: { backgroundColor: '#6c757d', padding: 15, borderRadius: 5, alignItems: 'center', marginTop: 20 },
  backBtnText: { color: '#fff', fontSize: 16 },
});