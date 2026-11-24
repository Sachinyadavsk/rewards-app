
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import {
    Animated,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    Modal as RNModal,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";

const SCREEN_HEIGHT = Dimensions.get("window").height;

export default function Modal({
    visible,
    onClose,
    children,
    title,
    showCloseButton = true,
    closeOnBackdrop = true,
    height = "auto",
}) {
    const slideAnim = useRef(
        new Animated.Value(SCREEN_HEIGHT)
    ).current;

    useEffect(() => {
        if (visible) {
            Animated.spring(slideAnim, {
                toValue: 0,
                useNativeDriver: true,
                tension: 65,
                friction: 11,
            }).start();
        } else {
            slideAnim.setValue(SCREEN_HEIGHT);
        }
    }, [visible, slideAnim]);

    return (
        <RNModal
            visible={visible}
            transparent
            animationType="none"
            statusBarTranslucent
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <TouchableWithoutFeedback
                    onPress={closeOnBackdrop ? onClose : undefined}
                >
                    <View style={StyleSheet.absoluteFill} />
                </TouchableWithoutFeedback>

                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                    style={styles.keyboard}
                >
                    <Animated.View
                        style={[
                            styles.modal,
                            {
                                maxHeight:
                                    height === "auto" ? SCREEN_HEIGHT * 0.85 : height,
                                transform: [{ translateY: slideAnim }],
                            },
                        ]}
                    >
                        <View style={styles.handle} />

                        {(title || showCloseButton) && (
                            <View style={styles.header}>
                                <Text style={styles.title}>{title}</Text>

                                {showCloseButton && (
                                    <TouchableOpacity
                                        onPress={onClose}
                                        style={styles.closeButton}
                                        activeOpacity={0.7}
                                    >
                                        <Ionicons
                                            name="close"
                                            size={22}
                                            color="#64748B"
                                        />
                                    </TouchableOpacity>
                                )}
                            </View>
                        )}

                        <View style={styles.content}>
                            {children}
                        </View>
                    </Animated.View>
                </KeyboardAvoidingView>
            </View>
        </RNModal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(15, 23, 42, 0.50)",
        justifyContent: "flex-end",
    },

    keyboard: {
        justifyContent: "flex-end",
    },

    modal: {
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 26,
        borderTopRightRadius: 26,
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: Platform.OS === "ios" ? 30 : 24,
        overflow: "hidden",
    },

    handle: {
        width: 42,
        height: 5,
        backgroundColor: "#D1D5DB",
        borderRadius: 10,
        alignSelf: "center",
        marginBottom: 18,
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },

    title: {
        fontSize: 19,
        fontWeight: "800",
        color: "#172033",
        flex: 1,
    },

    closeButton: {
        width: 36,
        height: 36,
        borderRadius: 12,
        backgroundColor: "#F1F5F9",
        justifyContent: "center",
        alignItems: "center",
    },

    content: {
        flexShrink: 1,
    },
});
