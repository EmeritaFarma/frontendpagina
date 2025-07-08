import Loading from "@/components/admin/Loading";
import Modal, { ModalButton, ModalContent } from "@/components/admin/Modal";
import EditRoles from "@/components/admin/roles/EditRoles";
import FormRoles from "@/components/admin/roles/FormRoles";
import RemoveRoles from "@/components/admin/roles/RemoveRoles";
import { useFetch } from "@/hooks/use-fetch";
import { useIdParams } from "@/hooks/use-idparams";
import { rolesColumns } from "@/payments/columns";
import { DataTable } from "@/payments/data-table";
import { getRol } from "@/services/rol.services";
import { CirclePlus } from "lucide-react";

export default function Roles() {

  const { id } = useIdParams("editid")

  const { data , isLoading} = useFetch({ queryKey: ['roles'], queryFn: getRol})


  return (
    <div className="max-w-5xl">
      <header className="mb-4">
          <h1 className="font-medium text-xl">Roles</h1>
          <p className="text-gray-400 text-sm">
            Aquí podrás gestionar todos los roles de tu negocio. Puedes crear, editar y eliminar roles.
          </p>
      </header>
      <div className="flex justify-end">
          <Modal>
            <ModalButton variant="dashboard"> <CirclePlus /> Agregar</ModalButton>
            <ModalContent title="Agregar rol" description="Crear un nuevo rol para los usuarios"> 
              <FormRoles />
            </ModalContent>
          </Modal>
      </div>
      <div className="mt-4">
        {isLoading && <Loading />}
        {!isLoading && data && <DataTable columns={rolesColumns} data={data} />}
      </div>
      <RemoveRoles />
      {id && <EditRoles />}
    </div>
  )
}
