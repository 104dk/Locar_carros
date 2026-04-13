import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Switch, Alert, Share } from 'react-native';
import { useAppContext } from '../AppContext';

export default function DevSettings({ navigation }) {
  const { config, updateConfig } = useAppContext();
  const [tempConfig, setTempConfig] = useState(config);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setTempConfig(config);
  }, [config]);

  const validateHexColor = (color) => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);

  const handleSave = () => {
    const newErrors = {};
    // Validar cores
    Object.keys(tempConfig.theme).forEach(key => {
      if (!validateHexColor(tempConfig.theme[key])) {
        newErrors[key] = 'Cor inválida (use formato #RRGGBB)';
      }
    });
    // Validar textos obrigatórios
    if (!tempConfig.texts.appName.trim()) newErrors.appName = 'Nome do app é obrigatório';
    if (!tempConfig.texts.heroTitle.trim()) newErrors.heroTitle = 'Título do hero é obrigatório';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      Alert.alert('Erros de Validação', 'Corrija os campos destacados.');
      return;
    }

    updateConfig('theme', tempConfig.theme);
    updateConfig('texts', tempConfig.texts);
    updateConfig('features', tempConfig.features);
    updateConfig('language', tempConfig.language);
    updateConfig('currency', tempConfig.currency);
    setErrors({});
    Alert.alert('Sucesso', 'Configurações salvas com sucesso!');
  };

  const handleReset = () => {
    Alert.alert(
      'Resetar Configurações',
      'Isso restaurará todas as configurações para os padrões. Continuar?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Resetar', onPress: () => {
          const defaultConfig = require('../config').config;
          setTempConfig(defaultConfig);
          updateConfig('theme', defaultConfig.theme);
          updateConfig('texts', defaultConfig.texts);
          updateConfig('features', defaultConfig.features);
          updateConfig('language', defaultConfig.language);
          updateConfig('currency', defaultConfig.currency);
          Alert.alert('Resetado', 'Configurações restauradas.');
        }},
      ]
    );
  };

  const handleExport = async () => {
    try {
      await Share.share({
        message: JSON.stringify(tempConfig, null, 2),
        title: 'Configurações do App',
      });
    } catch (error) {
      Alert.alert('Erro', 'Falha ao exportar configurações.');
    }
  };

  const handleImport = () => {
    Alert.alert('Importar', 'Funcionalidade em desenvolvimento. Use colar manualmente por enquanto.');
  };

  const updateTheme = (key, value) => {
    setTempConfig({ ...tempConfig, theme: { ...tempConfig.theme, [key]: value } });
    if (errors[key]) setErrors({ ...errors, [key]: null });
  };

  const updateTexts = (key, value) => {
    setTempConfig({ ...tempConfig, texts: { ...tempConfig.texts, [key]: value } });
    if (errors[key]) setErrors({ ...errors, [key]: null });
  };

  const updateFeatures = (key, value) => {
    setTempConfig({ ...tempConfig, features: { ...tempConfig.features, [key]: value } });
  };

  const generateRandomColor = () => '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');

  const handleRandomTheme = () => {
    const newTheme = {
      primaryColor: generateRandomColor(),
      secondaryColor: generateRandomColor(),
      backgroundColor: generateRandomColor(),
      textColor: generateRandomColor(),
      accentColor: generateRandomColor(),
    };
    setTempConfig({ ...tempConfig, theme: newTheme });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Configurações Dev</Text>

      {/* Preview */}
      <View style={styles.preview}>
        <Text style={[styles.previewTitle, { color: tempConfig.theme.primaryColor }]}>{tempConfig.texts.appName}</Text>
        <Text style={[styles.previewSub, { color: tempConfig.theme.textColor }]}>{tempConfig.texts.heroTitle}</Text>
        <View style={[styles.previewBtn, { backgroundColor: tempConfig.theme.secondaryColor }]}>
          <Text style={styles.previewBtnText}>Botão Exemplo</Text>
        </View>
      </View>

      {/* Tema */}
      <Text style={styles.sectionTitle}>🎨 Tema</Text>
      <TouchableOpacity style={styles.randomBtn} onPress={handleRandomTheme}>
        <Text style={styles.randomBtnText}>🎲 Gerar Tema Aleatório</Text>
      </TouchableOpacity>
      {Object.keys(tempConfig.theme).map(key => (
        <View key={key}>
          <TextInput
            style={[styles.input, errors[key] && styles.inputError]}
            placeholder={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
            value={tempConfig.theme[key]}
            onChangeText={(value) => updateTheme(key, value)}
          />
          {errors[key] && <Text style={styles.errorText}>{errors[key]}</Text>}
        </View>
      ))}

      {/* Textos */}
      <Text style={styles.sectionTitle}>📝 Textos</Text>
      {Object.keys(tempConfig.texts).filter(k => typeof tempConfig.texts[k] === 'string').map(key => (
        <View key={key}>
          <TextInput
            style={[styles.input, errors[key] && styles.inputError]}
            placeholder={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
            value={tempConfig.texts[key]}
            onChangeText={(value) => updateTexts(key, value)}
            multiline={key.includes('Sub') || key.includes('Title')}
          />
          {errors[key] && <Text style={styles.errorText}>{errors[key]}</Text>}
        </View>
      ))}

      {/* Funcionalidades */}
      <Text style={styles.sectionTitle}>⚙️ Funcionalidades</Text>
      {Object.keys(tempConfig.features).map(key => (
        <View key={key} style={styles.switchRow}>
          <Text style={styles.switchLabel}>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</Text>
          <Switch
            value={tempConfig.features[key]}
            onValueChange={(value) => updateFeatures(key, value)}
            trackColor={{ false: '#767577', true: tempConfig.theme.primaryColor }}
            thumbColor={tempConfig.features[key] ? tempConfig.theme.secondaryColor : '#f4f3f4'}
          />
        </View>
      ))}

      {/* Geral */}
      <Text style={styles.sectionTitle}>🌍 Geral</Text>
      <TextInput
        style={styles.input}
        placeholder="Idioma"
        value={tempConfig.language}
        onChangeText={(value) => updateGeneral('language', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Moeda"
        value={tempConfig.currency}
        onChangeText={(value) => updateGeneral('currency', value)}
      />

      {/* Ações */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveBtnText}>💾 Salvar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
          <Text style={styles.resetBtnText}>🔄 Resetar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.exportBtn} onPress={handleExport}>
          <Text style={styles.exportBtnText}>📤 Exportar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.importBtn} onPress={handleImport}>
          <Text style={styles.importBtnText}>📥 Importar</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.backBtnText}>← Voltar ao Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  preview: { backgroundColor: '#fff', padding: 20, borderRadius: 10, marginBottom: 20, elevation: 2 },
  previewTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  previewSub: { fontSize: 14, marginBottom: 10 },
  previewBtn: { padding: 10, borderRadius: 5, alignSelf: 'flex-start' },
  previewBtnText: { color: '#fff', fontWeight: 'bold' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
  input: { backgroundColor: '#fff', padding: 10, borderRadius: 5, marginBottom: 10, borderWidth: 1, borderColor: '#ccc' },
  inputError: { borderColor: '#dc3545' },
  errorText: { color: '#dc3545', fontSize: 12, marginBottom: 10 },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 },
  switchLabel: { fontSize: 16 },
  actions: { marginTop: 20 },
  saveBtn: { backgroundColor: '#28a745', padding: 15, borderRadius: 5, alignItems: 'center', marginBottom: 10 },
  saveBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  resetBtn: { backgroundColor: '#ffc107', padding: 15, borderRadius: 5, alignItems: 'center', marginBottom: 10 },
  resetBtnText: { color: '#000', fontSize: 16, fontWeight: 'bold' },
  exportBtn: { backgroundColor: '#17a2b8', padding: 15, borderRadius: 5, alignItems: 'center', marginBottom: 10 },
  exportBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  importBtn: { backgroundColor: '#6c757d', padding: 15, borderRadius: 5, alignItems: 'center', marginBottom: 10 },
  importBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  randomBtn: { backgroundColor: '#6f42c1', padding: 10, borderRadius: 5, alignItems: 'center', marginBottom: 10 },
  randomBtnText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
});