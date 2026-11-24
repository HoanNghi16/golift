import SharedButton from "@/components/form/sharedButton";
import SharedInput from "@/components/form/sharedInput";
import SharedSelect from "@/components/form/sharedSelect";
import PrimaryHeader from "@/components/layout/header";
import { useColor } from "@/providers/colorProvider";
import { useTitle } from "@/providers/titleProvider";
import { colorType } from "@/types/color";
import { spacing, typography } from "@/constants/design";
import { useResponsiveLayout } from "@/hooks/use-responsive-layout";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function StartProfile() {
    const [gender, setGender] = useState<
        "male" | "female" | "other" | null
    >(null);

    const { colors } = useColor();

    const { setHeaderTitle } = useTitle()

    useEffect(()=>{
        setHeaderTitle("Cấu hình hồ sơ")
    },[])
    

    const { scale } = useResponsiveLayout();
    const styles = createStyles(colors, scale);

    return (
        <View style={styles.startCont}>
            <PrimaryHeader
                variant="onboard"
            />

            <View style={styles.mainContent}>

                {/* Logo */}
                <Image
                    style={styles.logo}
                    source={require("@/assets/images/GoLift_logo.png")}
                />

                {/* Form */}
                <View style={styles.formView}>
                    <ScrollView
                        style={{ flex: 1 }}
                        contentContainerStyle={styles.formContent}
                        showsVerticalScrollIndicator={false}
                    >

                        {/* Nickname */}
                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputDescription}>
                                GoLift nên gọi bạn là gì?
                            </Text>

                            <SharedInput
                                placeholder="Tên hoặc biệt danh của bạn"
                            />
                        </View>

                        {/* Birth year */}
                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputDescription}>
                                Bạn sinh năm bao nhiêu?
                            </Text>

                            <SharedInput
                                placeholder="Ví dụ: 2005"
                                keyboardType="number-pad"
                                maxLength={4}
                            />
                        </View>

                        {/* Gender */}
                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputDescription}>
                                Giới tính của bạn?
                            </Text>

                            <SharedSelect
                                onSelect={setGender}
                                selected={gender}
                                options={[
                                    {
                                        name: "Nam",
                                        value: "male",
                                    },
                                    {
                                        name: "Nữ",
                                        value: "female",
                                    },
                                    {
                                        name: "Khác",
                                        value: "other",
                                    },
                                ]}
                                placeholder="giới tính"
                            />
                        </View>

                        {/* Height */}
                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputDescription}>
                                Chiều cao của bạn là bao nhiêu?
                            </Text>

                            <SharedInput
                                placeholder="Ví dụ: 180 cm"
                                keyboardType="numeric"
                            />
                        </View>

                        {/* Weight */}
                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputDescription}>
                                Cân nặng hiện tại của bạn?
                            </Text>

                            <SharedInput
                                placeholder="Ví dụ: 80 kg"
                                keyboardType="decimal-pad"
                            />
                        </View>

                        {/* Goal */}
                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputDescription}>
                                Mục tiêu tập luyện của bạn là gì?
                            </Text>

                            <SharedInput
                                placeholder="Tăng cơ, giảm mỡ..."
                            />
                        </View>

                        {/* Experience */}
                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputDescription}>
                                Bạn đã tập luyện được bao lâu?
                            </Text>

                            <SharedInput
                                placeholder="Ví dụ: 1 năm"
                            />
                        </View>

                    </ScrollView>

                    <View style={styles.buttonZone}>
                        <SharedButton
                            title="Tiếp tục"
                            onPress={() =>
                                router.replace("/(tabs)")
                            }
                        />
                    </View>
                </View>
            </View>
        </View>
    );
}

const createStyles = (colors: colorType, scale: number) =>
    StyleSheet.create({
        startCont: {
            flex: 1,
            backgroundColor: colors.background,
        },

        mainContent: {
            flex: 1,
        },

        logo: {
            width: 100 * scale,
            height: 100 * scale,
            borderRadius: 24,
            alignSelf: "center",
        },

        formView: {
            flex: 1,

            backgroundColor: colors.surface,

            paddingHorizontal: spacing.xl * scale,
            paddingTop: spacing.xxl * scale,

            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,

            marginTop: spacing.lg * scale,

            overflow: "hidden",
        },

        formContent: {
            gap: spacing.xl * scale,
            paddingBottom: spacing.lg * scale,
        },

        inputWrapper: {
            gap: spacing.xs * scale,
        },

        inputDescription: {
            fontSize: typography.footnote,
            color: colors.onSurface,
            fontWeight: "600",
        },

        buttonZone: {
            paddingTop: spacing.xs,
            paddingBottom: spacing.xs,
        },
    });
