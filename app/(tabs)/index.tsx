import { useColor } from "@/providers/colorProvider";
import { useTitle } from "@/providers/titleProvider";
import { colorType } from "@/types/color";
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
    const styles = createStyles(colors);
    const [viewCheckin, setViewCheckin] = useState<boolean>(false);
    const timerRef = useRef<number | null>(null);
    const [selectedCheckinDay, setSelectedCheckinDay] = useState<number | null>(null);
    const [pressedIndex, setPressedIndex] = useState<number | null>(null);

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

    const monthKey = `${viewedDate.getFullYear()}-${viewedDate.getMonth() + 1}`;
    const checkedInDays = checkedInDaysByMonth[monthKey] ?? [];

    const monthCells = useMemo(() => getMonthCells(viewedDate), [viewedDate]);

    const today = new Date();
    const isCurrentMonth =
        viewedDate.getFullYear() === today.getFullYear() &&
        viewedDate.getMonth() === today.getMonth();

    const monthTitle = viewedDate.toLocaleDateString("vi-VN", {
        month: "long",
        year: "numeric",
    });

    const goPrevMonth = () => setMonthOffset((prev) => prev - 1);
    const goNextMonth = () => setMonthOffset((prev) => prev + 1);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={colors.background} />

            <View style={styles.content}>
                {/* Thông báo lịch tập mỗi ngày */}
                <View style={styles.hero}>
                    <Text style={styles.subtitle}>Lịch của bạn hôm nay</Text>
                    <Text style={styles.workoutName}>{todayWorkout.name}</Text>

                    <TouchableOpacity style={styles.startButton} activeOpacity={0.8}>
                        <Text style={styles.startButtonText}>Bắt đầu tập</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.contentBody} contentContainerStyle={styles.contentBodyInner}>

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
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={styles.gridRow}>
                                {monthCells.map((cell, index) => {
                                    if (cell === null) {
                                        return <View key={index} style={styles.dayCell} />;
                                    }

                                    const isToday = isCurrentMonth && cell === today.getDate();
                                    const isCheckedIn = checkedInDays.includes(cell);

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
                                                    isCheckedIn && {...styles.dayCircleChecked, backgroundImage: require("@/assets/images/GoLift_logo.png")},
                                                    !isCheckedIn && styles.dayCircleUnchecked,
                                                    isToday && styles.dayCircleToday,
                                                    pressedIndex === index && styles.dayCirclePressed,
                                                ]}
                                            >
                                                <View
                                                    style={isCheckedIn && { backgroundColor: "#000000af", width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}
                                                    >
                                                    <Text
                                                        style={[
                                                            styles.dayNumber,
                                                            isCheckedIn && styles.dayNumberChecked,
                                                            isToday && styles.dayNumberToday,
                                                        ]}
                                                    >
                                                        {cell}
                                                    </Text>
                                                </View>
                                            </ImageBackground>
                                        </Pressable>
                                    );
                                })}
                            </View>
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

