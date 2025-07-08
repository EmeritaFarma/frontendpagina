
import { createContext, useState } from "react"

export type ModalContextType = {
    isOpen: boolean;
    closeModal: () => void;
    openModal: () => void;
    setOpen: (isOpen: boolean) => void;
} 

export const ModalContext = createContext<ModalContextType>(null!)


export function ModalProvider({ children, defaultState = false }: React.PropsWithChildren & { defaultState?: boolean }) {
    const [isOpen, setOpen] = useState(defaultState)

    const openModal = () => setOpen(true)
    const closeModal = () => setOpen(false)

    return (
        <ModalContext.Provider value={{ isOpen, closeModal, openModal, setOpen }}>
            {children}
        </ModalContext.Provider>
    )
}