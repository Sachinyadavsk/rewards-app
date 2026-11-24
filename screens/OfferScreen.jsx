import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BackHeader from '../components/BackHeader';
import { offers } from '../data/demoData';

export default function OfferScreen() {
    return (
        <ScrollView style={styles.page} showsVerticalScrollIndicator={false}>
            <BackHeader
                title="Offers"
                subtitle="View your Offers List"
            />
            <View style={styles.body}>
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
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    page: { flex: 1, backgroundColor: '#F4F4FA', marginTop:45 },
    body: { padding: 14 },
    stats: { flexDirection: 'row', marginTop: -2 },
    section: { color: '#24213D', fontSize: 15, fontWeight: '800', marginTop: 20, marginBottom: 12 },
    offer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 13, padding: 11, marginBottom: 9 },
    offerIcon: { width: 42, height: 42, borderRadius: 11, backgroundColor: '#F4F2FF', alignItems: 'center', justifyContent: 'center', marginRight: 10 },
    offerName: { color: '#27243F', fontWeight: '800', fontSize: 12 },
    offerDesc: { color: '#9996AA', fontSize: 10, marginTop: 3 },
    earn: { backgroundColor: '#FFBF00', paddingHorizontal: 13, paddingVertical: 7, borderRadius: 8 },
    earnText: { color: '#FFFFFF', fontSize: 10, fontWeight: '800' },
});
