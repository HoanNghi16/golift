import SharedButton from "@/components/form/sharedButton";
import { useColor } from "@/providers/colorProvider";
import { useTitle } from "@/providers/titleProvider";
import { colorType } from "@/types/color";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type ViewMode = "cycle" | "week" | "day";

const VIEW_OPTIONS: { key: ViewMode; label: string }[] = [
    { key: "cycle", label: "Chu kỳ" },
    { key: "week", label: "Tuần" },
    { key: "day", label: "Ngày" },
];

export default function ScheduleScreen() {
    const { setHeaderTitle } = useTitle()
    setHeaderTitle("Lịch tập")
    const { colors } = useColor();
    const styles = createStyleSheet(colors);
    const [viewMode, setViewMode] = useState<ViewMode>("week");

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.headWrapper}>
                {/* Tab chọn chế độ xem */}
                <View style={styles.tabBar}>
                    {VIEW_OPTIONS.map((option) => {
                        const isActive = viewMode === option.key;
                        return (
                            <TouchableOpacity
                                key={option.key}
                                style={[styles.tabItem, isActive && styles.tabItemActive]}
                                onPress={() => setViewMode(option.key)}
                            >
                                <Text
                                    style={[
                                        styles.tabText,
                                        isActive && styles.tabTextActive,
                                    ]}
                                >
                                    {option.label}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>
            <View style={styles.mainContent}>
                {/* Nội dung lịch theo chế độ đang chọn */}
                <View style={styles.content}>
                    <Text style={styles.placeholder}>Hiển thị theo {viewMode === "cycle" ? "chu kỳ" : (viewMode === "week" ? "tuần" : "ngày")}</Text>
                </View>
                <Text style={styles.notFound}>Bạn chưa tạo lịch tập nào, hãy tạo một lịch tập</Text>
                {/* Nút thêm lịch tập mới */}
                <SharedButton onPress={()=>{
                    router.push("/(tabs)/schedule/createSchelude")
                }} title="Thay đổi lịch tập"/>
            </View>
        </View>
    );
}

const createStyleSheet = (colors: colorType) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
        },
        header: {
            marginBottom: 12,
        },
        headWrapper:{
            paddingHorizontal: 16,
        },
        title: {
            fontSize: 22,
            fontWeight: "700",
            color: colors.textPrimary,
        },
        tabBar: {
            flexDirection: "row",
            backgroundColor: colors.surface,
            borderRadius: 12,
            padding: 4,
            marginBottom: 16,
        },
        tabItem: {
            flex: 1,
            paddingVertical: 8,
            alignItems: "center",
            borderRadius: 10,
        },
        tabItemActive: {
            backgroundColor: colors.primary,
        },
        tabText: {
            fontSize: 14,
            fontWeight: "500",
            color: colors.primary,
        },
        tabTextActive: {
            color: colors.textPrimary,
            fontWeight: "700",
        },
        content: {
            flex: 1,
        },
        placeholder: {
            color: colors.textSecondary,
            fontSize: 14,
        },
        notFound:{
            alignContent: "center",
            textAlign: "center",
            justifyContent: "center",
            flex: 1,
            color: colors.textSecondary,
            fontSize: 16,
        }
        ,
        mainContent:{
            padding: 22,
            borderTopEndRadius: 30,
            borderTopStartRadius: 30,
            backgroundColor: colors.surface,
            flex: 1,
        }
    });