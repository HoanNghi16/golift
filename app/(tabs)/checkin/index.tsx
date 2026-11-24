import SharedButton from "@/components/form/sharedButton";
import { useColor } from "@/providers/colorProvider";
import { colorType } from "@/types/color";
import { radius, spacing, typography } from "@/constants/design";
import { useResponsiveLayout } from "@/hooks/use-responsive-layout";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Modal, StyleSheet, Text, View } from "react-native";

export default function CheckinScreen() {
    const [permission, requestPermission] = useCameraPermissions();
    const {colors} = useColor()
    const { scale } = useResponsiveLayout()
    const styles = createStyles(colors, scale)


    return (
        <>
            {permission?.granted === false && (
                <Modal  transparent={true} visible={permission?.granted === false} animationType="fade">
                    <View style={styles.modalOverlay} >
                        <View style={styles.modalBox}>
                            <Text style={{color: colors.onSurface, fontSize: typography.body, textAlign:"center"}}>
                                Vui lòng cấp quyền truy cập camera để sử dụng tính năng này
                            </Text>
                            <SharedButton title="Cho phép truy cập" onPress={()=>{requestPermission?.()}} ></SharedButton>
                        </View>
                    </View>
                </Modal>
            )}
            <View style={{ flex: 1, backgroundColor: colors.surface }}>
                <CameraView
                    style={{ flex: 1 }}
                    facing="back"
                    ratio="1:1"
                ></CameraView>
            </View>
        </>
    )
}
const createStyles = (colors: colorType, scale: number)=> StyleSheet.create({
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
            padding: spacing.lg * scale,
            alignItems: "center",
            gap: spacing.xs * scale,
        },
})
