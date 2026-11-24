import { useColor } from "@/providers/colorProvider";
import { radius, spacing, typography } from "@/constants/design";
import { useResponsiveLayout } from "@/hooks/use-responsive-layout";
import { colorType } from "@/types/color";
import { useState } from "react";
import {
    StyleSheet,
    TextInput,
    TextInputProps,
} from "react-native";

export default function SharedInput(props: TextInputProps) {
    const [focused, setFocused] = useState(false);

    const { colors } = useColor();
    const { scale } = useResponsiveLayout();
    const styles = createStyles(colors, scale);

    return (
        <TextInput
            {...props}
            style={[
                styles.input,
                focused && styles.inputFocused,
            ]}
            placeholderTextColor={colors.textSecondary}
            onFocus={(e) => {
                setFocused(true);
                props.onFocus?.(e);
            }}
            onBlur={(e) => {
                setFocused(false);
                props.onBlur?.(e);
            }}
        />
    );
}

const createStyles = (colors: colorType, scale: number) =>
    StyleSheet.create({
        input: {
            width: "100%",
            minHeight: 48,

            backgroundColor: colors.background,

            borderWidth: 1,
            borderColor: colors.border,

            borderRadius: radius.md,

            paddingHorizontal: spacing.md * scale,

            color: colors.textPrimary,
            fontSize: typography.body,
        },

        inputFocused: {
            borderColor: colors.primary,
        },
    });
