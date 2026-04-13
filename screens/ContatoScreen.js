import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Linking } from 'react-native';

export default function ContatoScreen() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const openWhatsApp = () => {
    Linking.openURL('https://wa.me/5561999999999?text=Olá! Gostaria de falar com a equipe AutoLux.');
  };

  const faqs = [
    { q: 'Preciso de CNH para alugar?', a: 'Sim. É obrigatório apresentar CNH válida na categoria B ou superior. A CNH deve ter no mínimo 2 anos de habilitação.' },
    { q: 'Aceita cartão de crédito?', a: 'Sim! Aceitamos Visa, Mastercard, Elo e American Express. Para veículos de luxo, exigimos cartão com limite mínimo de R$ 3.000 como caução.' },
    { q: 'Fazem entrega do carro?', a: 'Sim! Entregamos em qualquer endereço em Brasília-DF e Goiânia-GO com taxa de R$ 50. Aeroportos e hotéis são os mais comuns.' },
    { q: 'O seguro já está incluso?', a: 'Seguro básico contra terceiros está incluso em todas as diárias. O Seguro Premium com cobertura total é um extra opcional de R$ 45/dia.' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>Contato & Filiais</Text>
        <Text style={styles.pageSub}>Estamos prontos para te atender</Text>
      </View>

      <View style={styles.contatoWrap}>
        <View style={styles.infoCard}>
          <Text style={styles.cardTitle}>Fale Conosco</Text>
          <View style={styles.infoRow}>
            <Text style={styles.icon}>📱</Text>
            <View>
              <Text style={styles.infoStrong}>(61) 99999-9999</Text>
              <Text style={styles.infoText}>WhatsApp disponível</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.icon}>📧</Text>
            <View>
              <Text style={styles.infoStrong}>contato@autolux.com.br</Text>
              <Text style={styles.infoText}>E-mail</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.icon}>🕐</Text>
            <View>
              <Text style={styles.infoStrong}>Seg – Sex: 8h às 20h</Text>
              <Text style={styles.infoText}>Sáb: 9h às 17h</Text>
            </View>
          </View>
        </View>

        <Text style={styles.secTitle}>Nossas Filiais</Text>
        <View style={styles.filialCard}>
          <Text style={styles.filialTitle}>📍 Brasília – Asa Norte</Text>
          <Text style={styles.filialText}>SGAN 915, Bloco D – Asa Norte, Brasília – DF</Text>
          <Text style={styles.filialSmall}>Seg-Sex: 8h–20h • Sáb: 9h–17h</Text>
        </View>
        <View style={styles.filialCard}>
          <Text style={styles.filialTitle}>📍 Goiânia – Setor Bueno</Text>
          <Text style={styles.filialText}>Rua 84, 250 – Setor Bueno, Goiânia – GO</Text>
          <Text style={styles.filialSmall}>Seg-Sex: 9h–18h • Sáb: 9h–13h</Text>
        </View>

        <Text style={styles.secTitle}>Perguntas Frequentes</Text>
        {faqs.map((faq, index) => (
          <View key={index} style={styles.faqItem}>
            <TouchableOpacity style={styles.faqQ} onPress={() => toggleFaq(index)}>
              <Text style={styles.faqQText}>{faq.q}</Text>
              <Text style={styles.arrow}>{openFaq === index ? '↑' : '↓'}</Text>
            </TouchableOpacity>
            {openFaq === index && <Text style={styles.faqA}>{faq.a}</Text>}
          </View>
        ))}

        <TouchableOpacity style={styles.btnWhatsapp} onPress={openWhatsApp}>
          <Text style={styles.btnWhatsappText}>📲 Falar no WhatsApp</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#080808' },
  pageHeader: { padding: 20, borderBottomWidth: 1, borderBottomColor: 'rgba(184,147,42,0.2)' },
  pageTitle: { fontSize: 28, fontWeight: '700', color: '#F0C040', marginBottom: 4 },
  pageSub: { color: '#555', fontSize: 13 },
  contatoWrap: { paddingHorizontal: 20, paddingBottom: 20 },
  infoCard: { backgroundColor: '#0f0f0f', borderWidth: 1, borderColor: 'rgba(184,147,42,0.2)', borderRadius: 12, padding: 20, marginBottom: 20 },
  cardTitle: { fontSize: 22, fontWeight: '700', color: '#F0C040', marginBottom: 14 },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.04)' },
  icon: { fontSize: 18, width: 28, textAlign: 'center' },
  infoStrong: { color: '#f5f5f0', fontWeight: '600', fontSize: 13 },
  infoText: { color: '#555', fontSize: 12 },
  secTitle: { fontSize: 18, color: '#F0C040', fontWeight: '700', marginVertical: 20, textTransform: 'uppercase', letterSpacing: 0.1 },
  filialCard: { backgroundColor: '#0f0f0f', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', borderRadius: 12, padding: 15, marginBottom: 10 },
  filialTitle: { color: '#F0C040', fontSize: 15, fontWeight: '600', marginBottom: 5 },
  filialText: { color: '#999', fontSize: 13, marginBottom: 3 },
  filialSmall: { color: '#555', fontSize: 11 },
  faqItem: { backgroundColor: '#0f0f0f', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', borderRadius: 10, marginBottom: 6, overflow: 'hidden' },
  faqQ: { padding: 13, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  faqQText: { fontSize: 13, fontWeight: '500', color: '#f5f5f0' },
  arrow: { color: '#B8932A', fontSize: 18 },
  faqA: { paddingHorizontal: 13, paddingBottom: 13, fontSize: 13, color: '#555', lineHeight: 18 },
  btnWhatsapp: { backgroundColor: 'rgba(22,110,22,0.8)', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  btnWhatsappText: { color: '#5de85d', fontSize: 16, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.1 },
});