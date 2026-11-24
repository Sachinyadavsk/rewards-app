
import {
    Platform,
    StyleSheet,
    View,
} from "react-native";

export default function Card({
    children,
    style,
    padding = 16,
    radius = 18,
    shadow = true,
    backgroundColor = "#FFFFFF",
    onLayout,
}) {
    return (
        <View
            onLayout={onLayout}
            style={[
                styles.card,
                {
                    padding,
                    borderRadius: radius,
                    backgroundColor,
                },
                shadow && styles.shadow,
                style,
            ]}
        >
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderColor: "#EDF0F5",
        marginBottom: 12,
        overflow: "hidden",
    },

    shadow: Platform.select({
        android: {
            elevation: 3,
        },
        ios: {
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 3,
            },
            shadowOpacity: 0.06,
            shadowRadius: 8,
        },
    }),
});
