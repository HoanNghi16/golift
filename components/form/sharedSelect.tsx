import { useColor } from "@/providers/colorProvider";
import { colorType } from "@/types/color";
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

    const styles = createStyles(colors);

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

const createStyles = (colors: colorType) =>
    StyleSheet.create({
        selectBox: {
            width: "100%",
            height: 52,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 16,

            backgroundColor: colors.background,
            borderWidth: 1,
            borderColor: colors.primary,

            borderRadius: 14,
        },

        selectBoxPressed: {
            opacity: 0.8,
        },

        selectText: {
            fontSize: 16,
            color: colors.textPrimary,
        },

        arrow: {
            fontSize: 20,
            color: colors.textSecondary,
            marginTop: -5,
        },

        overlay: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",

            backgroundColor: "#00000080",
        },

        modalBody: {
            width: "82%",
            maxHeight: "65%",

            backgroundColor: colors.surface,

            borderRadius: 24,
            paddingTop: 20,
            paddingBottom: 10,
            overflow: "hidden",
            elevation: 10,
        },

        modalTitle: {
            fontSize: 20,
            fontWeight: "700",

            color: colors.textPrimary,

            textAlign: "center",
            marginBottom: 12,
        },

        list: {
            paddingHorizontal: 12,
            paddingBottom: 8,
        },

        item: {
            minHeight: 50,
            justifyContent: "center",
            alignItems: "center",

            paddingHorizontal: 16,
            paddingVertical: 12,
            borderRadius: 12,
        },

        itemPressed: {
            backgroundColor: colors.primary,
        },

        itemText: {
            fontSize: 16,
            color: colors.textPrimary,
        },
    });