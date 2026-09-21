import SharedInput from "@/components/form/sharedInput";
import SharedSelect from "@/components/form/sharedSelect";
import ExpandableView from "@/components/ui/expandableView";
import { useColor } from "@/providers/colorProvider";
import { colorType } from "@/types/color";
import { metaType, scheludeDayType } from "@/types/schelude";
import { useEffect, useMemo, useRef, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from "react-native";



export default function CreateSchelude() {

    // Colors & style 
    const { colors } = useColor();
    const styles = createStyleSheet(colors);

    // Screen var
    const {width} = useWindowDimensions()
    const scrollRef = useRef<ScrollView| null>(null)
    const [currentStep, setCurrentStep] = useState<number>(1)
    const [metaData, setMetaData] = useState<metaType>({
        name: "",
        period_type: null,
    });
    
    useEffect(()=>{
        if (!scrollRef.current) return
        if(currentStep < 0 || currentStep > 3){
            setCurrentStep(0)
        }
        if(scrollRef.current){
            scrollRef.current.scrollTo(
                {
                    x: currentStep * width,
                    animated: true,
                }
            )
        }
    },[currentStep])


    // Điều kiện hợp lệ để cho đi tiếp bước sau
    const isValid = useMemo(() => {
        if (currentStep === 0){
            const hasName = metaData.name.trim().length > 0;
            const hasPeriod = metaData.period_type !== null;
            const hasValidDay =
                metaData.period_type !== "day" ||
                (metaData.period_day !== undefined && metaData.period_day > 0);
            return hasName && hasPeriod && hasValidDay;
        }
        if (currentStep === 1){

        }
        
    }, [metaData, currentStep]);

    const dayList : scheludeDayType[] = useMemo(()=>{
        const dayCount: number = metaData?.period_type === "week" ? 7 : metaData?.period_day ?? 0
        return Array.from({length: dayCount}, ()=>({is_rest_day : true}))
    },[metaData])

    const handleNext = () => {
        if (!isValid) return;
        setCurrentStep(prev => prev+1)
        console.log("metaData hợp lệ:", metaData);
    };

    const handlePrev = () => {
        setCurrentStep(prev => prev -1)
    }

    return (
        <ScrollView
            ref={scrollRef}
            style={{flexDirection: "row", flex: 1, width: "auto", backgroundColor: colors.surface}}
            keyboardShouldPersistTaps="handled"
            horizontal
            pagingEnabled
            scrollEnabled={false}
        >

            {/* Step 0: Nhập meta data cho lịch tập */}
            <View
                style={[styles.scrollContent, {width}]}
            >
                <Text style={styles.pageTitle}>Thông tin lịch tập</Text>

                <View style={styles.metaDataContainer}>
                    <View style={styles.field}>
                        <Text style={styles.label}>Tên lịch tập</Text>
                        <SharedInput
                            placeholder="Nhập tên lịch tập"
                            value={metaData.name}
                            onChangeText={(text: string) =>
                                setMetaData((prev) => ({ ...prev, name: text }))
                            }
                        />
                    </View>

                    <View style={styles.field}>
                        <Text style={styles.label}>Chu kỳ</Text>
                        <SharedSelect
                            selected={metaData.period_type}
                            onSelect={(value: "day" | "week") =>
                                setMetaData((prev) => ({
                                    ...prev,
                                    period_type: value,
                                    period_day:
                                        value === "day" ? prev.period_day : undefined,
                                }))
                            }
                            options={[
                                { name: "Chu kỳ theo tuần", value: "week" },
                                { name: "Chu kỳ theo ngày", value: "day" },
                            ]}
                            placeholder="chu kỳ"
                        />
                    </View>

                    {metaData.period_type === "day" && (
                        <View style={styles.field}>
                            <Text style={styles.label}>Số ngày trong chu kỳ</Text>
                            <SharedInput
                                placeholder="VD: 3"
                                keyboardType="numeric"
                                value={metaData.period_day?.toString() ?? ""}
                                onChangeText={(text: string) =>
                                    setMetaData((prev) => ({
                                        ...prev,
                                        period_day: text ? Number(text) : undefined,
                                    }))
                                }
                            />
                        </View>
                    )}
                </View>

                <TouchableOpacity
                    style={[styles.nextButton, !isValid && styles.nextButtonDisabled]}
                    onPress={handleNext}
                    disabled={!isValid}
                    activeOpacity={0.85}
                >
                    <Text style={styles.nextButtonText}>Tiếp theo</Text>
                </TouchableOpacity>
            </View>

            {/* Step 1: Cấu hình các ngày tập */}
            <ScrollView
                style={{flex: 1, backgroundColor: colors.background}}
                contentContainerStyle={[styles.scrollContent, {width}]}
            >
                <Text style={styles.pageTitle}>Chi tiết lịch tập</Text>

                {
                    dayList.map((day, index)=>{
                        return(
                            <ExpandableView key={index} title={"Ngày " + (index + 1) + (day.is_rest_day && " ( Ngày nghỉ )")}>
                                <View>

                                </View>
                            </ExpandableView>
                        )
                    })
                }
                
                <TouchableOpacity
                        style={[styles.nextButton, !isValid && styles.nextButtonDisabled]}
                        onPress={handleNext}
                        disabled={!isValid}
                        activeOpacity={0.85}
                    >
                    <Text style={styles.nextButtonText}>Tiếp theo</Text>
                </TouchableOpacity>  
                <TouchableOpacity
                    style={[styles.backButton]}
                    onPress={handlePrev}
                    activeOpacity={0.85}
                >
                    <Text style={styles.backButtonText}>Quay lại</Text>
                </TouchableOpacity>
                     
            </ScrollView>
        </ScrollView>
    );
}

export const createStyleSheet = (colors: colorType) =>
    StyleSheet.create({
        scrollContent: {
            backgroundColor: colors.background,
            padding: 20,
            gap: 16,
        },
        pageTitle: {
            fontSize: 20,
            fontWeight: "700",
            color: colors.primaryText,
        },
        metaDataContainer: {
            backgroundColor: colors.surface,
            padding: 20,
            borderRadius: 20,
            gap: 16,
        },
        field: {
            gap: 6,
        },
        label: {
            fontSize: 13,
            fontWeight: "600",
            color: colors.textSecondary,
        },
        nextButton: {
            backgroundColor: colors.primary,
            borderRadius: 16,
            paddingVertical: 14,
            alignItems: "center",
            justifyContent: "center",
        },
        backButton:{
            backgroundColor: colors.surface,
            borderRadius: 16,
            paddingVertical: 14,
            alignItems: "center",
            justifyContent: "center",
        },
        backButtonText:{
            color: colors.textSecondary,
            fontSize: 15,
            fontWeight: "700",
        },
        nextButtonDisabled: {
            opacity: 0.4,
        },
        nextButtonText: {
            color: colors.background,
            fontSize: 15,
            fontWeight: "700",
        },
    });