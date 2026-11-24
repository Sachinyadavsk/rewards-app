import * as Clipboard from 'expo-clipboard';
import { Alert, ScrollView, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BackHeader from '../components/BackHeader';
import { demoUser } from '../data/demoData';


export default function ReferScreen() {
  const copyCode = async () => {
    await Clipboard.setStringAsync(demoUser.referralCode);
    Alert.alert('Copied', 'Your referral code has been copied.');
  };
  const shareCode = async () => {
    await Share.share({ message: `Join me and earn rewards! Use my referral code: ${demoUser.referralCode}` });
  };
  return (
    <ScrollView style={styles.page} showsVerticalScrollIndicator={false}>
      <BackHeader
        title="Redeem"
        subtitle="Redeem your earned points"
      />
      <View style={styles.banner}>
        <Text style={styles.people}>👥</Text>
        <Text style={styles.bannerTitle}>Invite Friends, Earn Together!</Text>
        <Text style={styles.bannerText}>Earn 100 pts for every friend who joins using your code. Your friend will get 100 pts as well!</Text>
      </View>
      <View style={styles.codeCard}>
        <Text style={styles.label}>Your Referral Code</Text>
        <View style={styles.codeBox}>
          <Text style={styles.code}>{demoUser.referralCode}</Text>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.copy} onPress={copyCode}>
            <Text style={styles.copyText}>▢  Copy Code</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.share} onPress={shareCode}>
            <Text style={styles.shareText}>↗  Share Link</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.stats}>
        <View>
          <Text style={styles.statNumber}>{demoUser.referrals}</Text>
          <Text style={styles.statLabel}>Friends Invited</Text>
        </View>
        <View style={styles.vertical} />
        <View>
          <Text style={styles.statPoints}>✹ 10000 pts</Text>
          <Text style={styles.statLabel}>Total Earned</Text>
        </View>
      </View>
      <View style={styles.how}>
        <Text style={styles.howTitle}>How It Works</Text>
        {[
          ['1', 'Share your code', 'Send your unique code to friends'],
          ['2', 'Friend signs up', 'They register using your code'],
          ['3', 'Earn rewards', 'You both receive bonus points'],
        ].map(([number, title, detail]) => (
          <View style={styles.step} key={number}>
            <View style={styles.number}>
              <Text style={styles.numberText}>{number}</Text>
            </View>
            <View>
              <Text style={styles.stepTitle}>{title}</Text>
              <Text style={styles.stepDetail}>{detail}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#F4F4FA', marginTop: 45 },
  banner: { margin: 14, backgroundColor: '#20B991', borderRadius: 16, padding: 20, alignItems: 'center', elevation: 3 },
  people: { fontSize: 30, marginBottom: 12 },
  bannerTitle: { color: '#FFFFFF', fontSize: 16, fontWeight: '900' },
  bannerText: { color: '#DDFBF2', fontSize: 10, textAlign: 'center', lineHeight: 16, marginTop: 8 },
  codeCard: { backgroundColor: '#FFFFFF', borderRadius: 14, marginHorizontal: 14, padding: 16, alignItems: 'center' },
  label: { color: '#77748D', fontSize: 11, fontWeight: '700' },
  codeBox: { width: '100%', backgroundColor: '#F0EDFF', borderWidth: 1, borderColor: '#DED8FF', borderRadius: 10, padding: 14, marginTop: 12, alignItems: 'center' },
  code: { color: '#7159E8', fontSize: 22, letterSpacing: 3, fontWeight: '900' },
  buttons: { flexDirection: 'row', marginTop: 12, width: '100%' },
  copy: { flex: 1, borderWidth: 1, borderColor: '#7159E8', borderRadius: 9, padding: 11, alignItems: 'center', marginRight: 8 },
  copyText: { color: '#7159E8', fontSize: 11, fontWeight: '800' },
  share: { flex: 1, backgroundColor: '#7159E8', borderRadius: 9, padding: 11, alignItems: 'center' },
  shareText: { color: '#FFFFFF', fontSize: 11, fontWeight: '800' },
  stats: { margin: 14, padding: 17, backgroundColor: '#FFFFFF', borderRadius: 14, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  statNumber: { color: '#7159E8', fontSize: 20, fontWeight: '900', textAlign: 'center' },
  statPoints: { color: '#E9AC00', fontSize: 14, fontWeight: '900' },
  statLabel: { color: '#9290A5', fontSize: 10, marginTop: 4, textAlign: 'center' },
  vertical: { height: 35, width: 1, backgroundColor: '#EEEAF7' },
  how: { backgroundColor: '#FFFFFF', marginHorizontal: 14, marginBottom: 18, borderRadius: 14, padding: 16 },
  howTitle: { color: '#282541', fontSize: 14, fontWeight: '900', marginBottom: 14 },
  step: { flexDirection: 'row', alignItems: 'center', marginBottom: 13 },
  number: { width: 27, height: 27, borderRadius: 14, backgroundColor: '#7159E8', alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  numberText: { color: '#FFFFFF', fontSize: 12, fontWeight: '900' },
  stepTitle: { color: '#302D49', fontSize: 11, fontWeight: '800' },
  stepDetail: { color: '#9693A7', fontSize: 9, marginTop: 3 },
});
