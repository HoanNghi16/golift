import { Ionicons } from "@expo/vector-icons";
import { useColor } from "@/providers/colorProvider";
import { radius, spacing, typography } from "@/constants/design";
import { useResponsiveLayout } from "@/hooks/use-responsive-layout";
import { StyleSheet, Text, View } from "react-native";

export default function TestTabBar(){
    const { colors } = useColor();
    const { scale } = useResponsiveLayout();
    const styles = StyleSheet.create({
        container: { flexDirection: "row", alignItems: "center", backgroundColor: colors.surface, borderRadius: radius.xl, padding: spacing.xs * scale },
        item: { flex: 1, minHeight: 48 * scale, alignItems: "center", justifyContent: "center", gap: spacing.xxs },
        label: { color: colors.textSecondary, fontSize: typography.caption },
    });
    return (
        <View style={styles.container}>
            <View style={styles.item}>
                <Ionicons name="home-outline" color={colors.textSecondary} size={20}/>
                <Text style={styles.label}>Trang chủ</Text>
            </View>
            <View style={styles.item}>
                <Ionicons name="calendar-outline" color={colors.textSecondary} size={20}/>
                <Text style={styles.label}>Lịch tập</Text>
            </View>
        </View>
    )
}
