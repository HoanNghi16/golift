import SharedButton from "@/components/form/sharedButton";
import SharedSelect from "@/components/form/sharedSelect";
import PrimaryHeader from "@/components/layout/header";
import { useColor } from "@/providers/colorProvider";
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

    const styles = createStyles(colors);
    
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

const createStyles = (colors: any) =>
    StyleSheet.create({
        startCont: {
            flex: 1,
            backgroundColor: colors.background,
        },

        mainContent: {
            justifyContent: "space-between",
            paddingTop: 60,
            flex: 1,
        },

        logo: {
            width: 200,
            height: 200,
            borderRadius: 30,
            alignSelf: "center",
        },

        formView: {
            backgroundColor: colors.surface,

            paddingHorizontal: 30,
            paddingTop: 50,
            paddingBottom: 20,

            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,

            marginTop: "auto",

            overflow: "hidden",
            justifyContent: "center",
        },

        inputWrapper: {
            gap: 7,
        },

        inputDescription: {
            fontSize: 15,
            color: colors.textPrimary,
            fontWeight: "600",
        },

        buttonZone: {
            backgroundColor: colors.surface,
            padding: 20,
        },
    });