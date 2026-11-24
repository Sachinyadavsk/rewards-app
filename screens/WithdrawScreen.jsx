
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import BackHeader from "../components/BackHeader";

const QUICK_AMOUNTS = [100, 200, 500, 1000];

const WithdrawScreen = () => {
    const router = useRouter();

    const [amount, setAmount] = useState("");
    const [method, setMethod] = useState("upi");
    const balance = 2450;
    const minimumWithdraw = 100;
    const handleWithdraw = () => {
        const value = Number(amount);
        if (!value || value < minimumWithdraw) {
            Alert.alert("Invalid Amount", `Minimum withdrawal is ₹${minimumWithdraw}.`);
            return;
        }
        if (value > balance) {
            Alert.alert("Insufficient Balance", "Your withdrawal amount exceeds your available balance.");
            return;
        }

        Alert.alert(
            "Confirm Withdrawal",
            `Withdraw ₹${value} using ${method === "upi" ? "UPI" : "Bank Transfer"}?`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Confirm",
                    onPress: () => {
                        // Connect your withdrawal API here.
                        Alert.alert("Request Submitted", "Your withdrawal request has been submitted.");
                        setAmount("");
                    },
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <BackHeader
                title="Withdraw Cash"
                subtitle="Manage and track your Withdraw Cash"
            />
            <StatusBar barStyle="dark-content" backgroundColor="#F5F7FB" />
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Balance Card */}
                <View style={styles.balanceCard}>
                    <View style={styles.balanceTop}>
                        <View>
                            <Text style={styles.balanceLabel}>Available Balance</Text>
                            <Text style={styles.balanceAmount}>₹{balance.toLocaleString("en-IN")}</Text>
                        </View>
                        <View style={styles.walletIcon}>
                            <Ionicons name="wallet-outline" size={28} color="#FFFFFF" />
                        </View>
                    </View>
                    <View style={styles.balanceBottom}>
                        <Ionicons name="shield-checkmark-outline" size={16} color="#DCEAFE" />
                        <Text style={styles.balanceNote}>Your earnings are ready to withdraw</Text>
                    </View>
                </View>

                {/* Amount */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Enter Withdrawal Amount</Text>
                    <View style={styles.amountBox}>
                        <Text style={styles.rupee}>₹</Text>
                        <TextInput
                            style={styles.amountInput}
                            placeholder="0"
                            placeholderTextColor="#A0A7B5"
                            keyboardType="numeric"
                            value={amount}
                            onChangeText={(value) => setAmount(value.replace(/[^0-9]/g, ""))}
                            maxLength={7}
                        />
                        <TouchableOpacity onPress={() => setAmount(String(balance))}>
                            <Text style={styles.maxText}>MAX</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.helperText}>
                        Minimum ₹{minimumWithdraw} · Maximum ₹{balance.toLocaleString("en-IN")}
                    </Text>

                    <Text style={styles.quickTitle}>Quick Select</Text>
                    <View style={styles.quickAmounts}>
                        {QUICK_AMOUNTS.map((item) => (
                            <TouchableOpacity
                                key={item}
                                style={[
                                    styles.quickButton,
                                    amount === String(item) && styles.quickButtonActive,
                                ]}
                                onPress={() => setAmount(String(item))}
                            >
                                <Text
                                    style={[
                                        styles.quickText,
                                        amount === String(item) && styles.quickTextActive,
                                    ]}
                                >
                                    ₹{item}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Payment Method */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Withdrawal Method</Text>

                    <TouchableOpacity
                        style={[styles.methodCard, method === "upi" && styles.methodActive]}
                        onPress={() => setMethod("upi")}
                    >
                        <View style={[styles.methodIcon, { backgroundColor: "#EDE9FE" }]}>
                            <Ionicons name="phone-portrait-outline" size={24} color="#7C3AED" />
                        </View>
                        <View style={styles.methodInfo}>
                            <Text style={styles.methodName}>UPI Transfer</Text>
                            <Text style={styles.methodDescription}>Instant or within a few hours</Text>
                        </View>
                        <Ionicons
                            name={method === "upi" ? "radio-button-on" : "radio-button-off"}
                            size={22}
                            color={method === "upi" ? "#2563EB" : "#A0A7B5"}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.methodCard, method === "bank" && styles.methodActive]}
                        onPress={() => setMethod("bank")}
                    >
                        <View style={[styles.methodIcon, { backgroundColor: "#DCFCE7" }]}>
                            <Ionicons name="business-outline" size={24} color="#16A34A" />
                        </View>
                        <View style={styles.methodInfo}>
                            <Text style={styles.methodName}>Bank Transfer</Text>
                            <Text style={styles.methodDescription}>1–3 working days</Text>
                        </View>
                        <Ionicons
                            name={method === "bank" ? "radio-button-on" : "radio-button-off"}
                            size={22}
                            color={method === "bank" ? "#2563EB" : "#A0A7B5"}
                        />
                    </TouchableOpacity>
                </View>

                {/* Info */}
                <View style={styles.infoCard}>
                    <Ionicons name="information-circle-outline" size={21} color="#2563EB" />
                    <View style={{ flex: 1 }}>
                        <Text style={styles.infoTitle}>Withdrawal Information</Text>
                        <Text style={styles.infoText}>
                            Make sure your UPI ID or bank details are verified before requesting a withdrawal.
                        </Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={[styles.withdrawButton, !amount && styles.buttonDisabled]}
                    onPress={handleWithdraw}
                    activeOpacity={0.85}
                >
                    <Text style={styles.withdrawButtonText}>Withdraw Cash</Text>
                    <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
                </TouchableOpacity>

                <Text style={styles.secureText}>
                    <Ionicons name="lock-closed" size={12} color="#8A93A3" />
                    {" "}Secure and protected transaction
                </Text>
            </ScrollView>
        </View>
    );
}

export default WithdrawScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F5F7FB", paddingHorizontal: 20, marginTop:45 },
    header: {
        height: 60, flexDirection: "row", alignItems: "center",
        justifyContent: "space-between",
    },
    backButton: {
        width: 40, height: 40, borderRadius: 12, backgroundColor: "#FFFFFF",
        alignItems: "center", justifyContent: "center",
    },
    headerTitle: { fontSize: 19, fontWeight: "700", color: "#172033" },
    balanceCard: {
        backgroundColor: "#2563EB", borderRadius: 20, padding: 22, marginTop: 12,
    },
    balanceTop: { flexDirection: "row", justifyContent: "space-between" },
    balanceLabel: { color: "#DBEAFE", fontSize: 14 },
    balanceAmount: { color: "#FFFFFF", fontSize: 34, fontWeight: "800", marginTop: 8 },
    walletIcon: {
        width: 52, height: 52, borderRadius: 16, backgroundColor: "#FFFFFF30",
        alignItems: "center", justifyContent: "center",
    },
    balanceBottom: {
        flexDirection: "row", alignItems: "center", marginTop: 20, gap: 7,
    },
    balanceNote: { color: "#DBEAFE", fontSize: 12 },
    section: { marginTop: 25 },
    sectionTitle: { fontSize: 17, fontWeight: "700", color: "#172033", marginBottom: 13 },
    amountBox: {
        height: 70, backgroundColor: "#FFFFFF", borderRadius: 15,
        borderWidth: 1, borderColor: "#E1E7F0", flexDirection: "row",
        alignItems: "center", paddingHorizontal: 18,
    },
    rupee: { fontSize: 27, fontWeight: "700", color: "#172033" },
    amountInput: { flex: 1, fontSize: 27, fontWeight: "700", color: "#172033", paddingHorizontal: 10 },
    maxText: { color: "#2563EB", fontWeight: "800", fontSize: 13 },
    helperText: { fontSize: 12, color: "#8993A4", marginTop: 9 },
    quickTitle: { fontSize: 14, fontWeight: "600", color: "#596579", marginTop: 20, marginBottom: 12 },
    quickAmounts: { flexDirection: "row", gap: 10 },
    quickButton: {
        flex: 1, paddingVertical: 12, alignItems: "center",
        backgroundColor: "#FFFFFF", borderRadius: 11, borderWidth: 1, borderColor: "#E1E7F0",
    },
    quickButtonActive: { backgroundColor: "#EFF6FF", borderColor: "#2563EB" },
    quickText: { color: "#536078", fontWeight: "700" },
    quickTextActive: { color: "#2563EB" },
    methodCard: {
        flexDirection: "row", alignItems: "center", backgroundColor: "#FFFFFF",
        padding: 15, borderRadius: 15, marginBottom: 12, borderWidth: 1,
        borderColor: "#E7EBF2",
    },
    methodActive: { borderColor: "#2563EB", backgroundColor: "#F8FAFF" },
    methodIcon: {
        width: 48, height: 48, borderRadius: 13,
        alignItems: "center", justifyContent: "center",
    },
    methodInfo: { flex: 1, marginLeft: 13 },
    methodName: { fontSize: 15, fontWeight: "700", color: "#172033" },
    methodDescription: { fontSize: 12, color: "#8993A4", marginTop: 5 },
    infoCard: {
        flexDirection: "row", gap: 10, backgroundColor: "#EFF6FF",
        padding: 15, borderRadius: 13, marginTop: 10,
    },
    infoTitle: { fontWeight: "700", fontSize: 13, color: "#1E40AF" },
    infoText: { color: "#52647E", fontSize: 12, lineHeight: 18, marginTop: 5 },
    withdrawButton: {
        height: 55, borderRadius: 14, backgroundColor: "#2563EB",
        flexDirection: "row", alignItems: "center", justifyContent: "center",
        gap: 10, marginTop: 25,
    },
    buttonDisabled: { opacity: 0.65 },
    withdrawButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
    secureText: { textAlign: "center", color: "#8A93A3", fontSize: 11, marginVertical: 18 },
});