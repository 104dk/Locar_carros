import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet, Alert } from 'react-native';
import BottomNav from '../components/BottomNav';

export default function ReservaScreen({ route, navigation }) {
  const { car } = route.params || {};
  const [step, setStep] = useState(1);
  const [selectedCar, setSelectedCar] = useState(car || null);
  const [retirada, setRetirada] = useState('');
  const [devolucao, setDevolucao] = useState('');
  const [local, setLocal] = useState('Brasília - Asa Norte');
  const [extras, setExtras] = useState({});
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [cnh, setCnh] = useState('');
  const [pagamento, setPagamento] = useState('');
  const [obs, setObs] = useState('');

  const cars = [
    { name: 'VW Polo', price: 89, category: 'Econômico' },
    { name: 'Toyota Corolla Cross', price: 189, category: 'SUV' },
    { name: 'Honda Civic', price: 235, category: 'Premium' },
    { name: 'BMW Série 3', price: 490, category: 'Luxo' },
  ];

  const calcTotal = () => {
    if (!selectedCar || !retirada || !devolucao) return 0;
    const dias = Math.max(1, Math.round((new Date(devolucao) - new Date(retirada)) / 86400000));
    const extrasTotal = Object.values(extras).reduce((a, b) => a + b, 0);
    return (selectedCar.price + extrasTotal) * dias;
  };

  const nextStep = () => {
    if (step === 1 && !selectedCar) {
      Alert.alert('Erro', 'Selecione um veículo');
      return;
    }
    if (step === 1 && (!retirada || !devolucao)) {
      Alert.alert('Erro', 'Selecione as datas');
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const confirm = () => {
    Alert.alert('Sucesso', 'Reserva confirmada! Entraremos em contato via WhatsApp.');
    navigation.goBack();
  };

  const toggleExtra = (key, val) => {
    setExtras(prev => ({ ...prev, [key]: prev[key] ? 0 : val }));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>Fazer Reserva</Text>
        <Text style={styles.pageSub}>Complete os dados em 3 etapas simples</Text>
      </View>

      <View style={styles.stepIndicator}>
        <Text style={[styles.step, step >= 1 && styles.stepActive, step > 1 && styles.stepDone]}>1. Veículo</Text>
        <Text style={[styles.step, step >= 2 && styles.stepActive, step > 2 && styles.stepDone]}>2. Dados</Text>
        <Text style={[styles.step, step >= 3 && styles.stepActive]}>3. Confirmar</Text>
      </View>

      {step === 1 && (
        <View style={styles.stepContent}>
          <Text style={styles.secTitle}>Escolha o Veículo</Text>
          {cars.map((c, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.carSelect, selectedCar?.name === c.name && styles.carSelectSelected]}
              onPress={() => setSelectedCar(c)}
            >
              <Text style={styles.carEm}>🚗</Text>
              <View style={styles.carDet}>
                <Text style={styles.carStrong}>{c.name}</Text>
                <Text style={styles.carSmall}>{c.category}</Text>
              </View>
              <Text style={styles.price}>R$ {c.price}/dia</Text>
            </TouchableOpacity>
          ))}

          <Text style={styles.secTitle}>Período</Text>
          <View style={styles.formRow}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Data de Retirada</Text>
              <TextInput style={styles.input} placeholder="DD/MM/YYYY" value={retirada} onChangeText={setRetirada} />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Data de Devolução</Text>
              <TextInput style={styles.input} placeholder="DD/MM/YYYY" value={devolucao} onChangeText={setDevolucao} />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Local de Retirada</Text>
            <TextInput style={styles.input} value={local} onChangeText={setLocal} />
          </View>

          <Text style={styles.secTitle}>Extras Opcionais</Text>
          <View style={styles.extras}>
            <TouchableOpacity style={[styles.extraItem, extras.gps && styles.extraOn]} onPress={() => toggleExtra('gps', 25)}>
              <View style={styles.extraInfo}>
                <Text style={styles.extraStrong}>🗺️ GPS</Text>
                <Text style={styles.extraSmall}>+ R$ 25/dia</Text>
              </View>
              <View style={[styles.extraToggle, extras.gps && styles.extraToggleOn]} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.extraItem, extras.cadeira && styles.extraOn]} onPress={() => toggleExtra('cadeira', 20)}>
              <View style={styles.extraInfo}>
                <Text style={styles.extraStrong}>👶 Cadeirinha Infantil</Text>
                <Text style={styles.extraSmall}>+ R$ 20/dia</Text>
              </View>
              <View style={[styles.extraToggle, extras.cadeira && styles.extraToggleOn]} />
            </TouchableOpacity>
          </View>

          <View style={styles.totalBox}>
            <Text>Veículo: {selectedCar?.name || '—'}</Text>
            <Text>Período: {retirada} → {devolucao}</Text>
            <Text>Extras: R$ {Object.values(extras).reduce((a, b) => a + b, 0)}</Text>
            <Text style={styles.totalLine}>TOTAL: R$ {calcTotal()}</Text>
          </View>

          <TouchableOpacity style={styles.btnNext} onPress={nextStep}>
            <Text style={styles.btnNextText}>Continuar → Dados Pessoais</Text>
          </TouchableOpacity>
        </View>
      )}

      {step === 2 && (
        <View style={styles.stepContent}>
          <Text style={styles.secTitle}>Seus Dados</Text>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Nome Completo</Text>
            <TextInput style={styles.input} value={nome} onChangeText={setNome} />
          </View>
          <View style={styles.formRow}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>CPF</Text>
              <TextInput style={styles.input} value={cpf} onChangeText={setCpf} />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>WhatsApp</Text>
              <TextInput style={styles.input} value={whatsapp} onChangeText={setWhatsapp} />
            </View>
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>E-mail</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} />
          </View>
          <View style={styles.formRow}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Número CNH</Text>
              <TextInput style={styles.input} value={cnh} onChangeText={setCnh} />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Validade CNH</Text>
              <TextInput style={styles.input} placeholder="DD/MM/YYYY" />
            </View>
          </View>

          <Text style={styles.secTitle}>Forma de Pagamento</Text>
          <View style={styles.payOpts}>
            <TouchableOpacity style={[styles.payOpt, pagamento === 'Pix' && styles.payOptSelected]} onPress={() => setPagamento('Pix')}>
              <Text>💠 Pix</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.payOpt, pagamento === 'Cartão' && styles.payOptSelected]} onPress={() => setPagamento('Cartão')}>
              <Text>💳 Cartão</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.payOpt, pagamento === 'Faturado' && styles.payOptSelected]} onPress={() => setPagamento('Faturado')}>
              <Text>🏢 Faturado PJ</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Observações</Text>
            <TextInput style={styles.textarea} multiline value={obs} onChangeText={setObs} />
          </View>

          <TouchableOpacity style={styles.btnNext} onPress={nextStep}>
            <Text style={styles.btnNextText}>Continuar → Confirmar Reserva</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnBack} onPress={prevStep}>
            <Text style={styles.btnBackText}>← Voltar</Text>
          </TouchableOpacity>
        </View>
      )}

      {step === 3 && (
        <View style={styles.stepContent}>
          <Text style={styles.secTitle}>Resumo da Reserva</Text>
          <View style={styles.summary}>
            <Text>Veículo: {selectedCar?.name}</Text>
            <Text>Período: {retirada} → {devolucao}</Text>
            <Text>Local: {local}</Text>
            <Text>Nome: {nome}</Text>
            <Text>Pagamento: {pagamento}</Text>
          </View>
          <View style={styles.totalBox}>
            <Text style={styles.totalLine}>TOTAL A PAGAR: R$ {calcTotal()}</Text>
          </View>
          <TouchableOpacity style={styles.btnConfirm} onPress={confirm}>
            <Text style={styles.btnConfirmText}>📲 Confirmar via WhatsApp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnBack} onPress={prevStep}>
            <Text style={styles.btnBackText}>← Voltar</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
    <BottomNav navigation={navigation} active="Reserva" />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#080808' },
  pageHeader: { padding: 20, borderBottomWidth: 1, borderBottomColor: 'rgba(184,147,42,0.2)' },
  pageTitle: { fontSize: 28, fontWeight: '700', color: '#F0C040', marginBottom: 4 },
  pageSub: { color: '#555', fontSize: 13 },
  stepIndicator: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 20 },
  step: { flex: 1, textAlign: 'center', paddingVertical: 10, fontSize: 10, fontWeight: '700', textTransform: 'uppercase', color: '#555', borderBottomWidth: 2, borderBottomColor: '#1e1e1e' },
  stepActive: { color: '#F0C040', borderBottomColor: '#B8932A' },
  stepDone: { color: '#D4A93C', borderBottomColor: '#D4A93C' },
  stepContent: { paddingHorizontal: 20, paddingBottom: 20 },
  secTitle: { fontSize: 16, color: '#F0C040', fontWeight: '700', marginVertical: 15, textTransform: 'uppercase', letterSpacing: 0.1 },
  carSelect: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#0f0f0f', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', borderRadius: 10, padding: 10, marginBottom: 8 },
  carSelectSelected: { borderColor: '#B8932A', backgroundColor: 'rgba(240,192,64,0.05)' },
  carEm: { fontSize: 32 },
  carDet: { flex: 1 },
  carStrong: { fontSize: 15, color: '#f5f5f0', fontWeight: '600' },
  carSmall: { color: '#555', fontSize: 12 },
  price: { color: '#F0C040', fontSize: 14, fontWeight: '700' },
  formRow: { flexDirection: 'row', gap: 10 },
  formGroup: { flex: 1, marginBottom: 15 },
  label: { fontSize: 10, color: '#F0C040', textTransform: 'uppercase', letterSpacing: 0.15, marginBottom: 6, fontWeight: '700' },
  input: { backgroundColor: '#0f0f0f', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', color: '#f5f5f0', padding: 11, borderRadius: 8, fontSize: 14 },
  textarea: { height: 80, textAlignVertical: 'top' },
  extras: { marginBottom: 20 },
  extraItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#0f0f0f', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', borderRadius: 10, padding: 10, marginBottom: 8 },
  extraOn: { borderColor: 'rgba(240,192,64,0.3)', backgroundColor: 'rgba(240,192,64,0.05)' },
  extraInfo: { flex: 1 },
  extraStrong: { fontSize: 14, color: '#f5f5f0', fontWeight: '500' },
  extraSmall: { color: '#555', fontSize: 12 },
  extraToggle: { width: 38, height: 22, backgroundColor: '#1e1e1e', borderRadius: 11, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  extraToggleOn: { backgroundColor: '#B8932A' },
  totalBox: { backgroundColor: 'rgba(240,192,64,0.05)', borderWidth: 1, borderColor: 'rgba(240,192,64,0.3)', borderRadius: 10, padding: 15, marginVertical: 15 },
  totalLine: { fontSize: 18, color: '#F0C040', fontWeight: '700', textAlign: 'center', marginTop: 10 },
  btnNext: { backgroundColor: '#B8932A', padding: 14, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  btnNextText: { color: '#080808', fontSize: 14, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.12 },
  btnBack: { backgroundColor: 'transparent', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', padding: 12, borderRadius: 10, alignItems: 'center', marginTop: 8 },
  btnBackText: { color: '#555', fontSize: 13 },
  payOpts: { flexDirection: 'row', gap: 8, marginBottom: 15 },
  payOpt: { flex: 1, padding: 12, backgroundColor: '#0f0f0f', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', borderRadius: 10, alignItems: 'center' },
  payOptSelected: { borderColor: '#B8932A', backgroundColor: 'rgba(240,192,64,0.05)' },
  summary: { marginBottom: 15 },
  btnConfirm: { backgroundColor: 'rgba(22,110,22,0.8)', padding: 14, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  btnConfirmText: { color: '#5de85d', fontSize: 14, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.1 },
});