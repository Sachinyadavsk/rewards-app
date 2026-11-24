import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';



const register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = () => {
        if (!email.trim() || !password.trim()) {
            Alert.alert("Error", "Please enter email and password");
            return;
        }

        //Demo register. Replace with API authentication.
        router.replace("/(auth)/login");
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? "padding" : undefined}
        >
            <View style={styles.content}>
                <View style={styles.logo}>
                    <Ionicons name="person" size={35} color="#2563eb" />
                </View>

                <Text style={styles.title}>Create the New Account</Text>
                <Text style={styles.subtitle}>Register to continue your journey</Text>
                <Text style={styles.label}>Full Name</Text>
                <View style={styles.inputContainer}>
                    <Ionicons name="person-circle-outline" size={20} color="#64748b" />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your fullname"
                        keyboardType="default"
                        autoCapitalize="words"
                        value={name}
                        onChangeText={setName}
                    />
                </View>
                <Text style={styles.label}>Emal Addresss</Text>
                <View style={styles.inputContainer}>
                    <Ionicons name="mail-outline" size={20} color="#64748b" />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
                <Text style={styles.label}>Password</Text>
                <View style={styles.inputContainer}>
                    <Ionicons name="lock-closed-outline" size={20} color="#647486" />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your password"
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Ionicons
                            name={showPassword ? "eye-off-outline" : "eye-outline"}
                            size={20}
                            color="#64748b"
                        />
                    </TouchableOpacity>
                </View>


                <TouchableOpacity style={styles.loginButton}>
                    <Text style={styles.loginButtonText}>Create Account</Text>
                </TouchableOpacity>

                <View style={styles.registerRow}>
                    <Text style={styles.registerText}>Already have an account?</Text>
                    <TouchableOpacity
                        onPress={() => router.push("/(auth)/login")}
                    >
                        <Text style={styles.registerLink}>Sign In</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </KeyboardAvoidingView>
    )
}

export default register

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        justifyContent: 'center',
    },
    content: {
        padding: 25,
    },
    logo: {
        width: 70,
        height: 70,
        borderRadius: 20,
        backgroundColor: "#dbeafe",
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 25,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: 'center',
        color: "#0f172a",
    },
    subtitle: {
        fontSize: 15,
        color: "#64748b",
        textAlign: 'center',
        marginTop: 8,
        marginBottom: 25,
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 8,
        color: "#334155",
    },
    inputContainer: {
        height: 55,
        borderWidth: 1,
        borderColor: "#e2e8f0",
        borderRadius: 12,
        paddingHorizontal: 15,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    input: {
        flex: 1,
        marginLeft: 10,
        fontSize: 15,
        color: "#0f172a",
    },

    loginButton: {
        height: 55,
        backgroundColor: "#2565eb",
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginButtonText: {
        color: '#ffffff',
        fontSize: 17,
        fontWeight: "bold",
    },
    registerRow: {
        flexDirection: 'row',
        justifyContent: "center",
        marginTop: 25,
    },
    registerText: {
        color: "#64748b",
    },
    registerLink: {
        color: "#2563eb",
        fontWeight: "bold",
    }
})