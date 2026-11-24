import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet, Switch,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import BackHeader from "../components/BackHeader";
import Card from "../components/ui/Card";
import Modal from "../components/ui/Modal";

const SettingsScreen = () => {
    const router = useRouter();
    const [notifications, setNotifications] = useState(true);
    const [logoutVisible, setLogoutVisible] = useState(false);

    const menu = [
        { icon: "person-outline", title: "Personal Information", subtitle: "Manage your profile", route: "/" },
        { icon: "card-outline", title: "Bank & UPI Details", subtitle: "Manage payment methods", route: "/paymentmethods" },
        { icon: "lock-closed-outline", title: "Change Password", subtitle: "Update your password", route: "/" },
        { icon: "help-circle-outline", title: "Help & Support", subtitle: "Get assistance", route: "/" },
        { icon: "document-text-outline", title: "Terms & Conditions", subtitle: "Read our terms", route: "/" },
        { icon: "shield-checkmark-outline", title: "Privacy Policy", subtitle: "Your privacy matters", route: "/" },
    ];

    return (
        <View style={s.container}>
            <BackHeader
                title="Settings"
                subtitle="Manage your account preferences"
            />
            <ScrollView contentContainerStyle={s.content}
                showsVerticalScrollIndicator={false}>
                <Card padding={18}>
                    <View style={s.profile}>
                        <View style={s.avatar}>
                            <Text style={s.avatarText}>SK</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={s.name}>Sachin Kumar</Text>
                            <Text style={s.email}>sachin@example.com</Text>
                            <Text style={s.verified}>✓ Verified Account</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
                    </View>
                </Card>

                <Text style={s.section}>Account Settings</Text>

                <Card padding={15}>
                    {menu.slice(0, 3).map((item, index) => (
                        <TouchableOpacity key={index} style={s.menu}
                            activeOpacity={0.7}
                            onPress={() => router.push(item.route)}>
                            <View style={s.menuIcon}>
                                <Ionicons name={item.icon} size={21} color="#2563EB" />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={s.menuTitle}>{item.title}</Text>
                                <Text style={s.menuSubtitle}>{item.subtitle}</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
                        </TouchableOpacity>
                    ))}
                </Card>

                <Text style={s.section}>Preferences</Text>

                <Card padding={15}>
                    <View style={s.menu}>
                        <View style={s.menuIcon}>
                            <Ionicons name="notifications-outline" size={21} color="#2563EB" />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={s.menuTitle}>Push Notifications</Text>
                            <Text style={s.menuSubtitle}>Receive important updates</Text>
                        </View>
                        <Switch
                            value={notifications}
                            onValueChange={setNotifications}
                            trackColor={{ false: "#CBD5E1", true: "#93C5FD" }}
                            thumbColor={notifications ? "#2563EB" : "#FFFFFF"}
                        />
                    </View>
                </Card>

                <Text style={s.section}>Support & Legal</Text>

                <Card padding={15}>
                    {menu.slice(3).map((item, index) => (
                        <TouchableOpacity key={index} style={s.menu}
                            onPress={() => Alert.alert(item.title, "Connect your support or legal page here.")}>
                            <View style={s.menuIcon}>
                                <Ionicons name={item.icon} size={21} color="#2563EB" />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={s.menuTitle}>{item.title}</Text>
                                <Text style={s.menuSubtitle}>{item.subtitle}</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
                        </TouchableOpacity>
                    ))}
                </Card>

                <TouchableOpacity style={s.logout}
                    onPress={() => setLogoutVisible(true)}>
                    <Ionicons name="log-out-outline" size={21} color="#EF4444" />
                    <Text style={s.logoutText}>Logout</Text>
                </TouchableOpacity>

                <Text style={s.version}>Version 1.0.0</Text>
            </ScrollView>

            <Modal
                visible={logoutVisible}
                onClose={() => setLogoutVisible(false)}
                title="Logout Confirmation"
            >
                <Text style={s.confirmText}>
                    Are you sure you want to logout from your account?
                </Text>

                <View style={s.buttons}>
                    <TouchableOpacity
                        style={s.cancelButton}
                        onPress={() => setLogoutVisible(false)}
                    >
                        <Text style={s.cancelText}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={s.confirmButton}
                        onPress={() => {
                            setLogoutVisible(false);
                            Alert.alert("Logout", "Connect your authentication logout action here.");
                        }}
                    >
                        <Text style={s.confirmButtonText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}

export default SettingsScreen;

const s = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F5F7FB", marginTop: 45 },
    content: { padding: 18, paddingTop: 10, paddingBottom: 110 },
    profile: { flexDirection: "row", alignItems: "center", gap: 13 },
    avatar: { width: 57, height: 57, borderRadius: 18, backgroundColor: "#DBEAFE", justifyContent: "center", alignItems: "center" },
    avatarText: { color: "#2563EB", fontSize: 21, fontWeight: "900" },
    name: { color: "#172033", fontSize: 16, fontWeight: "800" },
    email: { color: "#8490A3", fontSize: 11, marginTop: 4 },
    verified: { color: "#16A34A", fontSize: 11, fontWeight: "700", marginTop: 5 },
    section: { fontSize: 16, color: "#172033", fontWeight: "800", marginTop: 15, marginBottom: 10 },
    menu: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: "#EDF0F5" },
    menuIcon: { width: 42, height: 42, borderRadius: 13, backgroundColor: "#EFF6FF", alignItems: "center", justifyContent: "center" },
    menuTitle: { color: "#172033", fontSize: 13, fontWeight: "700" },
    menuSubtitle: { color: "#8490A3", fontSize: 10, marginTop: 4 },
    logout: { flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 10, backgroundColor: "#FEE2E2", borderRadius: 14, padding: 16, marginTop: 18 },
    logoutText: { color: "#EF4444", fontWeight: "800", fontSize: 14 },
    version: { textAlign: "center", color: "#94A3B8", fontSize: 11, marginTop: 18 },
    confirmText: { color: "#64748B", fontSize: 14, lineHeight: 22 },
    buttons: { flexDirection: "row", gap: 10, marginTop: 22 },
    cancelButton: { flex: 1, padding: 14, borderRadius: 12, backgroundColor: "#F1F5F9", alignItems: "center" },
    cancelText: { color: "#334155", fontWeight: "700" },
    confirmButton: { flex: 1, padding: 14, borderRadius: 12, backgroundColor: "#EF4444", alignItems: "center" },
    confirmButtonText: { color: "#FFF", fontWeight: "800" },
});