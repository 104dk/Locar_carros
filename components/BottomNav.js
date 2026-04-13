import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function BottomNav({ navigation, active }) {
  const navItems = [
    { key: 'Home', icon: '🏠', label: 'Início' },
    { key: 'Frota', icon: '🚗', label: 'Frota' },
    { key: 'Reserva', icon: '📅', label: 'Reserva' },
    { key: 'Contato', icon: '📞', label: 'Contato' },
  ];

  return (
    <View style={styles.bottomNav}>
      {navItems.map(item => (
        <TouchableOpacity
          key={item.key}
          style={[styles.navBtn, active === item.key && styles.navBtnActive]}
          onPress={() => navigation.navigate(item.key)}
        >
          <Text style={[styles.navIcon, active === item.key && styles.navIconActive]}>{item.icon}</Text>
          <Text style={[styles.navLabel, active === item.key && styles.navLabelActive]}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(8,8,8,0.96)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(184,147,42,0.2)',
    flexDirection: 'row',
    paddingBottom: 8,
  },
  navBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    gap: 4,
  },
  navBtnActive: {},
  navIcon: { fontSize: 20, color: '#555' },
  navIconActive: { color: '#F0C040' },
  navLabel: { fontSize: 10, color: '#555', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.1 },
  navLabelActive: { color: '#F0C040' },
});