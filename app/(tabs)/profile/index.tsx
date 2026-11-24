import SharedButton from "@/components/form/sharedButton";
import SharedInput from "@/components/form/sharedInput";
import SharedSelect from "@/components/form/sharedSelect";
import { useColor } from "@/providers/colorProvider";
import { useTitle } from "@/providers/titleProvider";
import { colorType } from "@/types/color";
import { getTabBarContentInset, radius, spacing, typography } from "@/constants/design";
import { useResponsiveLayout } from "@/hooks/use-responsive-layout";
import { useSafeAreaInsets } from "react-native-safe-area-context";
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
    const { scale } = useResponsiveLayout();
    const insets = useSafeAreaInsets();
    const styles = createStyleSheet(colors, scale);
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
        
            <ScrollView style={styles.container} contentContainerStyle={[styles.contentContainer, { paddingBottom: getTabBarContentInset(scale, insets.bottom) }]}>
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
                            <Pencil color={colors.onPrimary} size={14}/>
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

const createStyleSheet = (colors: colorType, scale: number) =>
    StyleSheet.create({
        container: {
            paddingTop: spacing.xs * scale,
            flex: 1,
            backgroundColor: colors.background,
        },
        contentContainer: {
            flexGrow: 1,
        },
        avatarSection: {
            alignItems: "center",
            marginBottom: spacing.md * scale,
        },
        avatarWrapper: {
            width: 100 * scale,
            height: 100 * scale,
            marginBottom: spacing.sm * scale,
        },
        avatar: {
            width: 100 * scale,
            height: 100 * scale,
            borderRadius: 50 * scale,
        },
        avatarPlaceholder: {
            backgroundColor: colors.surface,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderColor: colors.border,
            borderStyle: "dashed",
        },
        avatarPlaceholderText: {
            fontSize: typography.display,
            color: colors.onSurface,
        },
        mainWrapper:{
            borderTopStartRadius: radius.xl,
            borderTopEndRadius: radius.xl,
            paddingTop: spacing.xl * scale,
            padding: spacing.lg * scale,
            paddingBottom: spacing.xxl * scale,
            backgroundColor: colors.surface,
        },
        editBadge: {
            position: "absolute",
            bottom: 0,
            right: 0,
            width: 28 * scale,
            height: 28 * scale,
            borderRadius: 14 * scale,
            backgroundColor: colors.primary,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 2,
            borderColor: colors.background,
        },
        editBadgeText: {
            color: colors.accentText,
            fontSize: typography.caption,
        },
        changeAvatarText: {
            color: colors.onSurface,
            fontSize: typography.footnote,
            fontWeight: "600",
        },
        infoSection: {
            marginBottom: spacing.md * scale,
        },
        label: {
            fontSize: typography.caption,
            color: colors.onSurface,
            marginBottom: spacing.xs * scale,
        },
    });
