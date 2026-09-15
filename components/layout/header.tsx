import { useColor } from "@/providers/colorProvider";
import { useTitle } from "@/providers/titleProvider";
import { colorType } from "@/types/color";
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

    const onSelect = (theme: string)=>{
        setSelectedTheme?.(theme)
    }

    const styles = createStyles(colors);

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

const createStyles = (colors: colorType) =>
    StyleSheet.create({
        mainHeader: {
            display: "flex",
            gap: 4,
            padding: 10,
            alignItems: "center",
            flexDirection: "row",
            top: 0,
            height: 60,

            backgroundColor: colors.background,

            borderBottomWidth: 1,
            borderBottomColor: colors.background,
        },
        themeChangeButton:{
            marginRight: 10,
            justifyContent: 'center',
        },
        mainHeaderTitle: {
            flex: 1,
            color: colors.textPrimary,
            fontSize: 18,
            marginLeft: 8,
            fontWeight: "bold",
        },

        // =========================
        // ONBOARD
        // =========================
        onboardHeader: {
            gap: 8,
            padding: 15,
            alignItems: "center",
            flexDirection: "row",

            top: 0,
            height: 80,
        },

        onboardHeaderTitle: {
            color: colors.textPrimary,
            fontSize: 18,
            fontWeight: "bold",
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