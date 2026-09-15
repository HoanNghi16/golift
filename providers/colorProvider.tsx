import { CUSTOM_THEMES } from "@/assets/styles/color"
import { colorType } from "@/types/color"
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as NavigationBar from "expo-navigation-bar"
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react"
import { useColorScheme } from "react-native"

const ColorContext = createContext<{
    colors: colorType,
    selectedTheme: string,
    setSelectedTheme?: Dispatch<SetStateAction<string>>
}>({colors: CUSTOM_THEMES.default.LIGHT_COLORS, selectedTheme: 'default', setSelectedTheme: undefined})

export function ColorProvider({children}:{children: ReactNode}){
    const [selectedTheme, setSelectedTheme] = useState<string>("default")
    const [initLLoading, setInitLoading] = useState<boolean>(true) 

    useEffect(()=>{
        if (!initLLoading) return
        AsyncStorage.getItem("selected_theme").then(theme =>{
            if (theme){
                setSelectedTheme(theme)
            }
        })
        setInitLoading(false)
    },[])
    const theme = useColorScheme()
    const colors = theme === "dark" ? CUSTOM_THEMES[selectedTheme].DARK_COLORS :  CUSTOM_THEMES[selectedTheme].LIGHT_COLORS 

    useEffect(() => {
        NavigationBar.setButtonStyleAsync(
                theme === "dark" ? "light" : "dark"
            );
    }, [theme]);

    return (
        <ColorContext.Provider value={{colors, selectedTheme, setSelectedTheme}}>
            {children}
        </ColorContext.Provider>
    )
}

export function useColor(){
    const context = useContext(ColorContext)
    return context
}