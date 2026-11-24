import SharedButton from "@/components/form/sharedButton";
import { useColor } from "@/providers/colorProvider";
import { useTitle } from "@/providers/titleProvider";
import { colorType } from "@/types/color";
import { getTabBarContentInset, radius, spacing, typography } from "@/constants/design";
import { useResponsiveLayout } from "@/hooks/use-responsive-layout";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
    const { scale } = useResponsiveLayout();
    const insets = useSafeAreaInsets();
    const styles = createStyleSheet(colors, scale);
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
            <ScrollView
                style={styles.mainContent}
                contentContainerStyle={[styles.mainContentInner, { paddingBottom: getTabBarContentInset(scale, insets.bottom) }]}
            >
                {/* Nội dung lịch theo chế độ đang chọn */}
                <View style={styles.content}>
                    <Text style={styles.placeholder}>Hiển thị theo {viewMode === "cycle" ? "chu kỳ" : (viewMode === "week" ? "tuần" : "ngày")}</Text>
                </View>
                <Text style={styles.notFound}>Bạn chưa tạo lịch tập nào, hãy tạo một lịch tập</Text>
                {/* Nút thêm lịch tập mới */}
                <SharedButton onPress={()=>{
                    router.push("/(tabs)/schedule/createSchelude")
                }} title="Thay đổi lịch tập"/>
            </ScrollView>
        </View>
    );
}

const createStyleSheet = (colors: colorType, scale: number) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
        },
        header: {
            marginBottom: spacing.sm * scale,
        },
        headWrapper:{
            paddingHorizontal: spacing.md * scale,
        },
        title: {
            fontSize: typography.titleLarge,
            fontWeight: "700",
            color: colors.textPrimary,
        },
        tabBar: {
            flexDirection: "row",
            backgroundColor: colors.surface,
            borderRadius: radius.md,
            padding: spacing.xxs,
            marginBottom: spacing.md * scale,
        },
        tabItem: {
            flex: 1,
            paddingVertical: spacing.xs * scale,
            alignItems: "center",
            borderRadius: radius.md,
        },
        tabItemActive: {
            backgroundColor: colors.primary,
        },
        tabText: {
            fontSize: typography.footnote,
            fontWeight: "500",
            color: colors.onSurface,
        },
        tabTextActive: {
            color: colors.onPrimary,
            fontWeight: "700",
        },
        content: {
            flex: 1,
        },
        placeholder: {
            color: colors.onSurface,
            fontSize: typography.footnote,
        },
        notFound:{
            alignContent: "center",
            textAlign: "center",
            justifyContent: "center",
            flex: 1,
            color: colors.onSurface,
            fontSize: typography.body,
        }
        ,
        mainContent:{
            borderTopEndRadius: 30,
            borderTopStartRadius: 30,
            backgroundColor: colors.surface,
            flex: 1,
        },
        mainContentInner: {
            flexGrow: 1,
            padding: spacing.lg * scale,
        },
    });
