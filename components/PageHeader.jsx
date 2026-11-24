import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PageHeader({ title, subtitle }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{title}</Text>
      {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: 20, paddingTop: 14, paddingBottom: 14, backgroundColor: '#FFFFFF' },
  title: { color: '#17152E', fontSize: 19, fontWeight: '800' },
  subtitle: { color: '#85839A', fontSize: 12, marginTop: 4 },
});
