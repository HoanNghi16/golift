import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

export default function TestTabBar(){
    return (
        <View>
            <View>
                <Ionicons name="home-outline"/>
                Trang chủ
            </View>
            <View>
                <Ionicons name="calendar-outline"/>
                Lịch tập
            </View>
            <View></View>
            <View></View>
            <View></View>
        </View>
    )
}
