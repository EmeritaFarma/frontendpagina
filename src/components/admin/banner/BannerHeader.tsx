import { Button } from "@/components/ui/button";
import Modal, { ModalButton, ModalContent } from "../Modal";
import FormBanner from "./FormBanner";
import { CirclePlus, Pencil } from "lucide-react";

interface Props {
    modeEdit: boolean;
    setModeEdit: React.Dispatch<React.SetStateAction<boolean>>;
    refetch: () => void;
}
export default function BannerHeader({ modeEdit, setModeEdit, refetch }: Props) {
    return (
        <header className="mb-4 flex justify-between items-center gap-4">
            <div>
                <h1 className="font-medium text-xl">Banners</h1>
                <p className="text-gray-400 text-sm">
                    Aquí podrás gestionar todos los banners de tu negocio. Puedes crear, editar y eliminar banners.
                </p>
            </div>
            <div className="flex gap-4">
                {!modeEdit && <Button onClick={() => setModeEdit(true)} variant={'outline'} ><Pencil /> Editar </Button>}
                {!modeEdit && (
                    <Modal>
                        <ModalButton variant="dashboard"> <CirclePlus /> Agregar</ModalButton>
                        <ModalContent title="Agregar banner" description="Crea la imagen que quieres mostrar en la pagina principal">
                            <FormBanner refetch={refetch} />
                        </ModalContent>
                    </Modal>
                )}
            </div>
        </header>
    )
}
