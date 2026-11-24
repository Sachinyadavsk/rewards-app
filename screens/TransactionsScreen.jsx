import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BackHeader from '../components/BackHeader';
import { demoUser, transactions } from '../data/demoData';

export default function TransactionsScreen() {
  const [filter, setFilter] = useState('All');
  const shown = filter === 'All' ? transactions : transactions.filter((item) => item.type === filter);
  return (
    <View style={styles.page}>
      <BackHeader
        title="Transactions"
        subtitle="View your transaction history"
      />
      <View style={styles.summary}>
        <View>
          <Text style={styles.green}>✹ {demoUser.earned} pts</Text>
          <Text style={styles.caption}>Total Earned</Text>
        </View>
        <View>
          <Text style={styles.red}>● {demoUser.redeemed} pts</Text>
          <Text style={styles.caption}>Total Redeemed</Text>
        </View>
      </View>
      <View style={styles.filters}>
        {['All', 'Earned', 'Redeemed'].map((name) => (
          <TouchableOpacity key={name} onPress={() => setFilter(name)} style={[styles.filter, filter === name && styles.selected]}>
            <Text style={[styles.filterText, filter === name && styles.selectedText]}>{name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {shown.map((item, index) => (
          <View key={`${item.title}-${index}`} style={styles.row}>
            <View style={[styles.icon, item.type === 'Redeemed' && styles.redeemIcon]}>
              <Text style={{ color: item.type === 'Redeemed' ? '#F16B83' : '#20C6A1' }}>{item.icon}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>
            <Text style={[styles.amount, item.type === 'Redeemed' && styles.negative]}>{item.amount}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#F4F4FA', marginTop: 45 },
  summary: { backgroundColor: '#FFFFFF', padding: 16, flexDirection: 'row', justifyContent: 'space-around' },
  green: { color: '#1DC49B', fontSize: 14, fontWeight: '900' },
  red: { color: '#F16B83', fontSize: 14, fontWeight: '900' },
  caption: { color: '#9A97AA', fontSize: 10, textAlign: 'center', marginTop: 4 },
  filters: { flexDirection: 'row', padding: 12, backgroundColor: '#FFFFFF', borderTopWidth: 1, borderColor: '#F0EFF5' },
  filter: { paddingVertical: 8, paddingHorizontal: 15, borderRadius: 9, marginRight: 7, backgroundColor: '#F5F4FA' },
  selected: { backgroundColor: '#7159E8' },
  filterText: { color: '#77748D', fontSize: 11, fontWeight: '700' },
  selectedText: { color: '#FFFFFF' },
  list: { padding: 12 },
  row: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 12, padding: 12, marginBottom: 8 },
  icon: { width: 36, height: 36, borderRadius: 10, backgroundColor: '#E2F9F3', alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  redeemIcon: { backgroundColor: '#FDEBF0' },
  title: { color: '#302D49', fontSize: 11, fontWeight: '800' },
  date: { color: '#9B98AA', fontSize: 9, marginTop: 4 },
  amount: { color: '#1DC49B', fontSize: 11, fontWeight: '800' },
  negative: { color: '#F16B83' },
});
