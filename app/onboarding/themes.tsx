import SharedButton from "@/components/form/sharedButton";
import SharedSelect from "@/components/form/sharedSelect";
import PrimaryHeader from "@/components/layout/header";
import { useColor } from "@/providers/colorProvider";
import { spacing, typography } from "@/constants/design";
import { useResponsiveLayout } from "@/hooks/use-responsive-layout";
import { colorType } from "@/types/color";
import { useTitle } from "@/providers/titleProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect } from "react";
import {
    Image,
    StyleSheet,
    Text,
    View
} from "react-native";

export default function ThemeConfig() {
    const {
        colors,
        selectedTheme,
        setSelectedTheme
    } = useColor();

    const { scale } = useResponsiveLayout();
    const styles = createStyles(colors, scale);
    
    const { setHeaderTitle } = useTitle()

    useEffect(()=>{
        setHeaderTitle("Chọn màu yêu thích")
    },[])
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
                    <View style={styles.inputWrapper}>

                        <Text style={styles.inputDescription}>
                            Hãy chọn bộ phối màu của riêng bạn!
                        </Text>

                        <SharedSelect
                            options={[
                                {
                                    name: "Mặc định",
                                    value: "default"
                                },
                                {
                                    name: "MeanCheat",
                                    value: "meanCheat"
                                },
                                {
                                    name: "KeenTan",
                                    value: "keenTan"
                                }
                            ]}
                            onSelect={
                                (value: string)=>{
                                    AsyncStorage.setItem('selected_theme', value)
                                    setSelectedTheme?.(value)
                                }
                            }
                            selected={selectedTheme}
                            placeholder="theme"
                        />

                    </View>
                </View>

                <View style={styles.buttonZone}>
                    <SharedButton
                        title="Tiếp tục"
                        onPress={() => router.replace("/onboarding/start")}
                    />
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
            justifyContent: "space-between",
            paddingTop: spacing.xxl * scale,
            flex: 1,
        },

        logo: {
            width: 200 * scale,
            height: 200 * scale,
            borderRadius: 24,
            alignSelf: "center",
        },

        formView: {
            backgroundColor: colors.surface,

            paddingHorizontal: spacing.xl * scale,
            paddingTop: spacing.xxl * scale,
            paddingBottom: spacing.md * scale,

            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,

            marginTop: "auto",

            overflow: "hidden",
            justifyContent: "center",
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
            backgroundColor: colors.surface,
            padding: spacing.lg * scale,
        },
    });
