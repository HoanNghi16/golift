import { useColor } from "@/providers/colorProvider";
import { useTitle } from "@/providers/titleProvider";
import { colorType } from "@/types/color";
import { radius, spacing, typography } from "@/constants/design";
import { useResponsiveLayout } from "@/hooks/use-responsive-layout";
import { Palette } from "lucide-react-native";
import { useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import GoLiftText from "../ui/GoLiftText";

export default function PrimaryHeader({
    variant = "onboard",
}: {
    variant: "onboard" | "main";
}) {
    const [open, setOpen] = useState(false);
    const { colors, setSelectedTheme } = useColor();
    const {headerTitle} = useTitle()
    const { scale } = useResponsiveLayout();

    const onSelect = (theme: string)=>{
        setSelectedTheme?.(theme)
    }

    const styles = createStyles(colors, scale);

    return (
        <View
            style={
                variant === "main"
                    ? styles.mainHeader
                    : styles.onboardHeader
            }
        >
            <GoLiftText
                fontSize={22}
                backgroundShown
            />

            <Text
                style={
                    variant === "main"
                        ? styles.mainHeaderTitle
                        : styles.onboardHeaderTitle
                }
            >
                {headerTitle}
            </Text>
            {
                variant==="main" &&
                <Pressable onPress={()=>setOpen(o => !o)} style={styles.themeChangeButton}>
                    <Palette size={25} color={colors.primary}/>
                </Pressable>
            }
            {open && 
                <Modal
                    visible={open}
                    transparent
                    animationType="fade"
                    onRequestClose={() => setOpen(false)}
                >
                    <Pressable
                        style={styles.overlay}
                        onPress={() => setOpen(false)}
                    >
                        {/* Prevent modal body from closing */}
                        <Pressable style={styles.modalBody}>
                            <Text style={styles.modalTitle}>
                                Chọn theme
                            </Text>
    
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={styles.list}
                            >
                                <Pressable
                                        key={"keenTan"}
                                        style={({ pressed }) => [
                                            styles.item,
                                            pressed && styles.itemPressed,
                                        ]}
                                        onPress={() => {
                                            onSelect("keenTan");
                                            setOpen(false);
                                        }}
                                    >
                                        <Text style={styles.itemText}>
                                            {"KeenTan"}
                                        </Text>
                                </Pressable>
                                <Pressable
                                        key={"meanCheat"}
                                        style={({ pressed }) => [
                                            styles.item,
                                            pressed && styles.itemPressed,
                                        ]}
                                        onPress={() => {
                                            onSelect("meanCheat");
                                            setOpen(false);
                                        }}
                                    >
                                        <Text style={styles.itemText}>
                                            MeanCheat
                                        </Text>
                                </Pressable>
                                <Pressable
                                        key={"default"}
                                        style={({ pressed }) => [
                                            styles.item,
                                            pressed && styles.itemPressed,
                                        ]}
                                        onPress={() => {
                                            onSelect("default");
                                            setOpen(false);
                                        }}
                                    >
                                        <Text style={styles.itemText}>
                                            Mặc định
                                        </Text>
                                </Pressable>
                            </ScrollView>
                        </Pressable>
                    </Pressable>
                </Modal>
            }
        </View>
    );
}

const createStyles = (colors: colorType, scale: number) =>
    StyleSheet.create({
        mainHeader: {
            display: "flex",
            gap: spacing.xxs,
            padding: spacing.sm * scale,
            alignItems: "center",
            flexDirection: "row",
            top: 0,
            minHeight: 56 * scale,

            backgroundColor: colors.background,

        },
        themeChangeButton:{
            marginRight: spacing.xs,
            justifyContent: 'center',
        },
        mainHeaderTitle: {
            flex: 1,
            color: colors.textPrimary,
            fontSize: typography.bodyLarge,
            marginLeft: spacing.xs,
            fontWeight: "bold",
        },

        // =========================
        // ONBOARD
        // =========================
        onboardHeader: {
            gap: spacing.xs,
            padding: spacing.md * scale,
            alignItems: "center",
            flexDirection: "row",

            top: 0,
            minHeight: 72 * scale,
        },

        onboardHeaderTitle: {
            color: colors.textPrimary,
            fontSize: typography.bodyLarge,
            fontWeight: "bold",
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
            minHeight: 50,
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
