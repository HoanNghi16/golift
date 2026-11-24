import { useColor } from "@/providers/colorProvider";
import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import { useResponsiveLayout } from "@/hooks/use-responsive-layout";

export default function OnboardingLayout(){
    const {colors} = useColor()
    const {contentWidth} = useResponsiveLayout()
    NavigationBar.setBackgroundColorAsync(colors.background);
    NavigationBar.setButtonStyleAsync("light")
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
            <View style={{flex: 1, width: contentWidth, alignSelf: "center", backgroundColor: colors.background}}>
            <Stack
                screenOptions={{
                    headerShown:false,
                }}
            >
            </Stack>
            </View>
        </SafeAreaView>
    )
}
