import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import BackHeader from "../components/BackHeader";
import Card from "../components/ui/Card";
import Modal from "../components/ui/Modal";

const BLUE = "#2563EB";

const leads = [
    { id: "LD1024", offername: "Angelone", offerpoints: "9876543210", status: "Approved", date: "24 Nov 2026" },
    { id: "LD1025", offername: "Amit Kumar", offerpoints: "9876543211", status: "Pending", date: "23 Nov 2026" },
    { id: "LD1026", offername: "Priya Singh", offerpoints: "9876543212", status: "Rejected", date: "22 Nov 2026" },
    { id: "LD1027", offername: "Neha Verma", offerpoints: "9876543213", status: "Approved", date: "21 Nov 2026" },
];

const LeadsScreen = () => {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");
    const [selected, setSelected] = useState(null);

    const filters = ["All", "Approved", "Pending", "Rejected"];

    const filtered = leads.filter(item =>
        (filter === "All" || item.status === filter) &&
        (item.offername.toLowerCase().includes(search.toLowerCase()) ||
            item.id.toLowerCase().includes(search.toLowerCase()))
    );

    const statusColor = (status) =>
        status === "Approved" ? "#16A34A" :
            status === "Rejected" ? "#EF4444" : "#F59E0B";

    return (
        <View style={s.container}>
            <BackHeader
                title="All Leads"
                subtitle="Manage and track your leads"
            />
            <ScrollView contentContainerStyle={s.content}
                showsVerticalScrollIndicator={false}>
                <View style={s.search}>
                    <Ionicons name="search" size={20} color="#94A3B8" />
                    <TextInput
                        value={search}
                        onChangeText={setSearch}
                        placeholder="Search name or lead ID..."
                        placeholderTextColor="#94A3B8"
                        style={s.input}
                    />
                    {!!search && (
                        <TouchableOpacity onPress={() => setSearch("")}>
                            <Ionicons name="close-circle" size={20} color="#94A3B8" />
                        </TouchableOpacity>
                    )}
                </View>

                <View style={s.filterRow}>
                    {filters.map(item => (
                        <TouchableOpacity key={item}
                            onPress={() => setFilter(item)}
                            style={[s.filter, filter === item && s.activeFilter]}>
                            <Text style={[s.filterText, filter === item && s.activeText]}>
                                {item}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={s.count}>{filtered.length} Leads Found</Text>

                {filtered.map(item => (
                    <TouchableOpacity key={item.id}
                        activeOpacity={0.8}
                        onPress={() => setSelected(item)}>
                        <Card padding={15}>
                            <View style={s.leadRow}>
                                <View style={s.avatar}>
                                    <Ionicons name="person" size={21} color={BLUE} />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={s.name}>{item.offername}</Text>
                                    <Text style={s.muted}>{item.offerpoints}</Text>
                                </View>
                                <View style={[s.badge, { backgroundColor: statusColor(item.status) + "18" }]}>
                                    <Text style={{ color: statusColor(item.status), fontSize: 10, fontWeight: "800" }}>{item.status}</Text>
                                </View>
                            </View>
                            <View style={s.footer}>
                                <Text style={s.muted}>ID: {item.id}</Text>
                                <Text style={s.muted}>{item.date}</Text>
                            </View>
                        </Card>
                    </TouchableOpacity>
                ))}

                {filtered.length === 0 && (
                    <Card>
                        <Text style={s.empty}>No leads found.</Text>
                    </Card>
                )}
            </ScrollView>

            <Modal
                visible={!!selected}
                onClose={() => setSelected(null)}
                title="Lead Details"
            >
                {selected && (
                    <View>
                        <Text style={s.detailLabel}>Offer Name</Text>
                        <Text style={s.detailValue}>{selected.offername}</Text>
                        <Text style={s.detailLabel}>Offer Points</Text>
                        <Text style={s.detailValue}>{selected.offerpoints}</Text>
                        <Text style={s.detailLabel}>Offer ID</Text>
                        <Text style={s.detailValue}>{selected.id}</Text>
                        <Text style={s.detailLabel}>Date</Text>
                        <Text style={s.detailValue}>{selected.date}</Text>
                        <Text style={s.detailLabel}>Status</Text>
                        <Text style={[s.detailValue, { color: statusColor(selected.status) }]}>
                            {selected.status}
                        </Text>
                    </View>
                )}
            </Modal>
        </View>
    );
}

export default LeadsScreen;

const s = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F5F7FB", marginTop: 45 },
    content: { padding: 18, paddingTop: 10, paddingBottom: 110 },
    search: { flexDirection: "row", alignItems: "center", backgroundColor: "#FFF", borderRadius: 14, paddingHorizontal: 14, borderWidth: 1, borderColor: "#EDF0F5" },
    input: { flex: 1, height: 48, marginLeft: 10, color: "#172033" },
    filterRow: { flexDirection: "row", gap: 7, marginVertical: 18 },
    filter: { backgroundColor: "#FFF", borderRadius: 20, paddingHorizontal: 12, paddingVertical: 10 },
    activeFilter: { backgroundColor: BLUE },
    filterText: { color: "#64748B", fontSize: 11, fontWeight: "700" },
    activeText: { color: "#FFF" },
    count: { color: "#172033", fontWeight: "800", marginBottom: 12, fontSize: 14 },
    leadRow: { flexDirection: "row", alignItems: "center", gap: 12 },
    avatar: { width: 43, height: 43, borderRadius: 13, backgroundColor: "#DBEAFE", alignItems: "center", justifyContent: "center" },
    name: { color: "#172033", fontWeight: "800", fontSize: 14 },
    muted: { color: "#8490A3", fontSize: 11, marginTop: 5 },
    badge: { paddingHorizontal: 9, paddingVertical: 6, borderRadius: 20 },
    footer: { flexDirection: "row", justifyContent: "space-between", borderTopWidth: 1, borderTopColor: "#EDF0F5", paddingTop: 12, marginTop: 14 },
    empty: { textAlign: "center", color: "#8490A3", padding: 15 },
    detailLabel: { color: "#8490A3", fontSize: 12, marginTop: 13 },
    detailValue: { color: "#172033", fontSize: 15, fontWeight: "700", marginTop: 4 },
});