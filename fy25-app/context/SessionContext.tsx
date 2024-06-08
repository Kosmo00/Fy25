import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState, PropsWithChildren } from 'react';


export type SessionData = {
    email: string;
    id: string;
    name: string;
}
export type SessionState = {
    logState: SessionData;
    setLogState: (data: SessionData) => void;
    logOut: () => void,
    reFetchData: () => void
};
const SessionContext = createContext<SessionState>({
    logState: {
        email: "",
        id: "",
        name: "",
    },
    setLogState: () => { },
    logOut: () => { },
    reFetchData: () => { }
});

async function saveSessionToLocalStorage(session: SessionData) {
    await AsyncStorage.setItem("session", JSON.stringify(session))
}

export function SessionContextProvider({ children }: PropsWithChildren) {

    const [logState, setLogState] = useState<SessionData>({
        email: "",
        id: "",
        name: "",
    })

    async function fetchData() {
        
    }

    const logOut = async () => {
        setLogState({
            email: "",
            id: "",
            name: ""
        })
        await AsyncStorage.removeItem("session")
    }
    useEffect(() => {
        async function save(){
            if(logState.email.length !== 0){
                await saveSessionToLocalStorage(logState);
            }
        }
        save();
    }, [logState])

    useEffect(() => {
        async function getFromLocalStorage() {
            const session = await AsyncStorage.getItem("session")
            const access = await AsyncStorage.getItem("ACCESS_TOKEN_STORAGE_KEY")
            
            if (session && access) {
                setLogState(JSON.parse(session))
            } else {
                fetchData()
            }
        }
        getFromLocalStorage()
    }, [])
    return (
        <SessionContext.Provider value={{ logState, setLogState, logOut, reFetchData: fetchData }}>
            {children}
        </SessionContext.Provider>
    )
}

export function useSessionContext() {
    return useContext(SessionContext);
}
