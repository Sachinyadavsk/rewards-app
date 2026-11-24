import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { demoUser, offers } from '../data/demoData';

import { Ionicons } from "@expo/vector-icons";

const actions = [
  {
    icon: "gift-outline",
    label: "Leads",
    color: "#FCE5F1",
    route: "/leads",
    iconColor: "#DB2777",
  },
  {
    icon: "people-outline",
    label: "Refer & Earn",
    color: "#FFF2D9",
    route: "/refer",
    iconColor: "#D97706",
  },
  {
    icon: "receipt-outline",
    label: "Transactions",
    color: "#EAE6FF",
    route: "/transactions",
    iconColor: "#7C3AED",
  },
  {
    icon: "wallet-outline",
    label: "Payments",
    color: "#DDF4FF",
    route: "/payments",
    iconColor: "#0284C7",
  },
  {
    icon: "cash-outline",
    label: "Redeem",
    color: "#DCFCE7",
    route: "/redeem",
    iconColor: "#16A34A",
  },
  {
    icon: "settings-outline",
    label: "Settings",
    color: "#FFE8DD",
    route: "/settings",
    iconColor: "#EA580C",
  },
  {
    icon: "wallet-outline",
    label: "Withdraw",
    color: "#FFE8DD",
    route: "/withdraw",
    iconColor: "#EA580C",
  },
  
];

export default function HomeScreen() {
  const router = useRouter();
  return (
    <ScrollView style={styles.page} showsVerticalScrollIndicator={false}>
      <View style={styles.hero}>
        <Text style={styles.hello}>Hey, Demo 👋</Text>
        <Text style={styles.heading}>Start Earning Today</Text>
        <Text style={styles.muted}>Your Balance</Text>
        <View style={styles.balanceRow}>
          <Text style={styles.coin}>✹</Text>
          <Text style={styles.balance}>{demoUser.balance}</Text>
          <Text style={styles.pts}>pts</Text>
          <TouchableOpacity style={styles.redeem} onPress={() => router.push("/redeem")}>
            <Text style={styles.redeemText}>▣ Redeem</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Redeem */}
      <View style={styles.body}>
        <Text style={styles.section}>Quick Actions</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.actions}
        >
          {actions.map((item) => (
            <TouchableOpacity
              key={item.label}
              style={styles.action}
              onPress={() => router.push(item.route)}
              activeOpacity={0.75}
            >
              <View
                style={[
                  styles.actionIcon,
                  { backgroundColor: item.color },
                ]}
              >
                <Ionicons
                  name={item.icon}
                  size={25}
                  color={item.iconColor}
                />
              </View>

              <Text style={styles.actionLabel}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        {/* Quick Actions */}

        <Text style={styles.section}>Earn points</Text>
        {offers.map((offer) => (
          <View key={offer.name} style={styles.offer}>
            <View style={styles.offerIcon}><Text style={{ fontSize: 22 }}>{offer.icon}</Text></View>
            <View style={{ flex: 1 }}>
              <Text style={styles.offerName}>{offer.name}</Text>
              <Text style={styles.offerDesc}>{offer.description}</Text>
            </View>
            <TouchableOpacity style={styles.earn}><Text style={styles.earnText}>{offer.points}</Text></TouchableOpacity>
          </View>
        ))}
        {/* Earn points */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#F4F4FA' },
  hero: { paddingHorizontal: 20, paddingTop: 49, paddingBottom: 25, backgroundColor: '#6854E8', borderBottomLeftRadius: 22, borderBottomRightRadius: 22 },
  hello: { color: '#E5DFFF', fontSize: 12 },
  heading: { color: '#FFFFFF', fontSize: 21, fontWeight: '800', marginTop: 4, marginBottom: 20 },
  muted: { color: '#D8D1FF', fontSize: 11 },
  balanceRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  coin: { color: '#FFD23F', fontSize: 21, marginRight: 5 },
  balance: { color: '#FFFFFF', fontSize: 30, fontWeight: '900' },
  pts: { color: '#E3DDFF', fontSize: 12, marginLeft: 5, marginTop: 9 },
  redeem: { marginLeft: 'auto', backgroundColor: '#FFB900', borderRadius: 9, paddingHorizontal: 13, paddingVertical: 9 },
  redeemText: { color: '#FFFFFF', fontSize: 11, fontWeight: '800' },
  body: { paddingLeft: 14 },
  section: { color: '#24213D', fontSize: 15, fontWeight: '800', marginTop: 20, marginBottom: 12 },
  actions: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 2,
    gap: 16,
  },

  action: {
    width: 75,
    alignItems: 'center',
    justifyContent: 'center',
  },

  actionIcon: {
    width: 60,
    height: 60,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },

  actionEmoji: {
    fontSize: 27,
  },

  actionLabel: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  offer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 13, padding: 11, marginBottom: 9 },
  offerIcon: { width: 42, height: 42, borderRadius: 11, backgroundColor: '#F4F2FF', alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  offerName: { color: '#27243F', fontWeight: '800', fontSize: 12 },
  offerDesc: { color: '#9996AA', fontSize: 10, marginTop: 3 },
  earn: { backgroundColor: '#FFBF00', paddingHorizontal: 13, paddingVertical: 7, borderRadius: 8 },
  earnText: { color: '#FFFFFF', fontSize: 10, fontWeight: '800' },
});
