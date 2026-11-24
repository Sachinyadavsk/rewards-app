
import { router } from "expo-router";
import { useEffect } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function SplashScreen() {

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/(tabs)/home");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Text style={styles.logoText}>R</Text>
      </View>

      <Text style={styles.title}>Reapbucks Application</Text>
      <Text style={styles.subtitle}>
        Welcome to our application
      </Text>

      <ActivityIndicator
        size="small"
        color="#ffffff"
        style={styles.loader}
      />

      <Text style={styles.footer}>Version 1.0.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2563eb",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 90,
    height: 90,
    borderRadius: 25,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  logoText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#2563eb",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
  },
  subtitle: {
    fontSize: 15,
    color: "#dbeafe",
    marginTop: 8,
  },
  loader: {
    marginTop: 35,
  },
  footer: {
    position: "absolute",
    bottom: 35,
    color: "#dbeafe",
    fontSize: 12,
  },
});
