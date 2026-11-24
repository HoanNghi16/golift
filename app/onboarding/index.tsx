import SharedButton from "@/components/form/sharedButton";
import GoLiftText from "@/components/ui/GoLiftText";
import { radius, spacing, typography } from "@/constants/design";
import { useResponsiveLayout } from "@/hooks/use-responsive-layout";
import { useColor } from "@/providers/colorProvider";
import { colorType } from "@/types/color";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, Text } from "react-native";

const WELCOME = "Chào mừng bạn đến với GoLift, GoLift mong rằng sẽ được đồng hành cùng bạn trên con đường tập luyện!"

export default function OnBoardingIndex(){
    const { colors } = useColor();
    const { scale: layoutScale } = useResponsiveLayout();
    const styles = createStyles(colors, layoutScale);
    const [welcomeText, setWelcomeText] = useState<string>('')
    const scale = useRef(new Animated.Value(0.5)).current;
    const opacity = useRef(new Animated.Value(0.8)).current;
    const buttonAppear = useRef(new Animated.Value(0)).current
    const [typing, setTyping] = useState<boolean>(false)

    useEffect(()=>{
        Animated.parallel([
            Animated.timing(scale, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(opacity,{
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            })
        ]).start(()=>{
            setTyping(true)
        });

    },[])

useEffect(() => {
        if (!typing) return;

        let index = 0;

        const interval = setInterval(() => {
            if (welcomeText === WELCOME){
                clearInterval(interval);
            }
            index++;

            setWelcomeText(
                WELCOME.slice(0, index)
            );

            if (index >= WELCOME.length) {
                clearInterval(interval);


                Animated.timing(buttonAppear, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }).start();
            }
        }, 30);
    }, [typing]);


    if (welcomeText.length === WELCOME.length){
        Animated.timing(buttonAppear, {
            toValue: 1,
            duration: 1,
            useNativeDriver: true
        }).start()
    } 

    return (
        <Pressable onPress={(e)=>{
            setWelcomeText(WELCOME)
        }} style={styles.container}>
            <Animated.Image
                source={require("@/assets/images/GoLift_logo.png")}
                style={[
                    {
                        opacity,
                        transform: [{ scale}],
                    },styles.onboardingLogo,
                ]}
            />
            <GoLiftText backgroundShown={true}/>
            <Text style={styles.welcomeText}>{welcomeText}</Text>
            <Animated.View style={[
                {opacity: buttonAppear},
                styles.buttonZone,
            ]}>
                <SharedButton isPrimaryBackground={true} onPress={(e)=>router.replace('/onboarding/themes')} title="Bắt đầu ngay"/>
            </Animated.View>
        </Pressable>
    )
}
const createStyles = (colors: colorType, scale: number) => StyleSheet.create({
    container:{
        backgroundColor: colors.primary,
        paddingTop: spacing.xxl * scale,
        alignItems: 'center',
        flex: 1,
        gap: spacing.sm * scale,
    },
    onboardingLogo:{
        width: 150 * scale,
        height: 150 * scale,
        borderRadius: radius.xl
    },
    welcomeText: {
        fontSize: typography.title,
        color: colors.onPrimary,
        marginHorizontal: spacing.xl * scale,
        marginTop: spacing.xl * scale,
        textAlign: 'center',
    },
    buttonZone:{
        marginTop: spacing.xl * scale,
        borderRadius: radius.md,
        backgroundColor: colors.surface,
    },
})
