import Loading from "@/components/admin/Loading";
import Modal, { ModalButton, ModalContent } from "@/components/admin/Modal";
import EditTags from "@/components/admin/tags/EditTags";
import FormTags from "@/components/admin/tags/FormTags";
import RemoveTag from "@/components/admin/tags/RemoveTag";
import { useIdParams } from "@/hooks/use-idparams";
import { tagsColumns } from "@/payments/columns";
import { DataTable } from "@/payments/data-table";
import { getTags } from "@/services/tags.services";
import { useQuery } from "@tanstack/react-query";
import { CirclePlus } from "lucide-react";

export default function Tags() {
  
  const { id } = useIdParams("editid")

  const { data, isLoading } = useQuery({ queryKey: ['tags'], queryFn: getTags})

  return (
    <div className="max-w-5xl">
      <header className=" mb-4">
          <h1 className="font-medium text-xl">Etiquetas</h1>
          <p className="text-gray-400 text-sm">
            Aquí podrás gestionar todas las etiquetas de tu negocio. Puedes crear, editar y eliminar etiquetas.
          </p>
      </header>
      <div className="flex justify-end">
        <Modal>
          <ModalButton variant="dashboard"> <CirclePlus /> Agregar</ModalButton>
          <ModalContent title="Agregar Etiqueta" description="Crea una nueva etiqueta">
            <FormTags />
          </ModalContent>
        </Modal>
      </div>
      <div className="mt-4">
      {isLoading && <Loading />}  
      {!isLoading && data && <DataTable columns={tagsColumns} data={data} />}
      </div>
      <RemoveTag />
      {id && <EditTags />}
    </div>
  )
}
