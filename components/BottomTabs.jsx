import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const tabs = [
  { label: 'Home', icon: '⌂' },
  { label: 'Redeem', icon: '▣' },
  { label: 'Transactions', icon: '◷' },
  { label: 'Refer & Earn', icon: '♧' },
  { label: 'Profile', icon: '●' },
];

export default function BottomTabs({ activeTab, onChange }) {
  return (
    <View style={styles.bar}>
      {tabs.map((tab) => {
        const active = activeTab === tab.label;
        return (
          <TouchableOpacity key={tab.label} style={styles.item} onPress={() => onChange(tab.label)} activeOpacity={0.75}>
            <View style={[styles.iconWrap, active && styles.activeIcon]}>
              <Text style={[styles.icon, active && styles.activeText]}>{tab.icon}</Text>
            </View>
            <Text numberOfLines={1} style={[styles.label, active && styles.activeText]}>{tab.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: { flexDirection: 'row', backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#ECEBF4', paddingTop: 8, paddingBottom: 8, paddingHorizontal: 4 },
  item: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  iconWrap: { width: 34, height: 28, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  activeIcon: { backgroundColor: '#EEE9FF' },
  icon: { fontSize: 20, color: '#9693AD', fontWeight: '700' },
  label: { fontSize: 9, color: '#9693AD', marginTop: 3, fontWeight: '600' },
  activeText: { color: '#7159E8' },
});
