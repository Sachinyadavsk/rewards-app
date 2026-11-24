import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import BackHeader from "../components/BackHeader";
import Card from "../components/ui/Card";

const payments = [
    { id: "PAY1001", amount: "₹2,500", date: "24 Nov 2026", status: "Paid", method: "UPI" },
    { id: "PAY1002", amount: "₹1,800", date: "22 Nov 2026", status: "Pending", method: "Bank Transfer" },
    { id: "PAY1003", amount: "₹3,200", date: "19 Nov 2026", status: "Paid", method: "UPI" },
    { id: "PAY1004", amount: "₹950", date: "17 Nov 2026", status: "Pending", method: "Bank Transfer" },
];

const PaymentsScreen = () => {
    const router = useRouter();
    const [filter, setFilter] = useState("All");

    const filtered = payments.filter(
        p => filter === "All" || p.status === filter
    );
    return (
        <View style={s.container}>
            <BackHeader
                title="My Payments"
                subtitle="Track all your transactions"
            />
            <ScrollView contentContainerStyle={s.content}
                showsVerticalScrollIndicator={false}>
                <Card backgroundColor="#2563EB" radius={22} padding={22}>
                    <Text style={s.heroLabel}>Total Payments Received</Text>
                    <Text style={s.heroAmount}>₹5,700.00</Text>
                    <View style={s.heroFooter}>
                        <Ionicons name="checkmark-circle" size={18} color="#BBF7D0" />
                        <Text style={s.heroText}>2 successful transactions</Text>
                    </View>
                </Card>

                <View style={s.stats}>
                    <Card style={{ flex: 1 }} padding={14}>
                        <Text style={s.statLabel}>Paid</Text>
                        <Text style={s.paid}>₹5,700</Text>
                    </Card>
                    <Card style={{ flex: 1 }} padding={14}>
                        <Text style={s.statLabel}>Pending</Text>
                        <Text style={s.pending}>₹2,750</Text>
                    </Card>
                </View>

                <Text style={s.section}>Transaction History</Text>

                <View style={s.filters}>
                    {["All", "Paid", "Pending"].map(item => (
                        <TouchableOpacity
                            key={item}
                            onPress={() => setFilter(item)}
                            style={[s.filter, filter === item && s.activeFilter]}
                        >
                            <Text style={[s.filterText, filter === item && s.activeText]}>
                                {item}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {filtered.map(item => (
                    <TouchableOpacity key={item.id}
                        activeOpacity={0.8}
                        onPress={() => router.push({
                            pathname: "/paymentdetails",
                            params: item,
                        })}>
                        <Card padding={15}>
                            <View style={s.row}>
                                <View style={s.icon}>
                                    <Ionicons name="arrow-down" size={21} color="#16A34A" />
                                </View>

                                <View style={{ flex: 1 }}>
                                    <Text style={s.title}>Payment #{item.id}</Text>
                                    <Text style={s.muted}>{item.date}</Text>
                                    <Text style={s.method}>{item.method}</Text>
                                </View>

                                <View style={{ alignItems: "flex-end" }}>
                                    <Text style={s.amount}>{item.amount}</Text>
                                    <View style={[
                                        s.badge,
                                        { backgroundColor: item.status === "Paid" ? "#DCFCE7" : "#FEF3C7" }
                                    ]}>
                                        <Text style={{
                                            color: item.status === "Paid" ? "#16A34A" : "#D97706",
                                            fontSize: 10, fontWeight: "800"
                                        }}>{item.status}</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={s.footer}>
                                <Text style={s.muted}>View payment details</Text>
                                <Ionicons name="chevron-forward" size={17} color="#94A3B8" />
                            </View>
                        </Card>
                    </TouchableOpacity>
                ))}

                {filtered.length === 0 && (
                    <Card>
                        <Text style={s.muted}>No payments found.</Text>
                    </Card>
                )}
            </ScrollView>
        </View>
    );
}

export default PaymentsScreen;

const s = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F5F7FB", marginTop:45 },
    content: { padding: 18, paddingTop: 10, paddingBottom: 110 },
    heroLabel: { color: "#DBEAFE", fontSize: 13 },
    heroAmount: { color: "#FFF", fontSize: 32, fontWeight: "900", marginVertical: 12 },
    heroFooter: { flexDirection: "row", alignItems: "center", gap: 7 },
    heroText: { color: "#DBEAFE", fontSize: 12 },
    stats: { flexDirection: "row", gap: 10, marginTop: 12 },
    statLabel: { color: "#8490A3", fontSize: 12 },
    paid: { color: "#16A34A", fontWeight: "900", fontSize: 19, marginTop: 8 },
    pending: { color: "#F59E0B", fontWeight: "900", fontSize: 19, marginTop: 8 },
    section: { color: "#172033", fontWeight: "800", fontSize: 18, marginTop: 15 },
    filters: { flexDirection: "row", gap: 9, marginVertical: 15 },
    filter: { paddingHorizontal: 19, paddingVertical: 9, backgroundColor: "#FFF", borderRadius: 20 },
    activeFilter: { backgroundColor: "#2563EB" },
    filterText: { color: "#64748B", fontWeight: "700", fontSize: 12 },
    activeText: { color: "#FFF" },
    row: { flexDirection: "row", alignItems: "center", gap: 12 },
    icon: { width: 43, height: 43, borderRadius: 13, backgroundColor: "#DCFCE7", alignItems: "center", justifyContent: "center" },
    title: { color: "#172033", fontWeight: "800", fontSize: 13 },
    muted: { color: "#8490A3", fontSize: 11, marginTop: 5 },
    method: { color: "#64748B", fontSize: 10, marginTop: 4 },
    amount: { color: "#172033", fontWeight: "900", fontSize: 15 },
    badge: { borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5, marginTop: 7 },
    footer: { borderTopWidth: 1, borderTopColor: "#EDF0F5", marginTop: 13, paddingTop: 11, flexDirection: "row", justifyContent: "space-between" },
});