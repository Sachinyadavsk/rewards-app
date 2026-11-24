
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
    View,
} from "react-native";
import BackHeader from "../components/BackHeader";

const PaymentMethodsScreen = () => {
    const router = useRouter();

    const [activeTab, setActiveTab] = useState("upi");
    const [upiId, setUpiId] = useState("");
    const [accountName, setAccountName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [confirmAccount, setConfirmAccount] = useState("");
    const [ifsc, setIfsc] = useState("");
    const [bankName, setBankName] = useState("");
    const [defaultMethod, setDefaultMethod] = useState("upi");

    const saveDetails = () => {
        if (activeTab === "upi") {
            if (!upiId.trim() || !/^[\w.-]+@[\w.-]+$/.test(upiId.trim())) {
                Alert.alert("Invalid UPI ID", "Please enter a valid UPI ID.");
                return;
            }
        } else {
            if (
                !accountName.trim() ||
                !accountNumber.trim() ||
                !ifsc.trim() ||
                !bankName.trim()
            ) {
                Alert.alert("Missing Details", "Please fill in all bank details.");
                return;
            }

            if (accountNumber !== confirmAccount) {
                Alert.alert("Account Mismatch", "Account numbers do not match.");
                return;
            }

            if (!/^[A-Za-z]{4}0[A-Za-z0-9]{6}$/.test(ifsc.trim())) {
                Alert.alert("Invalid IFSC", "Please enter a valid IFSC code.");
                return;
            }
        }

        // Connect your save payment details API here.
        Alert.alert("Success", "Payment details saved successfully.");
    };

    const Field = ({ label, placeholder, value, onChangeText, ...props }) => (
        <View style={styles.field}>
            <Text style={styles.fieldLabel}>{label}</Text>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor="#A0A8B7"
                value={value}
                onChangeText={onChangeText}
                autoCapitalize="none"
                {...props}
            />
        </View>
    );

    return (
        <View style={styles.container}>
            <BackHeader
                title="Payment Methods"
                subtitle="Manage your Payment Methods"
            />
            <StatusBar barStyle="dark-content" backgroundColor="#F5F7FB" />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.intro}>
                    <View style={styles.introIcon}>
                        <Ionicons name="card-outline" size={30} color="#2563EB" />
                    </View>
                    <Text style={styles.title}>Bank & UPI Details</Text>
                    <Text style={styles.subtitle}>
                        Add your payment details to receive your earnings securely.
                    </Text>
                </View>

                {/* Payment Tabs */}
                <View style={styles.tabs}>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === "upi" && styles.activeTab]}
                        onPress={() => setActiveTab("upi")}
                    >
                        <Ionicons
                            name="phone-portrait-outline"
                            size={19}
                            color={activeTab === "upi" ? "#2563EB" : "#8993A4"}
                        />
                        <Text style={[styles.tabText, activeTab === "upi" && styles.activeTabText]}>
                            UPI ID
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.tab, activeTab === "bank" && styles.activeTab]}
                        onPress={() => setActiveTab("bank")}
                    >
                        <Ionicons
                            name="business-outline"
                            size={19}
                            color={activeTab === "bank" ? "#2563EB" : "#8993A4"}
                        />
                        <Text style={[styles.tabText, activeTab === "bank" && styles.activeTabText]}>
                            Bank Account
                        </Text>
                    </TouchableOpacity>
                </View>

                {activeTab === "upi" ? (
                    <View style={styles.formCard}>
                        <View style={styles.formHeading}>
                            <View style={[styles.smallIcon, { backgroundColor: "#EDE9FE" }]}>
                                <Ionicons name="qr-code-outline" size={22} color="#7C3AED" />
                            </View>
                            <View>
                                <Text style={styles.formTitle}>UPI Payment Details</Text>
                                <Text style={styles.formSubtitle}>Receive money directly via UPI</Text>
                            </View>
                        </View>

                        <Field
                            label="UPI ID"
                            placeholder="example@okaxis"
                            value={upiId}
                            onChangeText={setUpiId}
                            keyboardType="email-address"
                        />

                        <View style={styles.tip}>
                            <Ionicons name="information-circle-outline" size={19} color="#2563EB" />
                            <Text style={styles.tipText}>
                                Enter your active UPI ID linked to your bank account.
                            </Text>
                        </View>

                        <TouchableOpacity
                            style={styles.defaultRow}
                            onPress={() => setDefaultMethod("upi")}
                        >
                            <View>
                                <Text style={styles.defaultTitle}>Set as default method</Text>
                                <Text style={styles.defaultSubtitle}>Use UPI for withdrawals</Text>
                            </View>
                            <Ionicons
                                name={defaultMethod === "upi" ? "checkbox" : "square-outline"}
                                size={23}
                                color={defaultMethod === "upi" ? "#2563EB" : "#A0A8B7"}
                            />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.formCard}>
                        <View style={styles.formHeading}>
                            <View style={[styles.smallIcon, { backgroundColor: "#DCFCE7" }]}>
                                <Ionicons name="business-outline" size={22} color="#16A34A" />
                            </View>
                            <View>
                                <Text style={styles.formTitle}>Bank Account Details</Text>
                                <Text style={styles.formSubtitle}>Receive money into your bank</Text>
                            </View>
                        </View>

                        <Field
                            label="Account Holder Name"
                            placeholder="Enter account holder name"
                            value={accountName}
                            onChangeText={setAccountName}
                            autoCapitalize="words"
                        />

                        <Field
                            label="Bank Name"
                            placeholder="Enter your bank name"
                            value={bankName}
                            onChangeText={setBankName}
                            autoCapitalize="words"
                        />

                        <Field
                            label="Account Number"
                            placeholder="Enter account number"
                            value={accountNumber}
                            onChangeText={setAccountNumber}
                            keyboardType="numeric"
                        />

                        <Field
                            label="Confirm Account Number"
                            placeholder="Re-enter account number"
                            value={confirmAccount}
                            onChangeText={setConfirmAccount}
                            keyboardType="numeric"
                        />

                        <Field
                            label="IFSC Code"
                            placeholder="e.g. SBIN0001234"
                            value={ifsc}
                            onChangeText={(value) => setIfsc(value.toUpperCase())}
                            autoCapitalize="characters"
                            maxLength={11}
                        />

                        <View style={styles.tip}>
                            <Ionicons name="shield-checkmark-outline" size={19} color="#16A34A" />
                            <Text style={styles.tipText}>
                                Ensure your account details match your bank records.
                            </Text>
                        </View>

                        <TouchableOpacity
                            style={styles.defaultRow}
                            onPress={() => setDefaultMethod("bank")}
                        >
                            <View>
                                <Text style={styles.defaultTitle}>Set as default method</Text>
                                <Text style={styles.defaultSubtitle}>Use bank transfer for withdrawals</Text>
                            </View>
                            <Ionicons
                                name={defaultMethod === "bank" ? "checkbox" : "square-outline"}
                                size={23}
                                color={defaultMethod === "bank" ? "#2563EB" : "#A0A8B7"}
                            />
                        </TouchableOpacity>
                    </View>
                )}

                {/* Security */}
                <View style={styles.securityCard}>
                    <Ionicons name="lock-closed" size={20} color="#16A34A" />
                    <View style={{ flex: 1 }}>
                        <Text style={styles.securityTitle}>Your details are secure</Text>
                        <Text style={styles.securityText}>
                            Your payment information should be stored securely and used only for authorized payouts.
                        </Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.saveButton} onPress={saveDetails}>
                    <Ionicons name="save-outline" size={20} color="#FFFFFF" />
                    <Text style={styles.saveButtonText}>Save Payment Details</Text>
                </TouchableOpacity>

                <Text style={styles.bottomText}>
                    Please verify your payment details before saving.
                </Text>
            </ScrollView>
        </View>
    );
}


