import { useColor } from "@/providers/colorProvider";
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

    const styles = createStyles(colors);

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

const createStyles = (colors: colorType) =>
    StyleSheet.create({
        input: {
            width: "100%",
            height: 52,

            backgroundColor: colors.background,

            borderWidth: 1,
            borderColor: colors.primary,

            borderRadius: 14,

            paddingHorizontal: 16,

            color: colors.textPrimary,
            fontSize: 16,
        },

        inputFocused: {
            borderColor: colors.primary,
        },
    });