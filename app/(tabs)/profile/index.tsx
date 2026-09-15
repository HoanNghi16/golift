import SharedButton from "@/components/form/sharedButton";
import SharedInput from "@/components/form/sharedInput";
import SharedSelect from "@/components/form/sharedSelect";
import { useColor } from "@/providers/colorProvider";
import { useTitle } from "@/providers/titleProvider";
import { colorType } from "@/types/color";
import * as ImagePicker from "expo-image-picker";
import { Pencil } from "lucide-react-native";
import { useState } from "react";
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

export default function ProfileScreen() {
    const { setHeaderTitle } = useTitle()
    const { colors } = useColor();
    const styles = createStyleSheet(colors);
    const [gender, setGender] = useState<"male" | "female" | "other" | null>(null)
    const [avatarUri, setAvatarUri] = useState<string | null>(null);
    const [name, setName] = useState("Nguyễn Văn A");

    setHeaderTitle("Hồ sơ")

    const pickAvatar = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("Cần quyền truy cập", "Vui lòng cho phép truy cập thư viện ảnh để đổi avatar.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled && result.assets.length > 0) {
            setAvatarUri(result.assets[0].uri);
            // TODO: gọi API upload avatarUri lên server tại đây
        }
    };

    return (
        
            <ScrollView style={styles.container}>
                {/* Avatar */}
                <View style={styles.avatarSection}>
                    <TouchableOpacity style={styles.avatarWrapper} onPress={pickAvatar}>
                        {avatarUri ? (
                            <Image source={{ uri: avatarUri }} style={styles.avatar} />
                        ) : (
                            <View style={[styles.avatar, styles.avatarPlaceholder]}>
                                <Text style={styles.avatarPlaceholderText}>+</Text>
                            </View>
                        )}
                        <View style={styles.editBadge}>
                            <Pencil color={colors.surface} size={14}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={pickAvatar}>
                        <Text style={styles.changeAvatarText}>Đổi ảnh đại diện</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.mainWrapper} >
                {/* Thông tin cá nhân */}
                    <View style={styles.infoSection}>
                        <Text style={styles.label}>Tên gọi/biệt danh</Text>
                        <SharedInput placeholder="Tên gọi của bạn" value="Nguyễn Dương Hoàng Nghi"/>
                    </View>
                    <View style={styles.infoSection}>
                        <Text style={styles.label}>Năm sinh</Text>
                        <SharedInput placeholder="Năm sinh" value="2005" keyboardType="number-pad"/>
                    </View>
                    <View style={styles.infoSection}>
                        <Text style={styles.label}>Giới tính</Text>
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
                    <View style={styles.infoSection}>
                        <Text style={styles.label}>Chiều cao (Cm)</Text>
                        <SharedInput placeholder="Nhập chiều cao của bạn" value="180" keyboardType="number-pad"/>
                    </View>
                    <View style={styles.infoSection}>
                        <Text style={styles.label}>Cân nặng (Kg)</Text>
                        <SharedInput placeholder="Nhập cân nặng của bạn" value="78" keyboardType="number-pad"/>
                    </View>
                    {/* Nút lưu */}
                    <SharedButton onPress={()=>{}} title="Lưu thay đổi"/>
                </View>
            </ScrollView>
    );
}

const AVATAR_SIZE = 100;

const createStyleSheet = (colors: colorType) =>
    StyleSheet.create({
        container: {
            paddingTop: 10,
            flex: 1,
            backgroundColor: colors.background,
        },
        avatarSection: {
            alignItems: "center",
            marginBottom: 16,
        },
        avatarWrapper: {
            width: AVATAR_SIZE,
            height: AVATAR_SIZE,
            marginBottom: 12,
        },
        avatar: {
            width: AVATAR_SIZE,
            height: AVATAR_SIZE,
            borderRadius: AVATAR_SIZE / 2,
        },
        avatarPlaceholder: {
            backgroundColor: colors.surface,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderColor: colors.textSecondary,
            borderStyle: "dashed",
        },
        avatarPlaceholderText: {
            fontSize: 32,
            color: colors.textSecondary,
        },
        mainWrapper:{
            borderTopStartRadius: 30,
            borderTopEndRadius: 30,
            paddingTop: 24,
            padding: 22,
            paddingBottom: 40,
            backgroundColor: colors.surface,
        },
        editBadge: {
            position: "absolute",
            bottom: 0,
            right: 0,
            width: 28,
            height: 28,
            borderRadius: 14,
            backgroundColor: colors.primary,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 2,
            borderColor: colors.background,
        },
        editBadgeText: {
            color: colors.primaryText,
            fontSize: 13,
        },
        changeAvatarText: {
            color: colors.primary,
            fontSize: 14,
            fontWeight: "600",
        },
        infoSection: {
            marginBottom: 16,
        },
        label: {
            fontSize: 13,
            color: colors.textSecondary,
            marginBottom: 8,
        },
    });