import { useColor } from "@/providers/colorProvider";
import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OnboardingLayout(){
    const {colors} = useColor()
    NavigationBar.setBackgroundColorAsync(colors.background);
    NavigationBar.setButtonStyleAsync("light")
    return (
        <SafeAreaView style={{flex: 1}}>
            <Stack
                screenOptions={{
                    headerShown:false,
                }}
            >
            </Stack>
        </SafeAreaView>
    )
}