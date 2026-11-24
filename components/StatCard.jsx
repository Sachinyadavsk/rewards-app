import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function StatCard({ icon, value, label, color }) {
  return (
    <View style={styles.card}>
      <View style={[styles.icon, { backgroundColor: color || '#F0ECFF' }]}><Text>{icon}</Text></View>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, backgroundColor: '#FFFFFF', borderRadius: 14, padding: 12, minHeight: 82, marginRight: 8 },
  icon: { width: 27, height: 27, borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginBottom: 7 },
  value: { color: '#1DC49B', fontWeight: '800', fontSize: 13 },
  label: { color: '#9290A5', fontSize: 9, marginTop: 2 },
});
