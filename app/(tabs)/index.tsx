import { useColor } from "@/providers/colorProvider";
import { useTitle } from "@/providers/titleProvider";
import { colorType } from "@/types/color";
import { getTabBarContentInset, radius, spacing, typography } from "@/constants/design";
import { useResponsiveLayout } from "@/hooks/use-responsive-layout";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useMemo, useRef, useState } from "react";
import {
    Image,
    ImageBackground,
    Modal,
    Pressable,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function HomeScreen() {
    const { setHeaderTitle } = useTitle()
    const { colors } = useColor();
    const { scale } = useResponsiveLayout();
    const insets = useSafeAreaInsets();
    const styles = createStyles(colors, scale);
    const [viewCheckin, setViewCheckin] = useState<boolean>(false);
    const timerRef = useRef<number | null>(null);
    const [selectedCheckinDay, setSelectedCheckinDay] = useState<number | null>(null);
    const [pressedIndex, setPressedIndex] = useState<number | null>(null);
    const monthScrollRef = useRef<ScrollView>(null);
    const [monthPageWidth, setMonthPageWidth] = useState(0);
    const isResettingMonthScroll = useRef(false);

    setHeaderTitle("Tổng quan")

    const clearPressTimer = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
        setPressedIndex(null);
    };

    // Dữ liệu mẫu — sau này thay bằng data thật từ API/store
    const todayWorkout = {
        name: "Ngày 3 - Đẩy (Chest & Triceps)",
        exercises: [
            { id: 1, name: "Bench Press", sets: "4x8" },
            { id: 2, name: "Incline Dumbbell Press", sets: "3x10" },
            { id: 3, name: "Cable Fly", sets: "3x12" },
            { id: 4, name: "Tricep Pushdown", sets: "3x15" },
        ],
    };

    const dayLabels = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

    // Dữ liệu mẫu ngày đã checkin, gom theo "YYYY-MM" — sau này thay bằng data thật từ API
    const checkedInDaysByMonth: Record<string, number[]> = {
        "2026-9": [1, 2, 4, 5, 8, 9, 12, 15, 16],
        "2026-8": [3, 6, 7, 10, 20, 21],
    };

    // offset = 0 -> tháng hiện tại, -1 -> tháng trước, +1 -> tháng sau...
    const [monthOffset, setMonthOffset] = useState(0);

    const viewedDate = useMemo(() => {
        const d = new Date();
        d.setDate(1); // tránh lỗi lệch ngày khi cộng/trừ tháng
        d.setMonth(d.getMonth() + monthOffset);
        return d;
    }, [monthOffset]);

    const monthOffsets = [-1, 0, 1];

    const renderMonthGrid = (offset: number) => {
        const pageDate = new Date(viewedDate.getFullYear(), viewedDate.getMonth() + offset, 1);
        const pageCells = getMonthCells(pageDate);
        const pageMonthKey = `${pageDate.getFullYear()}-${pageDate.getMonth() + 1}`;
        const pageCheckedInDays = checkedInDaysByMonth[pageMonthKey] ?? [];
        const pageIsCurrentMonth = pageDate.getFullYear() === today.getFullYear() && pageDate.getMonth() === today.getMonth();

        return (
            <View key={offset} style={[styles.gridRow, { width: monthPageWidth || "100%" }]}>
                {pageCells.map((cell, index) => {
                    if (cell === null) return <View key={index} style={styles.dayCell} />;

                    const isToday = pageIsCurrentMonth && cell === today.getDate();
                    const isCheckedIn = pageCheckedInDays.includes(cell);
                    return (
                        <Pressable
                            key={index}
                            style={styles.dayCell}
                            onTouchStart={() => {
                                if (!isCheckedIn) return;
                                setPressedIndex(index);
                                timerRef.current = setTimeout(() => {
                                    setSelectedCheckinDay(cell);
                                    setViewCheckin(true);
                                    setPressedIndex(null);
                                }, 500);
                            }}
                            onTouchEnd={clearPressTimer}
                            onTouchCancel={clearPressTimer}
                        >
                            <ImageBackground
                                source={isCheckedIn ? require("@/assets/images/GoLift_logo.png") : undefined}
                                style={[
                                    styles.dayCircle,
                                    isCheckedIn && styles.dayCircleChecked,
                                    !isCheckedIn && styles.dayCircleUnchecked,
                                    isToday && styles.dayCircleToday,
                                    pressedIndex === index && styles.dayCirclePressed,
                                ]}
                            >
                                <View style={isCheckedIn ? styles.checkedInOverlay : undefined}>
                                    <Text style={[
                                        styles.dayNumber,
                                        isCheckedIn && styles.dayNumberChecked,
                                        isToday && styles.dayNumberToday,
                                    ]}>{cell}</Text>
                                </View>
                            </ImageBackground>
                        </Pressable>
                    );
                })}
            </View>
        );
    };

    const handleMonthScroll = (event: any) => {
        if (isResettingMonthScroll.current || !monthPageWidth) return;
        const page = Math.round(event.nativeEvent.contentOffset.x / monthPageWidth);
        if (page === 1) return;

        isResettingMonthScroll.current = true;
        setMonthOffset((current) => current + (page === 0 ? -1 : 1));
        requestAnimationFrame(() => {
            monthScrollRef.current?.scrollTo({ x: monthPageWidth, animated: false });
            requestAnimationFrame(() => { isResettingMonthScroll.current = false; });
        });
    };

    const today = new Date();
    const monthTitle = viewedDate.toLocaleDateString("vi-VN", {
        month: "long",
        year: "numeric",
    });

    const goPrevMonth = () => setMonthOffset((prev) => prev - 1);
    const goNextMonth = () => setMonthOffset((prev) => prev + 1);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="default" backgroundColor={colors.background} />

            <View style={styles.content}>
                {/* Thông báo lịch tập mỗi ngày */}
                <View style={styles.hero}>
                    <Text style={styles.subtitle}>Lịch của bạn hôm nay</Text>
                    <Text style={styles.workoutName}>{todayWorkout.name}</Text>

                    <TouchableOpacity style={styles.startButton} activeOpacity={0.8}>
                        <Text style={styles.startButtonText}>Bắt đầu tập</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView
                    style={styles.contentBody}
                    contentContainerStyle={[styles.contentBodyInner, { paddingBottom: getTabBarContentInset(scale, insets.bottom) }]}
                >

                    {/* Lịch tháng */}
                    <View style={styles.calenderView}>
                        {/* Header điều hướng tháng */}
                        <View style={styles.monthHeader}>
            <TouchableOpacity
                                onPress={goPrevMonth}
                                activeOpacity={0.7}
                                style={styles.monthNavButton}
                                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                            >
                                <Text style={styles.monthNavText}>‹</Text>
                            </TouchableOpacity>

                            <Text style={styles.monthTitle}>{monthTitle}</Text>

                            <TouchableOpacity
                                onPress={goNextMonth}
                                activeOpacity={0.7}
                                style={styles.monthNavButton}
                                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                            >
                                <Text style={styles.monthNavText}>›</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Hàng thứ trong tuần */}
                        <View style={styles.weekRow}>
                            {dayLabels.map((d, i) => (
                                <Text key={i} style={styles.weekLabel}>
                                    {d}
                                </Text>
                            ))}
                        </View>
                        {/* Lưới ngày */}
                        <ScrollView
                            ref={monthScrollRef}
                            horizontal
                            pagingEnabled
                            showsHorizontalScrollIndicator={false}
                            onLayout={(event) => {
                                const width = event.nativeEvent.layout.width;
                                if (width && width !== monthPageWidth) {
                                    setMonthPageWidth(width);
                                    requestAnimationFrame(() => monthScrollRef.current?.scrollTo({ x: width, animated: false }));
                                }
                            }}
                            onMomentumScrollEnd={handleMonthScroll}
                        >
                            {monthOffsets.map(renderMonthGrid)}
                        </ScrollView>

                        {/* Chú thích */}
                        <View style={styles.legendRow}>
                            <View style={styles.legendItem}>
                                <View style={[styles.legendDot, styles.dayCircleChecked]} />
                                <Text style={styles.legendText}>Đã tập</Text>
                            </View>
                            <View style={styles.legendItem}>
                                <View style={[styles.legendDot, styles.dayCircleUnchecked]} />
                                <Text style={styles.legendText}>Chưa tập</Text>
                            </View>
                        </View>
                    </View>

                    {/* Danh sách bài tập */}
                    {/* <Text style={styles.sectionTitle}>Bài tập hôm nay</Text>
                    {todayWorkout.exercises.map((ex) => (
                        <View key={ex.id} style={styles.exerciseRow}>
                            <Text style={styles.exerciseName}>{ex.name}</Text>
                            <Text style={styles.exerciseSets}>{ex.sets}</Text>
                        </View>
                    ))} */}
                </ScrollView>
            </View>
            <Modal
                visible={viewCheckin}
                transparent
                animationType="fade"
                onRequestClose={() => setViewCheckin(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalBox}>
                        <TouchableOpacity
                            style={styles.closeButton}
                            activeOpacity={0.7}
                            onPress={() => setViewCheckin(false)}
                            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                        >
                            <Text style={styles.closeButtonText}>✕</Text>
                        </TouchableOpacity>

                        <Image
                            source={require("@/assets/images/GoLift_logo.png")}
                            style={styles.modalImage}
                            resizeMode="contain"
                        />

                        <Text style={styles.modalTitle}>Ảnh checkin ngày 10/03/2026</Text>
                        <Text style={styles.modalSubtitle}>Bạn</Text>

                        <TouchableOpacity
                            style={styles.confirmButton}
                            activeOpacity={0.8}
                            onPress={() => setViewCheckin(false)}
                        >
                            <Text style={styles.confirmButtonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

// Trả về mảng ô cho lịch của tháng ứng với `viewedDate`
function getMonthCells(viewedDate: Date): (number | null)[] {
    const year = viewedDate.getFullYear();
    const month = viewedDate.getMonth(); // 0-indexed

    const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 = CN
    const totalDays = new Date(year, month + 1, 0).getDate(); // số ngày trong tháng

    const cells: (number | null)[] = [];

    // Ô trống trước ngày 1
    for (let i = 0; i < firstDayOfMonth; i++) {
        cells.push(null);
    }

    // Các ngày trong tháng
    for (let d = 1; d <= totalDays; d++) {
        cells.push(d);
    }

    return cells;
}

const createStyles = (colors: colorType, scale: number) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
        },

        content: {
            flex: 1,
        },

        hero: {
            padding: spacing.md * scale,
            marginHorizontal: spacing.xs * scale,
            borderRadius: radius.xl,
            minHeight: "15%",
            alignItems: "flex-start",
            justifyContent: "center",
            backgroundColor: colors.primary,
            gap: spacing.xs,
        },

        subtitle: {
            color: colors.onPrimary,
            fontSize: typography.footnote,
            opacity: 0.85,
        },

        workoutName: {
            color: colors.onPrimary,
            fontSize: typography.title,
            fontWeight: "700",
            marginBottom: spacing.xs,
        },
        dayCirclePressed: {
            opacity: 0.6,
            transform: [{ scale: 0.92 }],
        },

        startButton: {
            backgroundColor: colors.surface,
            paddingVertical: spacing.xs,
            paddingHorizontal: spacing.md,
            borderRadius: radius.pill,
            alignSelf: "flex-start",
        },

        startButtonText: {
            color: colors.onSurface,
            fontSize: typography.caption,
            fontWeight: "600",
        },

        contentBody: {
            backgroundColor: colors.surface,
            marginTop: spacing.xs,
            borderTopRightRadius: 40,
            borderTopLeftRadius: 40,
            flex: 1,
        },

        contentBodyInner: {
            padding: spacing.lg * scale,
            gap: spacing.sm,
        },

        sectionTitle: {
            color: colors.onSurface,
            fontSize: typography.bodyLarge,
            fontWeight: "700",
            marginBottom: spacing.xs,
        },

        exerciseRow: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: spacing.sm,
            paddingHorizontal: spacing.sm,
            backgroundColor: colors.background,
            borderRadius: radius.md,
        },

        exerciseName: {
            color: colors.onSurface,
            fontSize: typography.footnote,
            fontWeight: "500",
        },

        exerciseSets: {
            color: colors.onSurface,
            fontSize: typography.footnote,
        },

        // ----- Lịch tháng -----
        calenderView: {
            marginBottom: spacing.sm,
            backgroundColor: colors.primary,
            paddingVertical: spacing.md * scale,
            paddingHorizontal: spacing.sm * scale,
            borderRadius: radius.xl,
            gap: spacing.sm,
        },

        monthHeader: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: spacing.xxs,
        },

        monthNavButton: {
            width: 32 * scale,
            height: 32 * scale,
            borderRadius: 16 * scale,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.primarySoft,
        },

        monthNavText: {
            color: colors.onPrimary,
            fontSize: typography.bodyLarge,
            fontWeight: "700",
            lineHeight: 20,
        },

        monthTitle: {
            color: colors.onPrimary,
            fontSize: typography.body,
            fontWeight: "700",
            textAlign: "center",
            textTransform: "capitalize",
        },

        weekRow: {
            flexDirection: "row",
            justifyContent: "space-between",
        },

        weekLabel: {
            width: `${100 / 7}%`,
            textAlign: "center",
            color: colors.onPrimary,
            opacity: 0.7,
            fontSize: typography.caption,
            fontWeight: "600",
        },

        gridRow: {
            maxWidth: "100%",
            flexDirection: "row",
            flexWrap: "wrap",
        },

        dayCell: {
            width: `${100 / 7}%`,
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: spacing.xxs,
        },

        dayCircle: {
            width: 32 * scale,
            height: 32 * scale,
            borderRadius: 16 * scale,
            alignItems: "center",
            justifyContent: "center",
        },

        dayCircleChecked: {
            backgroundColor: colors.surface,
            borderRadius: 16 * scale,
            overflow: 'hidden',
        },

        dayCircleUnchecked: {
            backgroundColor: colors.primarySoft,
        },

        dayCircleToday: {
            borderWidth: 2,
            borderColor: colors.background,
        },

        dayNumber: {
            color: colors.onPrimary,
            fontSize: typography.caption,
            fontWeight: "600",
        },

        dayNumberChecked: {
            color: colors.onPrimary,
        },

        checkedInOverlay: {
            backgroundColor: colors.overlay,
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
        },

        dayNumberToday: {
            fontWeight: "800",
        },

        legendRow: {
            flexDirection: "row",
            justifyContent: "center",
            gap: spacing.lg,
            marginTop: spacing.xs,
        },

        legendItem: {
            flexDirection: "row",
            alignItems: "center",
            gap: spacing.xs,
        },

        legendDot: {
            width: 10 * scale,
            height: 10 * scale,
            borderRadius: 5 * scale,
        },

        legendText: {
            color: colors.onPrimary,
            fontSize: typography.caption,
            opacity: 0.85,
        },

        modalOverlay: {
            flex: 1,
            backgroundColor: colors.overlay,
            alignItems: "center",
            justifyContent: "center",
        },

        modalBox: {
            width: "80%",
            backgroundColor: colors.surface,
            borderRadius: radius.xl,
            padding: spacing.lg,
            alignItems: "center",
            gap: spacing.xs,
        },

        closeButton: {
            position: "absolute",
            top: 10,
            right: 10,
            width: 26 * scale,
            height: 26 * scale,
            borderRadius: 13 * scale,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.background,
            zIndex: 1,
        },

        closeButtonText: {
            color: colors.textPrimary,
            fontSize: typography.caption,
            fontWeight: "700",
        },

        modalImage: {
            width: "90%",
            height: "auto",
            aspectRatio: 1,
            marginTop: spacing.lg,
            borderRadius: radius.xl,
            marginBottom: spacing.xxs,
        },

        modalTitle: {
            color: colors.onSurface,
            fontSize: typography.footnote,
            fontWeight: "700",
            textAlign: "center",
        },

        modalSubtitle: {
            color: colors.onSurface,
            fontSize: typography.caption,
            textAlign: "center",
            marginBottom: spacing.xs,
        },

        confirmButton: {
            backgroundColor: colors.primary,
            paddingVertical: spacing.xs,
            paddingHorizontal: spacing.xl,
            borderRadius: radius.pill,
            marginTop: spacing.xxs,
        },

        confirmButtonText: {
            color: colors.onPrimary,
            fontSize: typography.caption,
            fontWeight: "600",
        },
    });
