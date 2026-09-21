import { useColor } from "@/providers/colorProvider";
import { colorType } from "@/types/color";
import { ChevronDown, ChevronUp } from "lucide-react-native";
import { ReactNode, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function ExpandableView({title, children}: {title: string,children: ReactNode}){
    const [open, setOpen] = useState(false)
    const {colors} = useColor()
    const styles = createStyleSheet(colors)

    return (
        <View style={[styles.Container]}>
            <View style={styles.Base}>
                <Text style={styles.TitleText}>{title}</Text>
                <Pressable style={styles.Button} onPress={()=>{setOpen(prev => !prev)}}>
                    {!open ? <ChevronDown size={15} color={colors.textSecondary}/>: <ChevronUp size={15} color={colors.textSecondary}/>}
                </Pressable>
            </View>
            {open && children}
        </View>
    )
}

const createStyleSheet = (colors: colorType) => StyleSheet.create({
    Container: {
        backgroundColor: colors.surface,
        padding: 20,
        borderRadius: 20,
        gap: 16,
    },
    Base: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    TitleText: {
        color: colors.textSecondary,
        fontSize: 15,
    },
    Button:{
        padding: 2,
    }
})