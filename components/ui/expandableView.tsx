import { useColor } from "@/providers/colorProvider";
import { colorType } from "@/types/color";
import { radius, spacing, typography } from "@/constants/design";
import { useResponsiveLayout } from "@/hooks/use-responsive-layout";
import { ChevronDown, ChevronUp } from "lucide-react-native";
import { ReactNode, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function ExpandableView({title, children}: {title: string,children: ReactNode}){
    const [open, setOpen] = useState(false)
    const {colors} = useColor()
    const { scale } = useResponsiveLayout()
    const styles = createStyleSheet(colors, scale)

    return (
        <View style={[styles.Container]}>
            <View style={styles.Base}>
                <Text style={styles.TitleText}>{title}</Text>
                <Pressable style={styles.Button} onPress={()=>{setOpen(prev => !prev)}}>
                    {!open ? <ChevronDown size={15} color={colors.onSurface}/>: <ChevronUp size={15} color={colors.onSurface}/>}
                </Pressable>
            </View>
            {open && children}
        </View>
    )
}

const createStyleSheet = (colors: colorType, scale: number) => StyleSheet.create({
    Container: {
        backgroundColor: colors.surface,
        padding: spacing.lg * scale,
        borderRadius: radius.xl,
        gap: spacing.md * scale,
    },
    Base: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    TitleText: {
        color: colors.onSurface,
        fontSize: typography.footnote,
    },
    Button:{
        padding: spacing.xxs,
    }
})
