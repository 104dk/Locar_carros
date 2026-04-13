import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';
import BottomNav from '../components/BottomNav';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      {/* Hero */}
      <View style={styles.hero}>
        <View style={styles.heroGrid} />
        <Text style={styles.heroCar}>🚗</Text>
        <View style={styles.heroContent}>
          <View style={styles.heroBadge}>
            <Text style={styles.badgeText}>Frota Premium Disponível Agora</Text>
          </View>
          <Text style={styles.heroTitle}>
            Dirija com <Text style={styles.heroEm}>Classe.</Text>{'\n'}Reserve com Facilidade.
          </Text>
          <Text style={styles.heroSub}>
            Os melhores veículos do mercado para sua viagem de negócios, passeio ou ocasião especial em Brasília e Goiânia.
          </Text>
          <View style={styles.heroBtns}>
            <TouchableOpacity style={styles.btnPrimary} onPress={() => navigation.navigate('Frota')}>
              <Text style={styles.btnPrimaryText}>Ver Frota</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnSecondary} onPress={() => navigation.navigate('Reserva')}>
              <Text style={styles.btnSecondaryText}>Fazer Reserva</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.heroStats}>
            <View style={styles.stat}>
              <Text style={styles.statNum}>500+</Text>
              <Text style={styles.statLabel}>Clientes</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNum}>50+</Text>
              <Text style={styles.statLabel}>Veículos</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNum}>4.9★</Text>
              <Text style={styles.statLabel}>Avaliação</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TouchableOpacity style={styles.searchBtn} onPress={() => navigation.navigate('Frota')}>
          <Text style={styles.searchBtnText}>🔍 Buscar Veículos Disponíveis</Text>
        </TouchableOpacity>
      </View>

      {/* Features */}
      <View style={styles.features}>
        <View style={styles.feature}>
          <Text style={styles.featureIcon}>🛡️</Text>
          <Text style={styles.featureTitle}>Seguro Incluso</Text>
          <Text style={styles.featureDesc}>Cobertura básica em todos os veículos</Text>
        </View>
        <View style={styles.feature}>
          <Text style={styles.featureIcon}>💰</Text>
          <Text style={styles.featureTitle}>Melhor Preço</Text>
          <Text style={styles.featureDesc}>Garantia de menor tarifa</Text>
        </View>
        <View style={styles.feature}>
          <Text style={styles.featureIcon}>📍</Text>
          <Text style={styles.featureTitle}>Entrega Local</Text>
          <Text style={styles.featureDesc}>Levamos até você em Brasília e Goiânia</Text>
        </View>
      </View>

      {/* Reviews */}
      <View style={styles.secTitle}>
        <Text style={styles.secTitleText}>Avaliações de Clientes</Text>
      </View>
      <View style={styles.reviews}>
        <View style={styles.review}>
          <View style={styles.reviewHeader}>
            <View style={styles.avatar}><Text style={styles.avatarText}>RF</Text></View>
            <View>
              <Text style={styles.reviewerName}>Ricardo Ferreira</Text>
              <Text style={styles.stars}>★★★★★</Text>
            </View>
          </View>
          <Text style={styles.reviewText}>Serviço impecável! Reservei online em minutos, o carro estava impecável e a entrega foi pontual. Recomendo muito a AutoLux.</Text>
        </View>
        <View style={styles.review}>
          <View style={styles.reviewHeader}>
            <View style={styles.avatar}><Text style={styles.avatarText}>AS</Text></View>
            <View>
              <Text style={styles.reviewerName}>Amanda Souza</Text>
              <Text style={styles.stars}>★★★★★</Text>
            </View>
          </View>
          <Text style={styles.reviewText}>Aluguei um BMW para um evento corporativo. Experiência premium do início ao fim. Voltarei sempre!</Text>
        </View>
      </View>
      <BottomNav navigation={navigation} active="Home" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#080808' },
  hero: {
    minHeight: 400,
    backgroundColor: '#060606',
    position: 'relative',
    justifyContent: 'center',
    padding: 20,
    overflow: 'hidden',
  },
  heroGrid: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    opacity: 0.025,
    backgroundImage: 'linear-gradient(#B8932A 1px, transparent 1px), linear-gradient(90deg, #B8932A 1px, transparent 1px)',
    backgroundSize: '44px 44px',
  },
  heroCar: {
    position: 'absolute',
    right: -20,
    bottom: 20,
    fontSize: 120,
    opacity: 0.1,
  },
  heroContent: { position: 'relative', zIndex: 2, maxWidth: 320 },
  heroBadge: {
    backgroundColor: 'rgba(140,28,28,0.8)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  badgeText: { color: '#f8a0a0', fontSize: 10, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.2 },
  heroTitle: { fontSize: 28, fontWeight: '700', color: '#f5f5f0', marginBottom: 12, lineHeight: 32 },
  heroEm: { color: '#F0C040' },
  heroSub: { color: '#999', fontSize: 14, lineHeight: 20, marginBottom: 24 },
  heroBtns: { flexDirection: 'row', gap: 10, marginBottom: 24 },
  btnPrimary: {
    backgroundColor: '#B8932A',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  btnPrimaryText: { color: '#080808', fontSize: 13, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.12 },
  btnSecondary: {
    borderColor: '#F0C040',
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  btnSecondaryText: { color: '#F0C040', fontSize: 13, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.12 },
  heroStats: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  stat: { alignItems: 'center' },
  statNum: { fontSize: 18, fontWeight: '700', color: '#F0C040' },
  statLabel: { fontSize: 9, color: '#555', textTransform: 'uppercase', letterSpacing: 0.1 },
  searchBar: {
    backgroundColor: '#0f0f0f',
    borderTopWidth: 2,
    borderTopColor: '#B8932A',
    padding: 20,
    marginHorizontal: 15,
    marginTop: -10,
    borderRadius: 12,
    elevation: 4,
  },
  searchBtn: {
    backgroundColor: '#B8932A',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  searchBtnText: { color: '#080808', fontSize: 13, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.15 },
  features: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginTop: 20,
    gap: 1,
    backgroundColor: 'rgba(184,147,42,0.2)',
  },
  feature: {
    flex: 1,
    backgroundColor: '#0f0f0f',
    padding: 15,
    alignItems: 'center',
  },
  featureIcon: { fontSize: 26, marginBottom: 10 },
  featureTitle: { color: '#F0C040', fontSize: 12, fontWeight: '700', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.05 },
  featureDesc: { color: '#555', fontSize: 10, textAlign: 'center', lineHeight: 14 },
  secTitle: { marginHorizontal: 15, marginTop: 30, marginBottom: 15 },
  secTitleText: { fontSize: 18, color: '#F0C040', fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.1 },
  reviews: { paddingHorizontal: 15, marginBottom: 20 },
  review: {
    backgroundColor: '#0f0f0f',
    borderColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },
  reviewHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(240,192,64,0.1)',
    borderColor: 'rgba(240,192,64,0.4)',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: '#F0C040', fontSize: 13, fontWeight: '700' },
  reviewerName: { fontSize: 14, fontWeight: '600', color: '#f5f5f0' },
  stars: { color: '#F0C040', fontSize: 13, letterSpacing: 1 },
  reviewText: { color: '#999', fontSize: 13, lineHeight: 18 },
});