export default PaymentMethodsScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F5F7FB", paddingHorizontal: 20, marginTop:45 },
    intro: { alignItems: "center", marginTop: 20, marginBottom: 25 },
    introIcon: {
        width: 65, height: 65, borderRadius: 20, backgroundColor: "#E8F0FF",
        alignItems: "center", justifyContent: "center", marginBottom: 13,
    },
    title: { fontSize: 22, fontWeight: "800", color: "#172033" },
    subtitle: {
        fontSize: 13, color: "#8993A4", textAlign: "center",
        lineHeight: 20, marginTop: 7, paddingHorizontal: 10,
    },
    tabs: {
        flexDirection: "row", backgroundColor: "#E9EDF4",
        padding: 5, borderRadius: 14, marginBottom: 18,
    },
    tab: {
        flex: 1, height: 45, flexDirection: "row", alignItems: "center",
        justifyContent: "center", gap: 7, borderRadius: 11,
    },
    activeTab: { backgroundColor: "#FFFFFF" },
    tabText: { fontSize: 13, fontWeight: "600", color: "#8993A4" },
    activeTabText: { color: "#2563EB" },
    formCard: {
        backgroundColor: "#FFFFFF", borderRadius: 18,
        padding: 18, borderWidth: 1, borderColor: "#EDF0F5",
    },
    formHeading: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 22 },
    smallIcon: {
        width: 45, height: 45, borderRadius: 13,
        alignItems: "center", justifyContent: "center",
    },
    formTitle: { fontSize: 15, fontWeight: "700", color: "#172033" },
    formSubtitle: { fontSize: 11, color: "#8993A4", marginTop: 4 },
    field: { marginBottom: 17 },
    fieldLabel: { fontSize: 13, fontWeight: "600", color: "#465166", marginBottom: 8 },
    input: {
        height: 51, borderRadius: 11, borderWidth: 1,
        borderColor: "#E5E9F0", paddingHorizontal: 14,
        color: "#172033", fontSize: 14, backgroundColor: "#FCFCFD",
    },
    tip: {
        flexDirection: "row", alignItems: "center", gap: 9,
        backgroundColor: "#EFF6FF", padding: 12, borderRadius: 10, marginTop: 2,
    },
    tipText: { flex: 1, fontSize: 11, color: "#52647E", lineHeight: 17 },
    defaultRow: {
        flexDirection: "row", alignItems: "center",
        justifyContent: "space-between", marginTop: 20,
        paddingTop: 17, borderTopWidth: 1, borderTopColor: "#EDF0F5",
    },
    defaultTitle: { fontSize: 13, fontWeight: "700", color: "#172033" },
    defaultSubtitle: { fontSize: 11, color: "#8993A4", marginTop: 4 },
    securityCard: {
        flexDirection: "row", gap: 11, padding: 15,
        backgroundColor: "#EAFBF1", borderRadius: 13, marginTop: 18,
    },
    securityTitle: { fontSize: 13, fontWeight: "700", color: "#166534" },
    securityText: { fontSize: 11, color: "#52715D", lineHeight: 17, marginTop: 5 },
    saveButton: {
        height: 55, backgroundColor: "#2563EB", borderRadius: 14,
        flexDirection: "row", alignItems: "center",
        justifyContent: "center", gap: 9, marginTop: 22,
    },
    saveButtonText: { fontSize: 15, fontWeight: "700", color: "#FFFFFF" },
    bottomText: {
        textAlign: "center", fontSize: 11, color: "#929BAB",
        marginTop: 15, marginBottom: 25,
    },
});