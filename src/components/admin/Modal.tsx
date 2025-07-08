import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useModal } from "@/hooks/use-modal";
import { ModalProvider } from "@/context/ModalContext";

interface Props {
    children: React.ReactNode;
    defaultState?: boolean;
}

export default function Modal({ children, defaultState = false }: Props) {

    return (
        <ModalProvider defaultState={defaultState}>
            {children}
        </ModalProvider>

    )
}


export function ModalContent({ children, title, description , changeOpen }: { children: React.ReactNode, title: string, description: string, changeOpen?: () => void }) {

    const {  isOpen, setOpen } = useModal()
    
    return (
        <Dialog open={isOpen} onOpenChange={() => {
            setOpen(!isOpen)
            changeOpen?.()
        }}>
            <DialogContent >
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <div className="mt-2">
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    )
}

export function ModalButton({ children, className = '', variant = 'default' }: { children: React.ReactNode, className?: string, variant?:  "secondary" | "outline" | "ghost" | "link" | "default" | "destructive"   | "notion"  | "dashboard" }) {

    const {  openModal } = useModal()

    return (
        <Button variant={variant} onClick={openModal} className={className}>{ children }</Button>
    )
}