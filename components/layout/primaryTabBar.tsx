import { useColor } from "@/providers/colorProvider";
import { colorType } from "@/types/color";
import { layout, radius, spacing, typography } from "@/constants/design";
import { useResponsiveLayout } from "@/hooks/use-responsive-layout";
import { Ionicons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type TabItemProps = {
    key: string
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    active: boolean;
    onPress: () => void;
    colors: colorType;
};

const TABS = [
    { key: "home", icon: "home-outline" as const, activeIcon: "home" as const, label: "Trang chủ", route: "/" },
    { key: "schedule", icon: "calendar-outline" as const, activeIcon: "calendar" as const, label: "Lịch tập", route: "/schedule" },
    { key: "progress", icon: "stats-chart-outline" as const, activeIcon: "stats-chart" as const, label: "Tiến độ", route: "/progress" },
    { key: "profile", icon: "person-outline" as const, activeIcon: "person" as const, label: "Hồ sơ", route: "/profile" },
];

export default function PrimaryTabBar() {
    const { colors } = useColor();
    const insets = useSafeAreaInsets();
    const { scale, contentWidth } = useResponsiveLayout();
    const tabWidth = Math.min(contentWidth * 0.9, 430);
    const sideOffset = (contentWidth - tabWidth) / 2;
    const styles = createStyles(colors, insets.bottom, scale, tabWidth, sideOffset);
    const pathname = usePathname();
    const router = useRouter();

    const TabItem = ({ key, icon, activeIcon, label, active, onPress }: Omit<TabItemProps, "colors"> & { activeIcon: keyof typeof Ionicons.glyphMap }) => {
        const anim = useRef(new Animated.Value(active ? 1 : 0)).current;

        useEffect(() => {
            Animated.timing(anim, {
                toValue: active ? 1 : 0,
                duration: 180,
                useNativeDriver: false, // cần false vì animate màu (color), không phải transform
            }).start();
        }, [active]);

        const color = anim.interpolate({
            inputRange: [0, 1],
            outputRange: [colors.textSecondary, colors.primary],
        });

        return (
            <Pressable key={key} style={styles.tabItem} onPress={onPress} hitSlop={8}>
                <Ionicons name={active ? activeIcon : icon} size={22} color={active ? colors.primary : colors.textSecondary} />

                <Animated.Text style={[styles.tabLabel, { color }, active && { fontWeight: "700" }]}>
                    {label}
                </Animated.Text>
            </Pressable>
        );
    };

    return (
            <View style={styles.tabContainer}>
                <TabItem
                    {...TABS[0]}
                    active={pathname === TABS[0].route}
                    onPress={() => {if(pathname !== TABS[0].route ) router.push(TABS[0].route as any)}}
                />
                <TabItem
                    {...TABS[1]}
                    active={pathname === TABS[1].route}
                    onPress={() => {if (pathname !== TABS[1].route)router.push(TABS[1].route as any)}}
                />

                {/* Center Check-in */}
                <View style={styles.checkInWrapper}>
                    <Pressable
                        style={styles.checkInButton}
                        onPress={() => {
                            router.push("/checkin");
                        }}
                    >
                        <Ionicons name="scan-outline" size={28} color={colors.onPrimary} />
                    </Pressable>

                    <Text style={styles.checkInLabel}>Check-in</Text>
                </View>

                <TabItem
                    {...TABS[2]}
                    active={pathname === TABS[2].route}
                    onPress={() => {if (pathname !== TABS[2].route)router.push(TABS[2].route as any)}}
                />
                <TabItem
                    {...TABS[3]}
                    active={pathname === TABS[3].route}
                    onPress={() => {if (pathname !== TABS[3].route)router.push(TABS[3].route as any)}}
                />
            </View>
    );
}

const createStyles = (colors: colorType, bottomInset: number, scale: number, tabWidth: number, sideOffset: number) =>
    StyleSheet.create({
        tabContainer: {
            flexDirection: "row",
            alignItems: "center",
            position: "absolute",
            bottom: bottomInset + layout.tabBarBottomSpacing * scale,
            left: sideOffset,
            width: tabWidth,
            borderRadius: radius.pill,

            height: layout.tabBarHeight * scale,

            backgroundColor: colors.surfaceElevated,

            paddingHorizontal: spacing.xs * scale,
            paddingTop: spacing.xs * scale,
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: colors.border,
            elevation: 12,
            shadowColor: colors.overlay,
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.22,
            shadowRadius: 16,
        },

        tabItem: {
            flex: 1,

            alignItems: "center",
            justifyContent: "center",

            gap: spacing.xxs,
        },

        tabLabel: {
            fontSize: typography.caption,
            fontWeight: "500",
        },

        checkInWrapper: {
            flex: 1,
            alignItems: "center",
            marginTop: -32 * scale,
        },

        checkInButton: {
            width: 64 * scale,
            height: 64 * scale,
            borderRadius: 32 * scale,

            backgroundColor: colors.primary,

            alignItems: "center",
            justifyContent: "center",

            borderWidth: 5,
            borderColor: colors.background,

            elevation: 6,
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.2,
            shadowRadius: 5,
        },

        checkInLabel: {
            marginTop: spacing.xxs,
            fontSize: typography.caption,
            fontWeight: "600",
            color: colors.textPrimary,
        },
    });
