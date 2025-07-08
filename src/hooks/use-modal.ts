import { useContext } from "react"
import { ModalContext } from "@/context/ModalContext"


export function useModal() {
    if(!ModalContext) {
        throw new Error("ModalContext is not defined")
    }
    return useContext(ModalContext)
}

