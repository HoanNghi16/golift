import { useColor } from "@/providers/colorProvider";
import { colorType } from "@/types/color";
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

    const styles = createStyles(colors);

    return (
        <Pressable
            onPress={onPress}
            style={[
                styles.button, isPrimaryBackground ? styles.primary : styles.dark ,
            ]}
        >
            <Text style={styles.text}>
                {title}
            </Text>
        </Pressable>
    );
}

const createStyles = (colors: colorType) =>
    StyleSheet.create({
        button: {
            padding: 10,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
        },

        dark: {
            backgroundColor: colors.primary,
        },
        primary: {
            backgroundColor: colors.background,
        },
        text: {
            fontSize: 18,
            fontWeight: "bold",
            color: colors.textPrimary,
        },
    });