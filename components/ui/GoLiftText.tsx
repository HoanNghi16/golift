import { useColor } from "@/providers/colorProvider";
import { colorType } from "@/types/color";
import { StyleSheet, Text, View } from "react-native";

export default function GoLiftText({
    backgroundShown = false,
    fontSize = 20,
}: {
    backgroundShown?: boolean;
    fontSize?: number;
}) {
    const { colors } = useColor();

    const styles = createStyles(colors);

    if (backgroundShown) {
        return (
            <View style={styles.optionalContainer}>
                <Text style={[styles.go, { fontSize }]}>
                    Go
                </Text>

                <Text style={[styles.lift, { fontSize }]}>
                    Lift
                </Text>
            </View>
        );
    }

    return (
        <Text style={styles.inlineText}>
            <Text style={[styles.go, { fontSize }]}>
                Go
            </Text>

            <Text style={[styles.lift, { fontSize }]}>
                Lift
            </Text>
        </Text>
    );
}

const createStyles = (colors: colorType) =>
    StyleSheet.create({
        optionalContainer: {
            padding: 6,
            backgroundColor: colors.surface,
            borderRadius: 10,
            flexDirection: "row",
        },

        inlineText: {
            flexDirection: "row",
        },

        go: {
            fontFamily: "Arial",
            fontWeight: "bold",
            color: colors.textPrimary,
        },

        lift: {
            fontFamily: "Arial",
            fontWeight: "bold",
            color: colors.primaryText,
        },
    });