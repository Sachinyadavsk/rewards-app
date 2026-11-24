import { useRouter } from 'expo-router';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PageHeader from '../components/PageHeader';
import { demoUser } from '../data/demoData';

const supportItems = [
  ['ⓘ', 'Help & FAQ', 'Answers to common questions'],
  ['♫', 'Contact Support', 'Get help from our team'],
  ['⚑', 'Report an Issue', 'Tell us what went wrong'],
];

const ItemsLink = [
  ['ⓘ', 'Redeem', 'Redeem Screen', '/redeem'],
  ['♫', 'Refer', 'Refer Screen', '/refer'],
  ['⚑', 'Transactions', 'Transactions Screen', '/transactions'],
];

const appItems = [['▤', 'Privacy Policy'], ['▣', 'Terms of Service']];

export default function ProfileScreen() {
  const router = useRouter();
  const navigateTo = (route) => {
    router.push(route);
  };
  const openItem = (title) => Alert.alert(title, 'Demo screen — connect your own page or URL here.');
  return (
    <ScrollView style={styles.page} showsVerticalScrollIndicator={false}>
      <PageHeader title="Profile" subtitle="Manage your account" />
      <View style={styles.profile}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>U</Text>
          <View style={styles.online} /></View>
        <View>
          <Text style={styles.name}>{demoUser.name}</Text>
          <Text style={styles.handle}>{demoUser.handle}</Text>
          <Text style={styles.mask}>xxxx xxxx xxxx</Text>
        </View>
      </View>
      <View style={styles.stats}>
        {[
          ['✹', demoUser.balance, 'Balance', '#E9AC00'],
          ['✦', demoUser.earned, 'Earned', '#20B991'],
          ['▣', demoUser.redeemed, 'Redeemed', '#F16B83'],
          ['♧', demoUser.referrals, 'Referrals', '#7159E8'],
        ].map(([icon, value, label, color]) => (
          <View style={styles.stat} key={label}>
            <Text style={{ color, fontSize: 16 }}>{icon}</Text>
            <Text style={[styles.statValue, { color }]}>{value}</Text>
            <Text style={styles.statLabel}>{label}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.section}>Quick Links</Text>

<View style={styles.group}>
  {ItemsLink.map(([icon, title, desc, route]) => (
    <TouchableOpacity
      key={title}
      style={styles.item}
      onPress={() => router.push(route)}
      activeOpacity={0.7}
    >
      <View style={styles.itemIcon}>
        <Text style={{ color: '#7159E8' }}>{icon}</Text>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.itemTitle}>{title}</Text>
        <Text style={styles.itemDesc}>{desc}</Text>
      </View>

      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  ))}
</View>
      <Text style={styles.section}>Support</Text>
      <View style={styles.group}>
        {supportItems.map(([icon, title, desc]) => (
          <TouchableOpacity key={title} style={styles.item} onPress={() => openItem(title)}>
            <View style={styles.itemIcon}>
              <Text style={{ color: '#7159E8' }}>{icon}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.itemTitle}>{title}</Text>
              <Text style={styles.itemDesc}>{desc}</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.section}>App</Text>
      <View style={[styles.group, { marginBottom: 20 }]}>
        {appItems.map(([icon, title]) => (
          <TouchableOpacity key={title} style={styles.item} onPress={() => openItem(title)}>
            <View style={styles.itemIcon}>
              <Text style={{ color: '#88859B' }}>{icon}</Text>
            </View>
            <Text style={[styles.itemTitle, { flex: 1 }]}>{title}</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#F4F4FA', marginTop: 45 },
  profile: { margin: 14, backgroundColor: '#7958D7', borderRadius: 15, padding: 16, flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 45, height: 45, borderRadius: 13, backgroundColor: '#A99AEF', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  avatarText: { color: '#FFFFFF', fontSize: 21, fontWeight: '900' },
  online: { position: 'absolute', width: 10, height: 10, borderRadius: 5, backgroundColor: '#20D4A5', right: -2, bottom: -1, borderWidth: 1, borderColor: '#FFFFFF' },
  name: { color: '#FFFFFF', fontSize: 14, fontWeight: '900' },
  handle: { color: '#E2DAFF', fontSize: 10, marginTop: 3 },
  mask: { color: '#D3C8FF', fontSize: 9, marginTop: 4 },
  stats: { flexDirection: 'row', backgroundColor: '#FFFFFF', marginHorizontal: 14, borderRadius: 13, paddingVertical: 15 },
  stat: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 11, fontWeight: '900', marginTop: 5 },
  statLabel: { color: '#9290A5', fontSize: 9, marginTop: 3 },
  section: { color: '#77748D', fontSize: 11, fontWeight: '800', marginHorizontal: 17, marginTop: 20, marginBottom: 9 },
  group: { marginHorizontal: 14, backgroundColor: '#FFFFFF', borderRadius: 13, paddingHorizontal: 12 },
  item: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F1F0F6' },
  itemIcon: { width: 30, height: 30, borderRadius: 9, backgroundColor: '#F0EDFF', alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  itemTitle: { color: '#302D49', fontSize: 11, fontWeight: '800' },
  itemDesc: { color: '#9A97AA', fontSize: 9, marginTop: 3 },
  arrow: { color: '#B2AFC0', fontSize: 22, marginLeft: 8 },
});
