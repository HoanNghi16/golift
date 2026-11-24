import { useColor } from "@/providers/colorProvider";
import { colorType } from "@/types/color";
import { radius, spacing } from "@/constants/design";
import { useResponsiveLayout } from "@/hooks/use-responsive-layout";
import { StyleSheet, Text, View } from "react-native";

export default function GoLiftText({
    backgroundShown = false,
    fontSize = 20,
}: {
    backgroundShown?: boolean;
    fontSize?: number;
}) {
    const { colors } = useColor();
    const { scale } = useResponsiveLayout();
    const styles = createStyles(colors, scale);

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

const createStyles = (colors: colorType, scale: number) =>
    StyleSheet.create({
        optionalContainer: {
            padding: spacing.xs * scale,
            backgroundColor: colors.surface,
            borderRadius: radius.md,
            flexDirection: "row",
        },

        inlineText: {
            flexDirection: "row",
        },

        go: {
            fontFamily: "Arial",
            fontWeight: "bold",
            color: colors.onSurface,
        },

        lift: {
            fontFamily: "Arial",
            fontWeight: "bold",
            color: colors.accentText,
        },
    });