const createStyles = (colors: colorType) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
        },

        content: {
            flex: 1,
        },

        hero: {
            padding: 16,
            paddingInline: 16,
            marginInline: "3%",
            borderRadius: 20,
            minHeight: "15%",
            alignItems: "flex-start",
            justifyContent: "center",
            backgroundColor: colors.primary,
            gap: 6,
        },

        subtitle: {
            color: colors.textPrimary,
            fontSize: 14,
            opacity: 0.85,
        },

        workoutName: {
            color: colors.textPrimary,
            fontSize: 20,
            fontWeight: "700",
            marginBottom: 8,
        },
        dayCirclePressed: {
            opacity: 0.6,
            transform: [{ scale: 0.92 }],
        },

        startButton: {
            backgroundColor: colors.surface,
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 30,
            alignSelf: "flex-start",
        },

        startButtonText: {
            color: colors.textSecondary,
            fontSize: 13,
            fontWeight: "600",
        },

        contentBody: {
            backgroundColor: colors.surface,
            marginTop: 10,
            borderTopRightRadius: 40,
            borderTopLeftRadius: 40,
            flex: 1,
        },

        contentBodyInner: {
            padding: 20,
            gap: 12,
        },

        sectionTitle: {
            color: colors.textPrimary,
            fontSize: 17,
            fontWeight: "700",
            marginBottom: 8,
        },

        exerciseRow: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 12,
            paddingHorizontal: 14,
            backgroundColor: colors.background,
            borderRadius: 14,
        },

        exerciseName: {
            color: colors.textPrimary,
            fontSize: 15,
            fontWeight: "500",
        },

        exerciseSets: {
            color: colors.textSecondary,
            fontSize: 14,
        },

        // ----- Lịch tháng -----
        calenderView: {
            marginBottom: 10,
            backgroundColor: colors.primary,
            paddingVertical: 16,
            paddingHorizontal: 12,
            borderRadius: 28,
            gap: 10,
        },

        monthHeader: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 4,
        },

        monthNavButton: {
            width: 32,
            height: 32,
            borderRadius: 16,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(255,255,255,0.12)",
        },

        monthNavText: {
            color: colors.textPrimary,
            fontSize: 18,
            fontWeight: "700",
            lineHeight: 20,
        },

        monthTitle: {
            color: colors.textPrimary,
            fontSize: 16,
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
            color: colors.textPrimary,
            opacity: 0.7,
            fontSize: 12,
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
            paddingVertical: 4,
        },

        dayCircle: {
            width: 32,
            height: 32,
            borderRadius: 16,
            alignItems: "center",
            justifyContent: "center",
        },

        dayCircleChecked: {
            backgroundColor: colors.surface,
            borderRadius: '100%',
            overflow: 'hidden',
        },

        dayCircleUnchecked: {
            backgroundColor: "rgba(255,255,255,0.12)",
        },

        dayCircleToday: {
            borderWidth: 2,
            borderColor: colors.background,
        },

        dayNumber: {
            color: colors.textPrimary,
            fontSize: 13,
            fontWeight: "600",
        },

        dayNumberChecked: {
            color: "#fff",
        },

        dayNumberToday: {
            fontWeight: "800",
        },

        legendRow: {
            flexDirection: "row",
            justifyContent: "center",
            gap: 20,
            marginTop: 8,
        },

        legendItem: {
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
        },

        legendDot: {
            width: 10,
            height: 10,
            borderRadius: 5,
        },

        legendText: {
            color: colors.textPrimary,
            fontSize: 12,
            opacity: 0.85,
        },

        modalOverlay: {
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            alignItems: "center",
            justifyContent: "center",
        },

        modalBox: {
            width: "80%",
            backgroundColor: colors.surface,
            borderRadius: 24,
            padding: 20,
            alignItems: "center",
            gap: 8,
        },

        closeButton: {
            position: "absolute",
            top: 10,
            right: 10,
            width: 26,
            height: 26,
            borderRadius: 13,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.background,
            zIndex: 1,
        },

        closeButtonText: {
            color: colors.textPrimary,
            fontSize: 13,
            fontWeight: "700",
        },

        modalImage: {
            width: "90%",
            height: "auto",
            aspectRatio: 1,
            marginTop: 20,
            borderRadius: 20,
            marginBottom: 4,
        },

        modalTitle: {
            color: colors.textPrimary,
            fontSize: 15,
            fontWeight: "700",
            textAlign: "center",
        },

        modalSubtitle: {
            color: colors.textSecondary,
            fontSize: 12,
            textAlign: "center",
            marginBottom: 6,
        },

        confirmButton: {
            backgroundColor: colors.primary,
            paddingVertical: 8,
            paddingHorizontal: 24,
            borderRadius: 20,
            marginTop: 4,
        },

        confirmButtonText: {
            color: colors.textPrimary,
            fontSize: 13,
            fontWeight: "600",
        },
    });