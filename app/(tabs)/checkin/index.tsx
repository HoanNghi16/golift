import SharedButton from "@/components/form/sharedButton";
import { useColor } from "@/providers/colorProvider";
import { colorType } from "@/types/color";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Modal, StyleSheet, Text, View } from "react-native";

export default function CheckinScreen() {
    const [permission, requestPermission] = useCameraPermissions();
    const {colors} = useColor()
    const styles = createStyles(colors)


    return (
        <>
            {permission?.granted === false && (
                <Modal  transparent={true} visible={permission?.granted === false} animationType="fade">
                    <View style={styles.modalOverlay} >
                        <View style={styles.modalBox}>
                            <Text style={{color: colors.textPrimary, fontSize: 16, textAlign:"center"}}>
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
const createStyles = (colors: colorType)=> StyleSheet.create({
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
})