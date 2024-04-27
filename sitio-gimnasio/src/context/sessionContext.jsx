'use client'

import { createContext, useContext, useEffect, useState, PropsWithChildren } from 'react';


const SessionContext = createContext({
    logState: {
        id: "",
        nombre: "",
        apellidos: "",
        contraseña: "",
        CI: "",
        correo: "",
        teléfono: "",
        foto_perfil: "",
        notificaciones_whatsapp: false,
        notificaciones_correo: false,
        rol: {
            id: "",
            nombre: ""
        }
    },
    setLogState: () => { },
    logOut: () => { },
    reFetchData: () => { }
});

export function SessionContextProvider({ children }) {

    const [logState, setLogState] = useState({
        id: "",
        nombre: "",
        apellidos: "",
        contraseña: "",
        CI: "",
        correo: "",
        teléfono: "",
        foto_perfil: "",
        notificaciones_whatsapp: false,
        notificaciones_correo: false,
        rol: {
            id: "",
            nombre: ""
        }
    })

    async function fetchData() {
    }

    const logOut = () => {
        setLogState({
            id: "",
            nombre: "",
            apellidos: "",
            contraseña: "",
            CI: "",
            correo: "",
            teléfono: "",
            foto_perfil: "",
            notificaciones_whatsapp: false,
            notificaciones_correo: false,
            rol: {
                id: "",
                nombre: ""
            }
        })
    }

    return (
        <SessionContext.Provider value={{ logState, setLogState, logOut }}>
            {children}
        </SessionContext.Provider>
    )
}

export function useSessionContext() {
    return useContext(SessionContext);
}
