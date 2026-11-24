import { useColor } from "@/providers/colorProvider";
import { colorType } from "@/types/color";
import { radius, spacing, typography } from "@/constants/design";
import { useResponsiveLayout } from "@/hooks/use-responsive-layout";
import {
    GestureResponderEvent,
    Pressable,
    StyleSheet,
    Text,
} from "react-native";

export default function SharedButton({
    isPrimaryBackground = false,
    title,
    onPress,
}: {
    isPrimaryBackground?: boolean,
    title: string;
    onPress: (e: GestureResponderEvent) => void;
}) {
    const { colors } = useColor();
    const { scale } = useResponsiveLayout();
    const styles = createStyles(colors, scale);

    return (
        <Pressable
            onPress={onPress}
            style={[
                styles.button, isPrimaryBackground ? styles.primary : styles.dark ,
            ]}
        >
            <Text style={[styles.text, !isPrimaryBackground && styles.textOnAccent]}>
                {title}
            </Text>
        </Pressable>
    );
}

const createStyles = (colors: colorType, scale: number) =>
    StyleSheet.create({
        button: {
            minHeight: 48,
            paddingHorizontal: spacing.lg * scale,
            paddingVertical: spacing.sm * scale,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: radius.md,
        },

        dark: {
            backgroundColor: colors.primary,
        },
        primary: {
            backgroundColor: colors.background,
        },
        text: {
            fontWeight: "bold",
            color: colors.textPrimary,
            fontSize: typography.bodyLarge,
        },
        textOnAccent: {
            color: colors.onPrimary,
        },
    });
