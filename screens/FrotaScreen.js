import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import BottomNav from '../components/BottomNav';

const categories = ['Econômicos', 'SUVs', 'Premium', 'Luxo'];

const carsData = {
  'Econômicos': [
    { id: '1', name: 'VW Polo', price: 89, image: 'https://via.placeholder.com/150', specs: ['4 portas', '5 pass.', 'Automático', 'Ar-cond.'] },
    { id: '2', name: 'Chev. Onix', price: 95, image: 'https://via.placeholder.com/150', specs: ['4 portas', '5 pass.', 'Manual', 'Ar-cond.'] },
    { id: '3', name: 'Fiat Argo', price: 92, image: 'https://via.placeholder.com/150', specs: ['4 portas', '5 pass.', 'Automático', 'Ar-cond.'] },
  ],
  'SUVs': [
    { id: '4', name: 'Toyota Corolla Cross', price: 189, image: 'https://via.placeholder.com/150', specs: ['4 portas', '5 pass.', 'CVT', 'Ar-cond.'] },
    { id: '5', name: 'Jeep Compass', price: 210, image: 'https://via.placeholder.com/150', specs: ['4 portas', '5 pass.', 'Automático', '4x4'] },
  ],
  'Premium': [
    { id: '6', name: 'Honda Civic', price: 235, image: 'https://via.placeholder.com/150', specs: ['4 portas', '5 pass.', 'Turbo CVT', 'Turbo'] },
    { id: '7', name: 'Chev. Cruze', price: 215, image: 'https://via.placeholder.com/150', specs: ['4 portas', '5 pass.', 'Turbo', 'Couro'] },
  ],
  'Luxo': [
    { id: '8', name: 'BMW Série 3', price: 490, image: 'https://via.placeholder.com/150', specs: ['4 portas', '5 pass.', 'Steptronic', 'Couro'] },
    { id: '9', name: 'Mercedes C200', price: 560, image: 'https://via.placeholder.com/150', specs: ['4 portas', '5 pass.', '9G-Tronic', 'AMG Line'] },
  ],
};

export default function FrotaScreen({ navigation }) {
  const [activeCat, setActiveCat] = useState('Econômicos');

  const renderCar = ({ item }) => (
    <TouchableOpacity style={styles.carCard} onPress={() => navigation.navigate('CarDetail', { car: item })}>
      <View style={styles.carImg}>
        <Text style={styles.carEmoji}>🚗</Text>
      </View>
      <View style={styles.carInfo}>
        <Text style={styles.carName}>{item.name}</Text>
        <Text style={styles.carCategory}>{activeCat}</Text>
        <View style={styles.carSpecs}>
          {item.specs.map((spec, index) => (
            <Text key={index} style={styles.spec}>{spec}</Text>
          ))}
        </View>
        <Text style={styles.carPrice}>R$ {item.price} <Text style={styles.perDay}>/ dia</Text></Text>
        <TouchableOpacity style={styles.btnReserve} onPress={() => navigation.navigate('Reserva', { car: item })}>
          <Text style={styles.btnReserveText}>Reservar Agora</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={{ backgroundColor: '#080808' }}>
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Nossa Frota</Text>
          <Text style={styles.pageSub}>Escolha o veículo perfeito para sua ocasião</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catTabs}>
          {categories.map(cat => (
            <TouchableOpacity
              key={cat}
              style={[styles.catTab, activeCat === cat && styles.catTabActive]}
              onPress={() => setActiveCat(cat)}
            >
              <Text style={[styles.catTabText, activeCat === cat && styles.catTabTextActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <FlatList
          data={carsData[activeCat]}
          renderItem={renderCar}
          keyExtractor={item => item.id}
          numColumns={2}
          contentContainerStyle={styles.carGrid}
          scrollEnabled={false}
        />
      </ScrollView>
      <BottomNav navigation={navigation} active="Frota" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  pageHeader: { padding: 20, borderBottomWidth: 1, borderBottomColor: 'rgba(184,147,42,0.2)', backgroundColor: '#080808' },
  pageTitle: { fontSize: 28, fontWeight: '700', color: '#F0C040', marginBottom: 4 },
  pageSub: { color: '#555', fontSize: 13, letterSpacing: 0.02 },
  catTabs: { paddingHorizontal: 15, marginVertical: 15 },
  catTab: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  catTabActive: { backgroundColor: '#B8932A' },
  catTabText: { color: '#555', fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.12 },
  catTabTextActive: { color: '#080808' },
  carGrid: { paddingHorizontal: 15, paddingBottom: 20 },
  carCard: {
    flex: 1,
    backgroundColor: '#0f0f0f',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 10,
    margin: 5,
    overflow: 'hidden',
  },
  carImg: {
    height: 80,
    backgroundColor: 'rgba(8,8,8,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  carEmoji: { fontSize: 40 },
  carInfo: { padding: 10 },
  carName: { fontSize: 15, fontWeight: '700', color: '#f5f5f0', marginBottom: 2 },
  carCategory: { fontSize: 9, color: '#F0C040', textTransform: 'uppercase', letterSpacing: 0.15, marginBottom: 6, fontWeight: '700' },
  carSpecs: { flexDirection: 'row', flexWrap: 'wrap', gap: 3, marginBottom: 6 },
  spec: { fontSize: 8, color: '#999', backgroundColor: '#1e1e1e', paddingHorizontal: 5, paddingVertical: 2, borderRadius: 3, letterSpacing: 0.04 },
  carPrice: { color: '#F0C040', fontSize: 14, fontWeight: '700', marginBottom: 8 },
  perDay: { color: '#555', fontSize: 11, fontWeight: '400' },
  btnReserve: {
    backgroundColor: 'rgba(140,28,28,0.8)',
    paddingVertical: 7,
    borderRadius: 5,
    alignItems: 'center',
  },
  btnReserveText: { color: '#f5f5f0', fontSize: 10, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.12 },
});