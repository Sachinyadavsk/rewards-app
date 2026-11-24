import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BackHeader from '../components/BackHeader';
import { demoUser, rewards } from '../data/demoData';

export default function RedeemScreen() {
  return (
    <View style={styles.page}>
      <BackHeader
        title="My Rewards"
        subtitle="Manage your rewards"
      />
      <View style={styles.balance}>
        <Text style={styles.coin}>✹</Text>
        <View><Text style={styles.small}>Available Balance</Text><Text style={styles.amount}>{demoUser.balance} pts</Text></View>
      </View>
      <ScrollView contentContainerStyle={styles.grid} showsVerticalScrollIndicator={false}>
        {rewards.map((item) => (
          <TouchableOpacity key={item.name} style={styles.card} activeOpacity={0.85}>
            <View style={[styles.rewardIcon, { backgroundColor: item.color }]}><Text style={styles.emoji}>{item.icon}</Text></View>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
            <Text style={styles.cost}>✹ {item.cost}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#F4F4FA', marginTop: 48 },
  balance: { backgroundColor: '#6854E8', flexDirection: 'row', alignItems: 'center', padding: 16 },
  coin: { color: '#FFD23F', fontSize: 23, marginRight: 10 },
  small: { color: '#DCD5FF', fontSize: 10 },
  amount: { color: '#FFFFFF', fontSize: 18, fontWeight: '900', marginTop: 2 },
  grid: { padding: 13, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: { width: '48.5%', backgroundColor: '#FFFFFF', borderRadius: 14, padding: 12, marginBottom: 12, borderWidth: 1, borderColor: '#E8E5F8', minHeight: 155 },
  rewardIcon: { width: 42, height: 42, borderRadius: 11, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  emoji: { fontSize: 24, fontWeight: '900', color: '#FFFFFF' },
  name: { color: '#282541', fontSize: 12, fontWeight: '800' },
  subtitle: { color: '#7461D8', fontSize: 10, marginTop: 4 },
  cost: { color: '#DDA900', fontSize: 10, fontWeight: '800', marginTop: 'auto', paddingTop: 15 },
});
