import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react"


interface TitleContextType {
    headerTitle: string | null
    setHeaderTitle: Dispatch<SetStateAction<string | null>>
}


const TitleContext = createContext<TitleContextType | null>(null)

export function TitleProvider({children}:{children: ReactNode}){
    const [headerTitle, setHeaderTitle ] = useState<string | null>(null)


    return (
        <TitleContext.Provider value={{headerTitle, setHeaderTitle}}>
            {children}
        </TitleContext.Provider>
    )
}

export function useTitle(){
    const context = useContext(TitleContext)
    if (!context){
        throw Error("Context failed")
    }
    return context
}