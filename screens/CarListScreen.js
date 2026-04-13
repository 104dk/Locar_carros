import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';

const cars = [
  { id: '1', name: 'Toyota Corolla', price: 'R$ 100/dia', image: 'https://via.placeholder.com/150' },
  { id: '2', name: 'Honda Civic', price: 'R$ 120/dia', image: 'https://via.placeholder.com/150' },
  { id: '3', name: 'Ford Focus', price: 'R$ 110/dia', image: 'https://via.placeholder.com/150' },
  // Adicione mais carros conforme necessário
];

export default function CarListScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('CarDetail', { car: item })}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carros Disponíveis</Text>
      <FlatList
        data={cars}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 60,
    borderRadius: 5,
  },
  info: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: '#007bff',
  },
});