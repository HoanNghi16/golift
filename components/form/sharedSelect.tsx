import { useColor } from "@/providers/colorProvider";
import { colorType } from "@/types/color";
import { radius, spacing, typography } from "@/constants/design";
import { useResponsiveLayout } from "@/hooks/use-responsive-layout";
import { useState } from "react";
import {
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
} from "react-native";

export default function SharedSelect({
    placeholder = "",
    options = [],
    onSelect,
    selected,
}: {
    placeholder?: string;
    options: { name: string; value: string }[];
    onSelect: (selected: any) => void;
    selected: any;
}) {
    const [isOpen, setIsOpen] = useState(false);

    const { colors } = useColor();
    const { scale } = useResponsiveLayout();
    const styles = createStyles(colors, scale);

    const selectedOption = options.find(
        (option) => option.value === selected
    );

    return (
        <>
            {/* Select box */}
            <Pressable
                style={({ pressed }) => [
                    styles.selectBox,
                    pressed && styles.selectBoxPressed,
                ]}
                onPress={() => setIsOpen(true)}
            >
                <Text style={styles.selectText}>
                    {selectedOption
                        ? selectedOption.name
                        : `-- Chọn ${
                              placeholder !== ""
                                  ? placeholder
                                  : "nhiều giá trị"
                          } --`}
                </Text>

                <Text style={styles.arrow}>⌄</Text>
            </Pressable>

            {/* Modal */}
            <Modal
                visible={isOpen}
                transparent
                animationType="fade"
                onRequestClose={() => setIsOpen(false)}
            >
                <Pressable
                    style={styles.overlay}
                    onPress={() => setIsOpen(false)}
                >
                    {/* Prevent modal body from closing */}
                    <Pressable style={styles.modalBody}>
                        <Text style={styles.modalTitle}>
                            Chọn {placeholder || "giá trị"}
                        </Text>

                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={styles.list}
                        >
                            {options.map((option) => (
                                <Pressable
                                    key={option.value}
                                    style={({ pressed }) => [
                                        styles.item,
                                        pressed && styles.itemPressed,
                                    ]}
                                    onPress={() => {
                                        onSelect(option.value);
                                        setIsOpen(false);
                                    }}
                                >
                                    <Text style={styles.itemText}>
                                        {option.name}
                                    </Text>
                                </Pressable>
                            ))}
                        </ScrollView>
                    </Pressable>
                </Pressable>
            </Modal>
        </>
    );
}

const createStyles = (colors: colorType, scale: number) =>
    StyleSheet.create({
        selectBox: {
            width: "100%",
            minHeight: 48,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: spacing.md * scale,

            backgroundColor: colors.background,
            borderWidth: 1,
            borderColor: colors.border,

            borderRadius: radius.md,
        },

        selectBoxPressed: {
            opacity: 0.8,
        },

        selectText: {
            fontSize: typography.body,
            color: colors.textPrimary,
        },

        arrow: {
            fontSize: typography.title,
            color: colors.textSecondary,
            marginTop: -5,
        },

        overlay: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",

            backgroundColor: colors.overlay,
        },

        modalBody: {
            width: "82%",
            maxHeight: "65%",

            backgroundColor: colors.surfaceElevated,

            borderRadius: radius.xl,
            paddingTop: spacing.lg * scale,
            paddingBottom: spacing.xs * scale,
            overflow: "hidden",
            elevation: 10,
        },

        modalTitle: {
            fontSize: typography.title,
            fontWeight: "700",

            color: colors.onSurface,

            textAlign: "center",
            marginBottom: spacing.sm * scale,
        },

        list: {
            paddingHorizontal: spacing.sm * scale,
            paddingBottom: spacing.xs * scale,
        },

        item: {
            minHeight: 48 * scale,
            justifyContent: "center",
            alignItems: "center",

            paddingHorizontal: spacing.md * scale,
            paddingVertical: spacing.sm * scale,
            borderRadius: radius.md,
        },

        itemPressed: {
            opacity: 0.76,
        },

        itemText: {
            fontSize: typography.body,
            color: colors.onSurface,
        },
    });
