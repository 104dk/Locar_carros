import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function CarDetailScreen({ route, navigation }) {
  const { car } = route.params;

  const handleBook = () => {
    navigation.navigate('Reserva', { car });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.carImg}>
        <Text style={styles.carEmoji}>🚗</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.name}>{car.name}</Text>
        <Text style={styles.price}>R$ {car.price} <Text style={styles.perDay}>/ dia</Text></Text>
        <Text style={styles.description}>
          Descrição do carro: Este é um veículo confiável e econômico, perfeito para suas viagens.
        </Text>
        <View style={styles.specs}>
          {car.specs.map((spec, index) => (
            <Text key={index} style={styles.spec}>{spec}</Text>
          ))}
        </View>
        <TouchableOpacity style={styles.button} onPress={handleBook}>
          <Text style={styles.buttonText}>Reservar Agora</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#080808' },
  carImg: {
    height: 200,
    backgroundColor: 'rgba(8,8,8,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  carEmoji: { fontSize: 100, opacity: 0.1 },
  details: { padding: 20 },
  name: { fontSize: 24, fontWeight: '700', color: '#f5f5f0', marginBottom: 10 },
  price: { fontSize: 20, color: '#F0C040', fontWeight: '700', marginBottom: 20 },
  perDay: { color: '#555', fontSize: 16, fontWeight: '400' },
  description: { color: '#999', fontSize: 16, lineHeight: 24, marginBottom: 20 },
  specs: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 30 },
  spec: { color: '#999', backgroundColor: '#1e1e1e', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5, fontSize: 12 },
  button: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});