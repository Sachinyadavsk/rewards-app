
import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import BackHeader from "../components/BackHeader";
import Card from "../components/ui/Card";

const PaymentDetailsScreen = () => {
    const router = useRouter();
    const params = useLocalSearchParams();

    const { id, amount, date, status, method } = params;

    const rows = [
        ["Transaction ID", id],
        ["Payment Date", date],
        ["Payment Method", method],
        ["Payment Status", status],
    ];
    return (
        <View style={s.container}>
            <BackHeader
                title="Payment Details"
                subtitle="Manage your Payment Details"
            />
            <Stack.Screen options={{ headerShown: false }} />
            <ScrollView contentContainerStyle={s.content}>
                <Card style={s.hero} padding={25}>
                    <View style={s.successIcon}>
                        <Ionicons
                            name={status === "Paid" ? "checkmark-circle" : "time"}
                            size={38}
                            color={status === "Paid" ? "#16A34A" : "#F59E0B"}
                        />
                    </View>

                    <Text style={s.label}>Transaction Amount</Text>
                    <Text style={s.amount}>{amount || "₹0"}</Text>

                    <View style={[
                        s.badge,
                        { backgroundColor: status === "Paid" ? "#DCFCE7" : "#FEF3C7" }
                    ]}>
                        <Text style={{
                            color: status === "Paid" ? "#16A34A" : "#D97706",
                            fontWeight: "800", fontSize: 12
                        }}>
                            {status || "Unknown"}
                        </Text>
                    </View>
                </Card>

                <Text style={s.section}>Transaction Information</Text>

                <Card>
                    {rows.map(([label, value], index) => (
                        <View key={label} style={[
                            s.row,
                            index === rows.length - 1 && { borderBottomWidth: 0 }
                        ]}>
                            <Text style={s.rowLabel}>{label}</Text>
                            <Text style={s.rowValue}>{value || "-"}</Text>
                        </View>
                    ))}
                </Card>

                <Text style={s.section}>Payment Summary</Text>

                <Card>
                    <View style={s.row}>
                        <Text style={s.rowLabel}>Total Amount</Text>
                        <Text style={s.rowValue}>{amount || "₹0"}</Text>
                    </View>
                    <View style={s.row}>
                        <Text style={s.rowLabel}>Processing Fee</Text>
                        <Text style={s.rowValue}>₹0.00</Text>
                    </View>
                    <View style={[s.row, { borderBottomWidth: 0 }]}>
                        <Text style={s.total}>Net Amount</Text>
                        <Text style={s.total}>{amount || "₹0"}</Text>
                    </View>
                </Card>

                <TouchableOpacity style={s.button} onPress={() => router.back()}>
                    <Text style={s.buttonText}>Back to Payments</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

export default PaymentDetailsScreen;

const s = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F5F7FB" },
    content: { padding: 18, paddingTop: 55, paddingBottom: 35 },
    hero: { alignItems: "center", paddingVertical: 28 },
    successIcon: { width: 68, height: 68, borderRadius: 22, backgroundColor: "#DCFCE7", justifyContent: "center", alignItems: "center", marginBottom: 15 },
    label: { color: "#8490A3", fontSize: 13 },
    amount: { color: "#172033", fontSize: 33, fontWeight: "900", marginVertical: 12 },
    badge: { paddingHorizontal: 16, paddingVertical: 7, borderRadius: 20 },
    section: { fontSize: 17, fontWeight: "800", color: "#172033", marginVertical: 13 },
    row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 15, gap: 10, borderBottomWidth: 1, borderBottomColor: "#EDF0F5" },
    rowLabel: { color: "#8490A3", fontSize: 12 },
    rowValue: { color: "#172033", fontSize: 12, fontWeight: "700", flexShrink: 1, textAlign: "right" },
    total: { color: "#172033", fontSize: 14, fontWeight: "900" },
    button: { backgroundColor: "#2563EB", padding: 16, borderRadius: 14, alignItems: "center", marginTop: 15 },
    buttonText: { color: "#FFF", fontWeight: "800" },
});